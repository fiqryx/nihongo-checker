import type { KnowledgeEntry } from "../types";

// Grammar knowledge: original summaries of widely-taught Japanese grammar points.
export const grammarEntries: KnowledgeEntry[] = [
  {
    id: "grammar-checklist",
    modes: ["grammar"],
    always: true,
    title: "Core checklist (go through in this order)",
    body: `1. Particles: は (topic/contrast) vs が (new info, subject of 好き/できる/分かる/欲しい, question words); に (destination, existence place with ある/いる, time point, recipient, purpose) vs で (place of an action/event, means, cause, scope) vs へ (direction); を vs が with potential/desire (飲みたい: を/が both fine); の vs が inside noun-modifying clauses (私が/の作った); まで (until) vs までに (by); と (with/quotation) vs に.
2. Conjugation: て/た forms, potential/passive/causative forms, い-adj (いい → よくない/よかった) vs な-adj, noun modification (い/な/の).
3. 自動詞/他動詞 and the particle that goes with it (ドアが開く / ドアを開ける).
4. Tense/aspect: 〜ている (progress vs resulting state), 〜てある, 〜ておく, 〜てしまう.
5. Style consistency: です・ます (敬体) vs だ・である (常体). Flag mixing in running text (except quotations, headings, bullet lists).
6. Sentence structure: ねじれ (subject/predicate mismatch), missing subject causing ambiguity, over-long sentences, chains of の (AのBのCの), non-parallel lists.
7. Spoken forms in writing: ら抜き (食べれる), い抜き (してる), 縮約 (〜ちゃう, 〜てる), さ入れ (読まさせて).
8. Punctuation: 、。 used consistently; 「」 for quotes; avoid mixing full-width and half-width punctuation.`,
  },
  {
    id: "grammar-ranuki",
    modes: ["grammar"],
    title: "ら抜き / い抜き / さ入れ",
    triggers: ["食べれ", "見れ", "来れ", "出れ", "寝れ", "着れ", "起きれ", "考えれ", "信じれ", "借りれ", "してる", "てる[。、 ]", "でる[。、 ]", "さして", "読まさせ", "行かさせ"],
    body: `- ら抜き: 一段・来る verbs potential is 〜られる: ×食べれる → 〇食べられる, ×見れる → 〇見られる, ×来れる → 〇来られる. Very common in speech; in formal writing mark as error, in casual text mark as "suggestion".
- い抜き: ×勉強してる → 〇勉強している in formal writing.
- さ入れ: ×読まさせる → 〇読ませる (五段 verbs take 〜せる).`,
  },
  {
    id: "grammar-transitivity",
    modes: ["grammar"],
    title: "自動詞 / 他動詞 pairs",
    triggers: [
      "開[くけ]", "閉[まめ]", "始[まめ]", "決[まめ]", "変[わえ]", "続[くけ]", "止[まめ]", "消[えす]", "壊[れす]", "直[るす]", "治[るす]", "入[るれ]", "出[るす]", "上[がげ]", "下[がげ]", "落[ちと]", "つ[くけ]", "かかる", "かける", "助[かけ]", "見つ[かけ]", "集[まめ]", "進[むめ]", "動[くか]", "伝[わえ]", "届[くけ]", "掛[かけ]", "加[わえ]", "並[ぶべ]",
    ],
    body: `Common pairs (intransitive が / transitive を): 開く/開ける, 閉まる/閉める, 始まる/始める, 決まる/決める, 変わる/変える, 続く/続ける, 止まる/止める, 消える/消す, 壊れる/壊す, 直る/直す, 治る/治す, 入る/入れる, 出る/出す, 上がる/上げる, 下がる/下げる, 落ちる/落とす, つく/つける, 見つかる/見つける, 集まる/集める, 動く/動かす, 伝わる/伝える, 届く/届ける, 加わる/加える, 並ぶ/並べる, 進む/進める.
Check: the verb chosen must match the particle (×時計を動いている → 〇時計が動いている / 時計を動かしている). 動く is intransitive, so it normally takes が, and a place of movement takes を only with verbs like 歩く/渡る (e.g. 道を歩く).`,
  },
  {
    id: "grammar-conditionals",
    modes: ["grammar"],
    title: "Conditionals: と / ば / たら / なら",
    triggers: ["たら", "れば", "なら", "と、", "ば、", "ければ", "なければ"],
    body: `- と: natural/habitual result, no volition in the result clause (×安いと買います → 〇安ければ買います/安かったら買います).
- ば: general or hypothetical condition; result clause with volition is awkward if the condition is a verb in 〜ば (×着けば電話します → 〇着いたら電話します).
- たら: most flexible; use for one-time events, requests, suggestions after something happens.
- なら: "if it's the case that (context)", advice/information given in response (京都に行くなら、秋がいいですよ).
Past-tense results: 〜たら can mean discovery (開けたら猫がいた).`,
  },
  {
    id: "grammar-aspect",
    modes: ["grammar"],
    title: "〜ている, てある, ておく, てしまう",
    triggers: ["ている", "ていた", "てある", "ておく", "ておい", "てしまう", "てしまっ", "ちゃ", "じゃった"],
    body: `- 〜ている: (1) ongoing action (食べている), (2) resulting state with change verbs (結婚している, 知っている, 死んでいる), (3) repeated/habitual action (毎日走っている).
- 〜てある: a state resulting from someone's intentional action (窓が開けてある, transitive verb + が).
- 〜ておく: do in advance.
- 〜てしまう: completion or regret.
- 知る vs 知っている: "I know" is 知っている, not ×知る; "I don't know" is 知らない (not ×知っていない).
- Continuous states described as 〜ている (時間は流れている) are normal; avoid ×流れる for a permanent fact unless a universal statement is intended.`,
  },
  {
    id: "grammar-passive-causative",
    modes: ["grammar"],
    title: "Passive / causative / causative-passive",
    triggers: ["られ", "させ", "せられ", "される", "させる", "された", "させた", "われる", "かれる"],
    body: `- Passive: A が B に V(ら)れる; the "suffering" passive (雨に降られた) is only for intransitive verbs implying the subject was inconvenienced.
- Causative: A が B を/に V(さ)せる. Intransitive verbs: を (compulsion) or に (permission/let); transitive verbs: に only (子供に野菜を食べさせる).
- Causative-passive: 食べさせられる (was made to eat); 五段 verbs often contract: 読ませられる → 読まされる.
Check that the agent (に/から/によって) of a passive is natural, and that overly literal "by X" passives translated from English are rephrased in the active when the agent is a person (私が行った is more natural than 私によって行われた in everyday text).`,
  },
  {
    id: "grammar-counters",
    modes: ["grammar"],
    title: "Counters (助数詞)",
    triggers: ["[0-9０-９一二三四五六七八九十百]+[個本枚匹台冊人杯回階歳才つ頭羽]", "何[個本枚匹台冊人杯回階歳才]"],
    body: `人: ひとり, ふたり, さんにん…; 本 (long thin): いっぽん, にほん, さんぼん; 枚 (flat); 匹 (small animals): いっぴき, さんびき; 頭 (large animals); 羽 (birds, rabbits in speech); 台 (machines, vehicles); 冊 (books); 個 (small objects); 杯 (cups/bowls): いっぱい, さんばい; 回 (times); 階 (floors): さんがい; 歳 (age): はたち for 20.
Check the counter fits the noun and the reading changes (phonetic). Use number + counter after the noun without の in most cases (本を3冊買った).`,
  },
  {
    id: "grammar-adjectives",
    modes: ["grammar"],
    title: "Adjective conjugation and noun modification",
    triggers: ["いい", "よく", "よかっ", "くない", "くなかっ", "かった", "きれい", "好き", "嫌い", "静か", "有名", "便利"],
    body: `- いい is irregular: いい → よくない / よかった / よければ (×いくない, ×いかった).
- きれい, 好き, 嫌い, 静か, 有名, 便利 are な-adjectives: きれいな部屋, 静かな町 (not ×きれい部屋). Note 嫌い・好き take が.
- Past negative: い-adj → 高くなかった; な-adj/noun → 静かではなかった / 静かじゃなかった.
- Adverb forms: い-adj → く (早く), な-adj → に (静かに).`,
  },
  {
    id: "grammar-reason-purpose",
    modes: ["grammar"],
    title: "ので / から / ため / ように / ながら",
    triggers: ["ので", "から", "ため", "ように", "ながら", "のに", "けど", "けれど", "しかし", "ですが"],
    body: `- から: subjective reason, can precede a command/request (危ないから離れて). ので: objective/polite reason; the result should not be a command (×危ないので離れてください is acceptable but a bit stiff; 危ないですから is common).
- ため(に): purpose with volitional verb (勉強するために) or cause (雨のため中止). ように: purpose with non-volitional verb/potential (見えるように, 分かるように).
- ながら: simultaneous actions by the same subject; main action is the second verb.
- のに vs けど: のに expresses contrast with surprise/complaint; don't put a command after のに.`,
  },
  {
    id: "grammar-nominalization",
    modes: ["grammar"],
    title: "こと / の / という and relative clauses",
    triggers: ["こと", "ものだ", "の[はがを]", "という", "ということ", "ような", "みたい", "らしい", "そうだ", "ようだ"],
    body: `- 〜こと vs 〜の: 〜のを見る/聞く (perception) takes の; 〜ことができる/〜ことにする/〜ことがある takes こと.
- 〜という + noun: explains the content (〜という考え); do not overuse という/のような when plain modification is enough.
- Relative clause subject: が → の allowed (私の作った料理).
- そうだ (hearsay: plain form + そうだ; appearance: stem + そうだ), ようだ/みたい (resemblance, inference), らしい (reportedly/typical).
- Watch literal translations of English "of" with の: AのBのC chains → restructure.`,
  },
  {
    id: "grammar-style",
    modes: ["grammar"],
    title: "Written vs spoken style (文体)",
    triggers: ["です", "ます", "だ。", "である", "でした", "だった", "でも、", "だから", "けど", "じゃない", "なんか", "って"],
    body: `- Don't mix 敬体 (です/ます) and 常体 (だ/である) in running text; pick one by context (email, report, essay, SNS).
- Academic/essay: だ・である style, avoid contractions and colloquial connectors (でも→しかし, だから→したがって/そのため, けど→が/けれども, やっぱり→やはり, ちょっと→少し, すごく→非常に, いろんな→様々な, 〜って→〜と, 〜じゃない→〜ではない, 〜みたい→〜ようだ, なんか→など).
- Casual chat: です/ます is fine, but 〜でございます is too stiff.`,
  },
];
