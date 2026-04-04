export type Category = {
  id: string;
  name: string;
  emoji: string;
};

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  emoji: string;
  categoryId: string;
};

export const categories: Category[] = [
  { id: "recommended", name: "おすすめ", emoji: "\u2B50" },
  { id: "main", name: "メイン", emoji: "\uD83C\uDF56" },
  { id: "side", name: "サイド", emoji: "\uD83E\uDD57" },
  { id: "drink", name: "ドリンク", emoji: "\uD83C\uDF7A" },
  { id: "dessert", name: "デザート", emoji: "\uD83C\uDF70" },
];

export const menuItems: MenuItem[] = [
  // おすすめ
  {
    id: "r1",
    name: "特製ハンバーグ",
    price: 1280,
    description: "肉汁たっぷりの自家製ハンバーグ",
    emoji: "\uD83C\uDF56",
    categoryId: "recommended",
  },
  {
    id: "r2",
    name: "本日の刺身盛り",
    price: 1480,
    description: "新鮮な旬の魚介を盛り合わせ",
    emoji: "\uD83C\uDF63",
    categoryId: "recommended",
  },
  {
    id: "r3",
    name: "海老天ぷら定食",
    price: 1180,
    description: "サクサク衣の大海老天ぷら",
    emoji: "\uD83C\uDF64",
    categoryId: "recommended",
  },
  // メイン
  {
    id: "m1",
    name: "和牛ステーキ",
    price: 2480,
    description: "A5ランク黒毛和牛のサーロイン",
    emoji: "\uD83E\uDD69",
    categoryId: "main",
  },
  {
    id: "m2",
    name: "チキン南蛮",
    price: 980,
    description: "特製タルタルソースでどうぞ",
    emoji: "\uD83C\uDF57",
    categoryId: "main",
  },
  {
    id: "m3",
    name: "鯖の味噌煮",
    price: 880,
    description: "じっくり煮込んだ定番の一品",
    emoji: "\uD83D\uDC1F",
    categoryId: "main",
  },
  // サイド
  {
    id: "s1",
    name: "枝豆",
    price: 380,
    description: "塩茹でした新鮮な枝豆",
    emoji: "\uD83E\uDED1",
    categoryId: "side",
  },
  {
    id: "s2",
    name: "シーザーサラダ",
    price: 580,
    description: "パルメザンチーズたっぷり",
    emoji: "\uD83E\uDD57",
    categoryId: "side",
  },
  {
    id: "s3",
    name: "だし巻き卵",
    price: 480,
    description: "ふわふわのだし巻き卵",
    emoji: "\uD83C\uDF73",
    categoryId: "side",
  },
  // ドリンク
  {
    id: "d1",
    name: "生ビール",
    price: 550,
    description: "キンキンに冷えた生ビール",
    emoji: "\uD83C\uDF7A",
    categoryId: "drink",
  },
  {
    id: "d2",
    name: "ハイボール",
    price: 480,
    description: "すっきり爽やかなハイボール",
    emoji: "\uD83E\uDD43",
    categoryId: "drink",
  },
  {
    id: "d3",
    name: "ウーロン茶",
    price: 280,
    description: "さっぱり烏龍茶",
    emoji: "\uD83C\uDF75",
    categoryId: "drink",
  },
  // デザート
  {
    id: "de1",
    name: "抹茶アイス",
    price: 380,
    description: "濃厚な宇治抹茶アイス",
    emoji: "\uD83C\uDF75",
    categoryId: "dessert",
  },
  {
    id: "de2",
    name: "わらび餅",
    price: 420,
    description: "もちもち食感のわらび餅",
    emoji: "\uD83C\uDF61",
    categoryId: "dessert",
  },
];
