export type Mode = "grammar" | "vocabulary" | "keigo";
export type Register = "auto" | "casual" | "polite" | "business" | "formal";
export type Level = "N5" | "N4" | "N3" | "N2" | "N1" | "native";
export type ExplainLang = "id" | "en" | "ja";

export type Category =
  | "grammar"
  | "particle"
  | "vocabulary"
  | "keigo"
  | "spelling"
  | "naturalness"
  | "style";
export type Severity = "error" | "warning" | "suggestion";

export interface Issue {
  original: string;
  suggestion: string;
  category: Category;
  severity: Severity;
  explanation: string;
  rule?: string;
}

export interface CheckResult {
  corrected: string;
  correctedTranslation: string;
  summary: string;
  issues: Issue[];
  alternatives: { register: string; text: string; translation: string }[];
}

export interface CheckRequest {
  text: string;
  modes: Mode[];
  register: Register;
  level: Level;
  explainLang: ExplainLang;
  llm?: { baseUrl?: string; model?: string; apiKey?: string };
}

export interface KnowledgeEntry {
  id: string;
  modes: Mode[];
  title: string;
  body: string;
  /** Always injected when one of its modes is active. */
  always?: boolean;
  /** Regex sources; the entry is injected when any matches the input text. */
  triggers?: string[];
}
