"use client";

import { useEffect, useMemo, useState } from "react";
import type { CheckResult, ExplainLang, Level, Mode, Register, Severity } from "@/lib/types";

const SETTINGS_KEY = "nihongo-checker:llm";

const MODES: { id: Mode; label: string }[] = [
  { id: "grammar", label: "Grammar" },
  { id: "vocabulary", label: "Word choice" },
  { id: "keigo", label: "Keigo" },
];

const severityStyle: Record<Severity, { mark: string; badge: string }> = {
  error: { mark: "bg-red-100 text-red-900 decoration-red-500", badge: "bg-red-100 text-red-700" },
  warning: { mark: "bg-amber-100 text-amber-900 decoration-amber-500", badge: "bg-amber-100 text-amber-700" },
  suggestion: { mark: "bg-sky-100 text-sky-900 decoration-sky-500", badge: "bg-sky-100 text-sky-700" },
};

const selectClass = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm";
const inputClass = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-mono";

export default function Page() {
  const [text, setText] = useState("");
  const [modes, setModes] = useState<Mode[]>(["grammar", "vocabulary", "keigo"]);
  const [register, setRegister] = useState<Register>("auto");
  const [level, setLevel] = useState<Level>("native");
  const [explainLang, setExplainLang] = useState<ExplainLang>("id");
  const [llm, setLlm] = useState({ baseUrl: "", model: "", apiKey: "" });
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [checkedText, setCheckedText] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_KEY);
      if (raw) setLlm({ baseUrl: "", model: "", apiKey: "", ...JSON.parse(raw) });
    } catch {}
  }, []);

  // Highlight each issue's `original` inside the checked text (first non-overlapping match).
  const segments = useMemo(() => {
    if (!result) return [];
    const spans = result.issues
      .map((issue, i) => ({ i, start: checkedText.indexOf(issue.original), len: issue.original.length }))
      .filter((s) => s.len > 0 && s.start >= 0)
      .sort((a, b) => a.start - b.start);
    const out: { text: string; issue?: number }[] = [];
    let pos = 0;
    for (const s of spans) {
      if (s.start < pos) continue;
      if (s.start > pos) out.push({ text: checkedText.slice(pos, s.start) });
      out.push({ text: checkedText.slice(s.start, s.start + s.len), issue: s.i });
      pos = s.start + s.len;
    }
    if (pos < checkedText.length) out.push({ text: checkedText.slice(pos) });
    return out;
  }, [result, checkedText]);

  async function check() {
    setError("");
    setResult(null);
    setLoading(true);
    try {
      const res = await fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, modes, register, level, explainLang, llm }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setCheckedText(text.trim());
      setResult(data as CheckResult);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nihongo Checker</h1>
          <p className="text-sm text-slate-500">Grammar, word choice and keigo, checked by your own AI endpoint.</p>
        </div>
        <button
          onClick={() => setShowSettings((v) => !v)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm hover:bg-slate-100"
        >
          Settings {llm.baseUrl && llm.model ? "✓" : "⚠"}
        </button>
      </header>

      {showSettings && (
        <section className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-3">
          {(
            [
              ["baseUrl", "API endpoint", "http://localhost:20128/v1", "text"],
              ["model", "Model name", "your-model-name", "text"],
              ["apiKey", "API key (optional)", "sk-...", "password"],
            ] as const
          ).map(([key, label, placeholder, type]) => (
            <label key={key} className="text-xs font-medium text-slate-600">
              {label}
              <input
                type={type}
                value={llm[key]}
                placeholder={placeholder}
                onChange={(e) => {
                  const next = { ...llm, [key]: e.target.value };
                  setLlm(next);
                  try {
                    localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
                  } catch {}
                }}
                className={`mt-1 ${inputClass}`}
              />
            </label>
          ))}
          <p className="text-xs text-slate-500 sm:col-span-3">
            Any OpenAI-compatible endpoint works (<code>/chat/completions</code> is appended automatically). Values are kept in
            this browser. If left empty, the server falls back to LLM_BASE_URL / LLM_MODEL / LLM_API_KEY from .env.local.
          </p>
        </section>
      )}

      <section className="mb-4 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-4">
        <div className="sm:col-span-4 flex flex-wrap gap-4">
          {MODES.map((m) => (
            <label key={m.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={modes.includes(m.id)}
                onChange={(e) => setModes(e.target.checked ? [...modes, m.id] : modes.filter((x) => x !== m.id))}
              />
              {m.label}
            </label>
          ))}
        </div>
        <label className="text-xs font-medium text-slate-600">
          Register
          <select className={`mt-1 ${selectClass}`} value={register} onChange={(e) => setRegister(e.target.value as Register)}>
            <option value="auto">Auto-detect</option>
            <option value="casual">Casual</option>
            <option value="polite">Polite (です・ます)</option>
            <option value="business">Business (keigo)</option>
            <option value="formal">Formal / academic</option>
          </select>
        </label>
        <label className="text-xs font-medium text-slate-600">
          Writer level
          <select className={`mt-1 ${selectClass}`} value={level} onChange={(e) => setLevel(e.target.value as Level)}>
            <option value="native">Advanced / native</option>
            <option value="N1">JLPT N1</option>
            <option value="N2">JLPT N2</option>
            <option value="N3">JLPT N3</option>
            <option value="N4">JLPT N4</option>
            <option value="N5">JLPT N5</option>
          </select>
        </label>
        <label className="text-xs font-medium text-slate-600">
          Explain in
          <select className={`mt-1 ${selectClass}`} value={explainLang} onChange={(e) => setExplainLang(e.target.value as ExplainLang)}>
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
            <option value="ja">日本語</option>
          </select>
        </label>
        <div className="flex items-end">
          <button
            onClick={check}
            disabled={loading || !text.trim() || modes.length === 0}
            className="w-full rounded-lg bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 disabled:opacity-50"
          >
            {loading ? "Checking…" : "Check"}
          </button>
        </div>
      </section>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === "Enter" && !loading && text.trim() && modes.length > 0) check();
        }}
        placeholder="日本語の文章をここに入力… (Ctrl+Enter to check)"
        rows={7}
        className="w-full rounded-xl border border-slate-300 bg-white p-4 text-lg leading-relaxed"
      />

      {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {result && (
        <section className="mt-6 space-y-5">
          {result.summary && <p className="rounded-lg bg-teal-50 p-3 text-sm text-teal-900">{result.summary}</p>}

          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Your text</h2>
            <p className="whitespace-pre-wrap text-lg leading-relaxed">
              {segments.map((s, idx) =>
                s.issue === undefined ? (
                  <span key={idx}>{s.text}</span>
                ) : (
                  <mark
                    key={idx}
                    title={result.issues[s.issue].explanation}
                    className={`rounded px-0.5 underline decoration-wavy ${severityStyle[result.issues[s.issue].severity].mark}`}
                  >
                    {s.text}
                  </mark>
                ),
              )}
            </p>
          </div>

          <div className="rounded-xl border border-teal-200 bg-white p-4">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-teal-700">Corrected</h2>
              <button
                onClick={async () => {
                  await navigator.clipboard.writeText(result.corrected);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
                className="rounded border border-slate-300 px-2 py-1 text-xs hover:bg-slate-100"
              >
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="whitespace-pre-wrap text-lg leading-relaxed">{result.corrected}</p>
            {result.correctedTranslation && (
              <p className="mt-2 whitespace-pre-wrap text-sm italic text-slate-500">{result.correctedTranslation}</p>
            )}
          </div>

          {result.issues.length === 0 ? (
            <p className="text-sm text-slate-500">No issues found.</p>
          ) : (
            <ul className="space-y-3">
              {result.issues.map((issue, i) => (
                <li key={i} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="mb-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className={`rounded-full px-2 py-0.5 font-semibold ${severityStyle[issue.severity].badge}`}>
                      {issue.severity}
                    </span>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">{issue.category}</span>
                    {issue.rule && <span className="font-mono text-slate-400">{issue.rule}</span>}
                  </div>
                  <p className="text-lg">
                    <span className="text-red-700 line-through decoration-red-400">{issue.original}</span>
                    <span className="mx-2 text-slate-400">→</span>
                    <span className="font-semibold text-teal-800">{issue.suggestion}</span>
                  </p>
                  <p className="mt-1 text-sm text-slate-700">{issue.explanation}</p>
                </li>
              ))}
            </ul>
          )}

          {result.alternatives.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Other registers</h2>
              <ul className="space-y-2">
                {result.alternatives.map((a, i) => (
                  <li key={i}>
                    <span className="mr-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">{a.register}</span>
                    <span className="text-lg">{a.text}</span>
                    {a.translation && <p className="mt-0.5 text-sm italic text-slate-500">{a.translation}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
