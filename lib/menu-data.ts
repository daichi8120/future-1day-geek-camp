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
  image: string;
  categoryId: string;
  isSoldOut?: boolean;
  isPopular?: boolean;
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
    name: "OSAKI特製ハンバーグ",
    price: 1280,
    description: "肉汁たっぷりの自家製ハンバーグ。デミグラスソースでどうぞ",
    image: "/hunberg.jpeg",
    categoryId: "recommended",
    isPopular: true,
  },
  {
    id: "r2",
    name: "本日の刺身盛り合わせ",
    price: 1480,
    description: "市場直送の新鮮な旬の魚介を豪華に盛り合わせ",
    image: "/hunberg.jpeg",
    categoryId: "recommended",
    isPopular: true,
  },
  {
    id: "r3",
    name: "海老天ぷら定食",
    price: 1180,
    description: "サクサク衣の大海老天ぷら。ご飯・味噌汁付き",
    image: "/hunberg.jpeg",
    categoryId: "recommended",
  },
  // メイン
  {
    id: "m1",
    name: "和牛サーロインステーキ",
    price: 2480,
    description: "A5ランク黒毛和牛のサーロインを贅沢に",
    image: "/hunberg.jpeg",
    categoryId: "main",
    isPopular: true,
  },
  {
    id: "m2",
    name: "チキン南蛮",
    price: 980,
    description: "ジューシーなチキンに特製タルタルソース",
    image: "/hunberg.jpeg",
    categoryId: "main",
  },
  {
    id: "m3",
    name: "鯖の味噌煮定食",
    price: 880,
    description: "じっくり煮込んだ定番の一品。ご飯がすすむ味",
    image: "/hunberg.jpeg",
    categoryId: "main",
    isSoldOut: true,
  },
  {
    id: "m6",
    name: "味噌カツ定食",
    price: 1080,
    description: "サクサクのとんかつに濃厚な赤味噌ダレ",
    image: "/hunberg.jpeg",
    categoryId: "main",
  },
  {
    id: "m4",
    name: "特上 海鮮丼",
    price: 1500,
    description: "新鮮な海の幸をふんだんに使用した贅沢丼",
    image: "/hunberg.jpeg",
    categoryId: "main",
  },
  {
    id: "m5",
    name: "鶏の唐揚げ定食",
    price: 950,
    description: "サクサクでジューシーな定番の唐揚げ",
    image: "/hunberg.jpeg",
    categoryId: "main",
    isPopular: true,
  },
  // サイド
  {
    id: "s1",
    name: "枝豆",
    price: 380,
    description: "塩茹でした新鮮な枝豆。ビールのお供に",
    image: "/hunberg.jpeg",
    categoryId: "side",
  },
  {
    id: "s2",
    name: "シーザーサラダ",
    price: 580,
    description: "パルメザンチーズとクルトンたっぷり",
    image: "/hunberg.jpeg",
    categoryId: "side",
  },
  {
    id: "s3",
    name: "だし巻き卵",
    price: 480,
    description: "ふわふわ食感の自家製だし巻き卵",
    image: "/hunberg.jpeg",
    categoryId: "side",
    isSoldOut: true,
  },
  {
    id: "s4",
    name: "冷奴",
    price: 320,
    description: "国産大豆の絹ごし豆腐。薬味たっぷり",
    image: "/hunberg.jpeg",
    categoryId: "side",
  },
  // ドリンク
  {
    id: "d1",
    name: "生ビール（中）",
    price: 550,
    description: "キンキンに冷えた生ビール",
    image: "/hunberg.jpeg",
    categoryId: "drink",
    isPopular: true,
  },
  {
    id: "d2",
    name: "ハイボール",
    price: 480,
    description: "すっきり爽やかなハイボール",
    image: "/hunberg.jpeg",
    categoryId: "drink",
  },
  {
    id: "d3",
    name: "ウーロン茶",
    price: 280,
    description: "さっぱりとした味わい。お食事のお供に",
    image: "/hunberg.jpeg",
    categoryId: "drink",
  },
  {
    id: "d4",
    name: "レモンサワー",
    price: 450,
    description: "搾りたてレモンの爽やかサワー",
    image: "/hunberg.jpeg",
    categoryId: "drink",
  },
  // デザート
  {
    id: "de1",
    name: "季節のフルーツパフェ",
    price: 850,
    description: "旬のフルーツをたっぷり使った贅沢パフェ",
    image: "/hunberg.jpeg",
    categoryId: "dessert",
    isPopular: true,
  },
  {
    id: "de2",
    name: "自家製 濃厚プリン",
    price: 400,
    description: "卵の風味が豊かな昔ながらの固めプリン",
    image: "/hunberg.jpeg",
    categoryId: "dessert",
  },
  {
    id: "de3",
    name: "抹茶アイス",
    price: 380,
    description: "濃厚な宇治抹茶を使った本格アイス",
    image: "/hunberg.jpeg",
    categoryId: "dessert",
  },
];
