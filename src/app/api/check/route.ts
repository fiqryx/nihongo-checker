import { NextResponse } from "next/server";
import { buildMessages } from "@/lib/prompt";
import type { Category, CheckRequest, CheckResult, Severity } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 120;

const CATEGORIES: Category[] = ["grammar", "particle", "vocabulary", "keigo", "spelling", "naturalness", "style"];
const SEVERITIES: Severity[] = ["error", "warning", "suggestion"];

export async function POST(req: Request) {
  let body: CheckRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const text = (body.text ?? "").trim();
  if (!text) return NextResponse.json({ error: "Please enter some Japanese text to check." }, { status: 400 });
  if (text.length > 3000) {
    return NextResponse.json({ error: "The text is too long. Please keep it under 3,000 characters." }, { status: 400 });
  }
  if (!Array.isArray(body.modes) || body.modes.length === 0) {
    return NextResponse.json({ error: "Please select at least one check type." }, { status: 400 });
  }

  const baseUrl = (body.llm?.baseUrl || process.env.LLM_BASE_URL || "").trim().replace(/\/+$/, "");
  const model = (body.llm?.model || process.env.LLM_MODEL || "").trim();
  const apiKey = body.llm?.apiKey || process.env.LLM_API_KEY || "";
  if (!baseUrl || !model) {
    return NextResponse.json({ error: "Please set the API endpoint and model name in Settings first." }, { status: 400 });
  }
  const url = baseUrl.endsWith("/chat/completions") ? baseUrl : `${baseUrl}/chat/completions`;

  let upstream: Response;
  try {
    upstream = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}) },
      body: JSON.stringify({ model, temperature: 0.2, messages: buildMessages(body, text) }),
      signal: AbortSignal.timeout(110_000),
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the AI endpoint. Check the endpoint URL and make sure the server is running." },
      { status: 502 },
    );
  }

  if (!upstream.ok) {
    const detail = (await upstream.text().catch(() => "")).slice(0, 300);
    return NextResponse.json({ error: `The AI endpoint returned an error (${upstream.status}). ${detail}`.trim() }, { status: 502 });
  }

  const data = await upstream.json().catch(() => null);
  const raw = data?.choices?.[0]?.message?.content;
  const content = (typeof raw === "string" ? raw : "").replace(/<think>[\s\S]*?<\/think>/g, "");

  let parsed: Partial<CheckResult>;
  try {
    parsed = JSON.parse(content.slice(content.indexOf("{"), content.lastIndexOf("}") + 1));
  } catch {
    return NextResponse.json(
      { error: "The AI reply was not valid JSON. Please try again or use a stronger model." },
      { status: 502 },
    );
  }

  const result: CheckResult = {
    corrected: typeof parsed.corrected === "string" && parsed.corrected ? parsed.corrected : text,
    correctedTranslation: typeof parsed.correctedTranslation === "string" ? parsed.correctedTranslation : "",
    summary: typeof parsed.summary === "string" ? parsed.summary : "",
    issues: (Array.isArray(parsed.issues) ? parsed.issues : [])
      .filter((i) => i && typeof i.original === "string" && typeof i.suggestion === "string")
      .map((i) => ({
        original: i.original,
        suggestion: i.suggestion,
        category: CATEGORIES.includes(i.category) ? i.category : "grammar",
        severity: SEVERITIES.includes(i.severity) ? i.severity : "suggestion",
        explanation: typeof i.explanation === "string" ? i.explanation : "",
        rule: typeof i.rule === "string" && i.rule ? i.rule : undefined,
      })),
    alternatives: (Array.isArray(parsed.alternatives) ? parsed.alternatives : [])
      .filter((a) => a && typeof a.text === "string")
      .map((a) => ({
        register: String(a.register ?? ""),
        text: a.text,
        translation: typeof a.translation === "string" ? a.translation : "",
      })),
  };

  return NextResponse.json(result);
}
