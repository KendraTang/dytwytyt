import { channel } from "diagnostics_channel";

export const QUESTIONS = [
  "客觀的道德標準並不存在，道德判斷只是代表個別文化的價值觀。",
  "只要不傷害別人，每個人都應該有權自由追求自己的目標。",
  "如果能夠走路、騎腳踏車或搭乘火車，就不該開車。",
  "剝奪別人的生命是絕對錯誤的行為。",
  "生命權是非常基本的權利，只要是為了拯救生命，財政考量絕對是無關緊要的問題。",
  "自願安樂死不應合法化。",
  "同性戀違反自然，所以同性戀是錯誤的行為。",
  "在完全不可能有證據的情況下相信一件事物的存在，是頗合理的行為。",
  "為了個人吸食而持有毒品的行為應予除罪化。",
  "全能、慈愛又善良的神確實存在。",
  "第二次世界大戰是一場合乎正義的戰爭。",
  "一個人做出決定之後，當初一定也有可能做出其他決定。",
  "僅依能力評斷一個人，不一定是正確的做法。",
  "對於藝術作品的評斷，純粹是個人品味的問題。",
  "肉身死亡之後，人還是會以非肉體的方式繼續存在。",
  "對於治療效果及安全性未經過測試的健康療法，政府應該禁止。",
  "事實問題沒有客觀的真相可言，「真相」總是因個別文化或個人而異。",
  "無神論和其他宗教一樣是一種信仰，因為神的不存在是無法證實的。",
  "一般而言，適當的衛生與藥物有益於社會。",
  "在某些情況下，為了彌補某人在過去所遭到的傷害，也許應該給他正面的差別待遇。",
  "另類醫療與補助性醫療的價值，並不遜於主流醫療方式。",
  "腦部嚴重損傷可能讓人徹底喪失意識與自我認知的能力。",
  "如果有能力阻止，卻任憑無辜兒童遭受不必要的痛苦，在道德上是一種應該受到譴責的行為。",
  "人類不該為了自己的需求，對環境造成不必要的損害。",
  "米開朗基羅是史上數一數二的偉大藝術家。",
  "個人對自己的身體擁有絕對的權利。",
  "種族滅絕行為證明人類有可能做出極大的惡行。",
  "猶太人大屠殺是歷史真相，發生過程和史書上的記載大致相符。",
  "人民應該允許政府大幅提高稅率，拯救開發中國家的人民。",
  "未來早已確定，一個人的人生走向完全被命運指引。",
].map((question, index) => ({
  id: index + 1,
  question,
}));

export const QUESTIONS_MAP = new Map(QUESTIONS.map(({ id, question }) => [id, question]))

export const CONTRADICTIONS = [
  [{ questionId: 1, answer: true }, { questionId: 27, answer: true }],
  [{ questionId: 5, answer: true }, { questionId: 29, answer: false }],
  [{ questionId: 10, answer: true }, { questionId: 23, answer: true }],
  [{ questionId: 17, answer: true }, { questionId: 28, answer: true }],
  [{ questionId: 24, answer: true }, { questionId: 3, answer: false }],
  [{ questionId: 2, answer: true }, { questionId: 9, answer: false }],
  [{ questionId: 26, answer: true }, { questionId: 6, answer: true }],
  [{ questionId: 4, answer: true }, { questionId: 11, answer: true }],
  [{ questionId: 12, answer: true }, { questionId: 30, answer: true }],
  [{ questionId: 19, answer: true }, { questionId: 7, answer: true }],
  [{ questionId: 20, answer: true }, { questionId: 13, answer: false }],
  [{ questionId: 22, answer: true }, { questionId: 15, answer: true }],
  [{ questionId: 8, answer: false }, { questionId: 18, answer: true }],
  [{ questionId: 14, answer: true }, { questionId: 25, answer: true }],
  [{ questionId: 16, answer: true }, { questionId: 21, answer: true }],
].map((contradiction, index) => ({
  id: index + 1,
  contradiction,
}));

export const WHERE_TO_BUY = [
  {
    channel: '博客來網路書店',
    url: 'https://www.books.com.tw/products/0010817339',
  },
  {
    channel: '誠品網路書店',
    url: 'https://www.eslite.com/product/1001156502751041',
  },
  {
    channel: 'Readmoo讀墨電子書',
    url: 'https://readmoo.com/book/210106407000101'
  },
  {
    channel: 'Rakuten kobo電子書',
    url: 'https://www.kobo.com/tw/zh/ebook/C9usY_mzhTGcWj_oJ7eXPg'
  },
  {
    channel: 'Google Play Books電子書',
    url: 'https://play.google.com/store/books/details/?id=G7GRDwAAQBAJ'
  }
]
