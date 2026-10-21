import type { KnowledgeEntry } from "../types";

// Vocabulary / word-choice knowledge. Focus: collocations and calques,
// especially literal translations from English or Indonesian.
export const vocabEntries: KnowledgeEntry[] = [
  {
    id: "vocab-collocations",
    modes: ["vocabulary"],
    always: true,
    title: "Natural verb + noun collocations (frequent calque errors)",
    body: `Japanese picks a specific verb per noun. Typical calques from English/Indonesian:
- time: 時間が流れる/経つ/過ぎる (×時間が動く, ×時間の線). "Flow of time" = 時の流れ / 時間の流れ. "Timeline" = 年表 / タイムライン (a chart), not 時間の線.
- 写真を撮る (take a photo, Indonesian: mengambil foto), 薬を飲む (minum obat), 風邪をひく, 熱がある/出る, 歯を磨く, 髪を切る(have cut: 切ってもらう), 電車/バスに乗る, 試験を受ける, 授業に出る, 約束を守る/破る, 友達を作る/友達ができる, 決断を下す/決める, 責任を取る, 休みを取る, 手伝いをする, 夢を見る, 嘘をつく, 声をかける, 気をつける, 気になる, 役に立つ, 目が覚める.
- Wearing: 服を着る, ズボン/靴/靴下を履く, 帽子をかぶる, 眼鏡をかける, 時計/指輪をつける・はめる, ネクタイを締める, 手袋をはめる.
- する overuse: "do a mistake" → 間違える/ミスをする; "make a decision" → 決める; "make a plan" → 計画を立てる; "make a speech" → 話をする/スピーチをする; "make progress" → 進歩する/進む; "make an effort" → 努力する/頑張る; "pay attention" → 注意する/気をつける.
- Adverbs: とても (positive/neutral) vs すごく (spoken); 非常に (formal); あまり/全然 + negative; ぜひ + want/request; たぶん/きっと.
- Weather/nature: 雨が降る, 風が吹く, 雪が積もる, 星が出る, 花が咲く, 川が流れる, 空が晴れる.
Mark unnatural combinations as "naturalness" or "vocabulary" and suggest the standard collocation with a short reason.`,
  },
  {
    id: "vocab-time",
    modes: ["vocabulary"],
    title: "Time-related expressions",
    triggers: ["時間", "時", "線", "流れ", "間", "期間", "とき", "まで", "ずっと", "いつも", "常に"],
    body: `- 時間 (amount of time/hour), 時 (moment, 〜のとき), 時刻 (clock time), 期間 (period), 間 (during), 時期 (season/period), 時代 (era).
- 常に (always, formal/written), いつも (always, general), ずっと (all along/continuously), 絶えず (constantly, literary), 常々 (habitually).
- Time doesn't "move" 動く; it passes/flows: 時間が流れる (poetic), 時間が経つ (elapses), 時が過ぎる (passes), 時は流れる. "The arrow of time" = 時間の矢 (physics term), "the line of time" is not a standard expression; suggest 時の流れ/時間軸 (timeline axis, technical).`,
  },
  {
    id: "vocab-homophones",
    modes: ["vocabulary"],
    title: "Homophones and kanji confusion",
    triggers: [
      "作", "造", "創", "聞", "聴", "訊", "見", "観", "視", "会", "合", "遭", "暑", "熱", "厚", "早", "速", "変", "替", "代", "換", "以外", "意外", "対象", "対称", "対照", "成長", "生長", "異常", "以上", "保証", "保障", "補償", "回答", "解答", "返", "帰", "計", "測", "量", "図", "謀", "諮", "取", "撮", "採", "執", "捕", "収", "納", "修", "治", "直", "移", "映", "写", "写る", "映る", "移る", "務", "勤", "努", "勉", "強",
    ],
    body: `Choose the kanji by meaning (check only the ones that appear):
- 作る (make concrete things) / 造る (build large structures, brew sake) / 創る (create something new, art).
- 聞く (hear/ask, general) / 聴く (listen attentively: music, advice) / 訊く (ask, formal).
- 見る (see) / 観る (watch a show/film/sports) / 視る (inspect/regard, medical/formal).
- 会う (meet) / 合う (match, fit) / 遭う (encounter bad luck).
- 暑い (weather hot) / 熱い (object hot) / 厚い (thick).
- 早い (early) / 速い (fast).
- 変える (change) / 替える (swap) / 代える (substitute) / 換える (exchange).
- 写る (photo shows) / 映る (reflected, appears on screen) / 移る (move to).
- 計る (measure time/quantity) / 測る (measure length/depth) / 量る (weigh) / 図る (plan, attempt) / 謀る (scheme) / 諮る (consult).
- 勤める (work for a company) / 務める (serve in a role) / 努める (strive).
- 以外 (other than) vs 意外 (unexpected); 以上 vs 異常; 保証 (guarantee), 保障 (security), 補償 (compensation); 回答 (reply to a survey) vs 解答 (answer to a problem); 対象 (target), 対称 (symmetry), 対照 (contrast); 成長 (growth of people/economy) vs 生長 (growth of plants).`,
  },
  {
    id: "vocab-register-words",
    modes: ["vocabulary"],
    title: "Register of everyday words (spoken ↔ written)",
    triggers: ["すごく", "やっぱり", "ちょっと", "でも", "だから", "いろんな", "めっちゃ", "ぜんぜん", "全然", "とても", "なんか", "ていうか", "だけど", "結構", "けっこう", "たくさん", "いっぱい", "ホント", "本当"],
    body: `Spoken → more formal/written: すごく/めっちゃ → 非常に/大変/たいへん; やっぱり → やはり; ちょっと → 少し/やや; でも → しかし/ですが; だから → したがって/そのため; いろんな → 様々な/いろいろな; ぜんぜん良い → 全然 + negative only in formal usage (全然+affirmative is informal spoken); 結構 → かなり/相当; たくさん → 多く/多数; ホント → 本当; なんか → など/〜のような; ていうか → というより.
Do not "correct" casual text into stiff written Japanese when the requested register is casual.`,
  },
  {
    id: "vocab-pronouns-address",
    modes: ["vocabulary"],
    title: "Pronouns and forms of address",
    triggers: ["あなた", "君", "お前", "僕", "俺", "私", "わたし", "うち", "彼", "彼女", "みんな", "皆"],
    body: `Avoid あなた for specific people (esp. superiors); use name + さん/様 or title. 君/お前 are for equals/inferiors. 僕 (male casual/neutral), 俺 (male casual), 私 (neutral), わたくし (formal). 彼/彼女 are used much less than in English; repeat the name or drop the subject when context allows. Overusing subject pronouns is a common translation error: 〇(私は)昨日映画を見た, omit 私は when clear.`,
  },
  {
    id: "vocab-katakana-wasei",
    modes: ["vocabulary"],
    title: "Loanwords and wasei-eigo",
    triggers: ["[ァ-ヴー]{3,}"],
    body: `Don't assume an English word works in Japanese. Common mismatches: マンション (condominium, not mansion), ストレス (stress), クレーム (complaint, not a legal claim), スマート (slim), ハイテンション (hyper), サイン (autograph/signature, both), コンセント (outlet), リフォーム (home renovation), パンク (flat tire), アルバイト/バイト (part-time job), メリット/デメリット (pros/cons), トラブル, キャンセル.
Prefer the established Japanese word in formal text: アップデート → 更新, ミーティング → 会議/打ち合わせ, キャンセル → 取り消し, スケジュール → 予定/日程.`,
  },
];
