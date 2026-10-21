import type { KnowledgeEntry } from "../types";

// Keigo knowledge. Summarised in my own words from the general rules described in
// 文化庁「敬語の指針」(2007) and standard business-Japanese practice.
export const keigoEntries: KnowledgeEntry[] = [
  {
    id: "keigo-verbs",
    modes: ["keigo"],
    always: true,
    title: "Honorific (尊敬) / humble (謙譲) verb table",
    body: `plain → 尊敬語 | 謙譲語
言う → おっしゃる | 申す, 申し上げる
行く → いらっしゃる | 伺う, 参る
来る → いらっしゃる, お越しになる, お見えになる | 参る, 伺う
いる → いらっしゃる | おる
する → なさる | いたす
食べる・飲む → 召し上がる | いただく
見る → ご覧になる | 拝見する
聞く・尋ねる → お聞きになる | 伺う, 拝聴する
会う → お会いになる | お目にかかる
知っている → ご存じ | 存じている(物事), 存じ上げる(人)
思う → お思いになる | 存じる
あげる → (none) | 差し上げる
もらう → (none) | いただく, 頂戴する
くれる → くださる | (none)
着る → お召しになる | (none)
見せる → (none) | お目にかける, ご覧に入れる
分かる → (none) | かしこまる, 承知する
寝る → お休みになる | (none)`,
  },
  {
    id: "keigo-structures",
    modes: ["keigo"],
    always: true,
    title: "Keigo structures, prefixes and inside/outside rule",
    body: `- 尊敬: お/ご + V連用形/漢語 + になる (お読みになる, ご利用になる); V(ら)れる (読まれる); お/ご + V + ください (お待ちください).
- 謙譲: お/ご + V + する/いたす (お持ちします, ご連絡いたします). Use only for the speaker's own action that benefits/involves the other person.
- 丁重語 (謙譲語II): 参る, 申す, いたす, おる, 存じる. Addressed to the listener; no target person needed.
- 丁寧語: です/ます/ございます (〜でございます).
- Prefix: 和語 → お (お名前, お時間), 漢語 → ご (ご連絡, ご確認, ご説明). Common exceptions with お + 漢語: お電話, お食事, お料理, お約束, お返事 (ご返事 also OK). Do not add お/ご to loanwords (exceptions: おビール, おトイレ in casual speech). Never use お/ご on your own company's name or your own actions as 尊敬.
- 内/外 (uchi/soto): when talking to outsiders, the speaker's own company/boss/family are treated as "inside": use humble forms and drop honorific titles/さん. e.g. ×社長の田中がおっしゃっていました → 〇弊社の田中が申しておりました; ×部長は席にいらっしゃいません → 〇部長の佐藤は席を外しております.
- Never use 尊敬語 for yourself (×私がいらっしゃいます → 〇私が参ります/伺います).`,
  },
  {
    id: "keigo-double",
    modes: ["keigo"],
    title: "二重敬語 (double honorific) to avoid",
    triggers: [
      "おっしゃられ",
      "ご覧になられ",
      "召し上がられ",
      "お召し上がりになられ",
      "お越しになられ",
      "お見えになられ",
      "お読みになられ",
      "お聞きになられ",
      "拝見させ",
      "拝読させ",
      "お伺い",
      "伺わせ",
      "お目にかかられ",
    ],
    body: `Stacking two honorific devices on one verb is 二重敬語 and is usually wrong:
×おっしゃられる → 〇おっしゃる; ×ご覧になられる → 〇ご覧になる; ×お越しになられる → 〇お越しになる; ×お読みになられる → 〇お読みになる / 読まれる; ×召し上がられる → 〇召し上がる.
Conventionally accepted exceptions (do not mark as errors, optional polish only): お伺いします/お伺いする (cleaner: 伺います), お見えになる, お召し上がりください, お召し物, ご覧になってください.
拝見させていただきます / 拝読させていただきます is widely used but redundant; cleaner: 拝見します / 拝見いたします. Mark as "suggestion", not "error".`,
  },
  {
    id: "keigo-ryokai",
    modes: ["keigo"],
    title: "了解 / 了承 / 分かりました toward superiors",
    triggers: ["了解", "了承", "分かりました", "わかりました", "わかった", "分かった"],
    body: `To superiors/customers, 了解しました and 分かりました sound too casual; use 承知しました / 承知いたしました / かしこまりました (more formal).
了承 means "accept/approve" and is used by the person who has the authority; ×了承いたしました to a superior → 〇承知いたしました.
Casual 了解 (りょ, りょーかい) is fine among friends or close colleagues.`,
  },
  {
    id: "keigo-gokurou",
    modes: ["keigo"],
    title: "ご苦労様 / お疲れ様 / 参考になりました",
    triggers: ["ご苦労", "お疲れ", "参考になり", "ご馳走", "お世話"],
    body: `- ご苦労様です is used by a superior to a subordinate; to superiors or customers use お疲れ様です / お世話になっております (business emails/calls).
- 参考になりました to a superior can sound condescending (as if evaluating); prefer 勉強になりました / 大変勉強になりました.
- Business email opener: いつもお世話になっております。 / 大変お世話になっております。`,
  },
  {
    id: "keigo-baito",
    modes: ["keigo"],
    title: "バイト敬語 / customer-service Japanese mistakes",
    triggers: [
      "になります",
      "のほう",
      "の方",
      "よろしかった",
      "からお預かり",
      "でよろしかった",
      "ほうがよろしい",
      "とんでもござ",
      "ございません",
    ],
    body: `- ×こちらコーヒーになります → 〇こちらがコーヒーでございます (になる means "become/change").
- ×お会計のほう、1000円になります → 〇お会計は1000円でございます (のほう adds nothing when no comparison).
- ×1000円からお預かりします → 〇1000円お預かりします (から is only for change given back).
- ×ご注文は以上でよろしかったでしょうか → 〇ご注文は以上でよろしいでしょうか (don't use past tense for a present confirmation).
- ×とんでもございません → 〇とんでもないことでございます / とんでもないです (とんでもない is one word; cannot split to とんでも+ございません).
- ×資料のほうお送りします → 〇資料をお送りします.`,
  },
  {
    id: "keigo-sasete",
    modes: ["keigo"],
    title: "〜させていただく: overuse and さ入れ",
    triggers: ["させていただ", "させて頂", "さして", "読まさせ", "行かさせ", "書かさせ", "飲まさせ", "話さ"],
    body: `〜(さ)せていただく is correct when (a) the action needs the other person's permission or (b) the action benefits the speaker thanks to the other person. If neither applies, a plain humble form is better: ×ご案内させていただきます → 〇ご案内いたします / ご案内します; ×私は営業部の田中と申させていただきます → 〇申します.
さ入れ言葉 (wrong extra さ): ×読まさせていただきます → 〇読ませていただきます; ×行かさせて → 〇行かせて. Rule: only 一段/する/来る verbs take させ; 五段 verbs take せ (書かせる, 読ませる).
Too many させていただく in one text sounds heavy: suggest reducing.`,
  },
  {
    id: "keigo-company",
    modes: ["keigo"],
    title: "Company/self-reference terms",
    triggers: ["御社", "貴社", "弊社", "当社", "小社", "私ども", "会社", "お客様", "お客さん", "部長", "課長", "社長", "上司", "先生"],
    body: `- Other company: 御社 (speech), 貴社 (writing). Own company: 弊社 / 小社 (humble), 当社 (neutral). Don't say 貴社 aloud or 弊社 for someone else's company.
- Customer: お客様 (not お客さん) in business. Third-party individual: 〜様 in writing/formal; 〜さん is fine in everyday politeness but not for customers in formal emails.
- Self: 私 (neutral), わたくし (formal). 僕/俺 are inappropriate in formal business. Address the listener by name+様/さん or title (田中部長), avoid あなた to superiors.
- Don't attach さん to your own company's staff when speaking to outsiders (see 内/外).`,
  },
  {
    id: "keigo-requests",
    modes: ["keigo"],
    title: "Requests, refusals and cushion words",
    triggers: ["ください", "もらえ", "くれ", "ほしい", "欲しい", "お願い", "できません", "ありません", "すみません", "ごめん", "知りません", "いません"],
    body: `Request ladder (casual → formal): してくれる? → してください → していただけますか → していただけますでしょうか → お願いできますでしょうか / お願い申し上げます.
Replace plain forms toward superiors/customers:
- すみません → 申し訳ございません / 恐れ入ります (thanks/request)
- 知りません → 存じません (人は 存じ上げません)
- いません/いない → おりません
- できません → いたしかねます / 難しい状況でございます
- そうです → さようでございます / はい、そうでございます
- 見てください → ご覧ください; 食べてください → 召し上がってください; 来てください → お越しください; 座ってください → おかけください; 待ってください → お待ちください; 聞いてください → お聞きください
- もらえますか → いただけますか; 〜してほしい → 〜していただきたい
Cushion words before requests/refusals: 恐れ入りますが / お手数ですが / 差し支えなければ / 申し訳ございませんが.
Avoid stacking でしょうか＋かと存じます＋させていただきます in a single sentence (verbose).`,
  },
  {
    id: "keigo-email",
    modes: ["keigo"],
    title: "Business email conventions",
    triggers: ["メール", "拝啓", "敬具", "ご査収", "ご確認", "お送り", "添付", "返信", "宜しく", "よろしく"],
    body: `- Opening: お世話になっております。 Closing: よろしくお願いいたします。(avoid 宜しく in business; kana is standard).
- ご確認ください → ご確認くださいますようお願いいたします / ご確認いただけますと幸いです (softer).
- ご査収ください is for sending documents/invoices for checking; avoid for casual information.
- 添付ファイルをお送りします → 資料を添付いたしますので、ご確認ください.
- Do not use 〜してください alone with superiors; add 恐れ入りますが/お手数ですが.
- Formal letters: 拝啓 … 敬具 (pair); 前略 … 草々 (pair); 謹啓 … 謹白 (pair).`,
  },
];
