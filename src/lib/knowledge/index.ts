import type { KnowledgeEntry, Mode } from "../types";
import { grammarEntries } from "./grammar";
import { keigoEntries } from "./keigo";
import { vocabEntries } from "./vocab";

export const allEntries: KnowledgeEntry[] = [...grammarEntries, ...vocabEntries, ...keigoEntries];

/**
 * Lightweight retrieval: "always" entries for the active modes, plus entries whose
 * trigger regexes match the input text. Replace this with embeddings/FTS later
 * (see README) without changing the callers.
 */
export function selectKnowledge(text: string, modes: Mode[], max = 14): string {
  const picked = allEntries.filter(
    (e) =>
      e.modes.some((m) => modes.includes(m)) &&
      (e.always || (e.triggers ?? []).some((t) => new RegExp(t).test(text))),
  );
  picked.sort((a, b) => Number(!!b.always) - Number(!!a.always));
  return picked
    .slice(0, max)
    .map((e) => `[${e.id}] ${e.title}\n${e.body}`)
    .join("\n\n");
}
