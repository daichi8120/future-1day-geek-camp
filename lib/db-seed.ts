import sql from "./db";

async function seed() {
  // テーブル作成
  await sql`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      emoji TEXT NOT NULL
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS menu_items (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price INTEGER NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      category_id TEXT NOT NULL REFERENCES categories(id),
      is_sold_out BOOLEAN NOT NULL DEFAULT false,
      is_popular BOOLEAN NOT NULL DEFAULT false
    )
  `;

  // 既存データをクリア
  await sql`DELETE FROM menu_items`;
  await sql`DELETE FROM categories`;

  // カテゴリ投入
  const categories = [
    { id: "recommended", name: "おすすめ", emoji: "⭐" },
    { id: "main", name: "メイン", emoji: "🍖" },
    { id: "side", name: "サイド", emoji: "🥗" },
    { id: "drink", name: "ドリンク", emoji: "🍺" },
    { id: "dessert", name: "デザート", emoji: "🍰" },
  ];

  for (const cat of categories) {
    await sql`
      INSERT INTO categories (id, name, emoji)
      VALUES (${cat.id}, ${cat.name}, ${cat.emoji})
    `;
  }

  // メニューアイテム投入
  const menuItems = [
    { id: "r1", name: "OSAKI特製ハンバーグ", price: 1280, description: "肉汁たっぷりの自家製ハンバーグ。デミグラスソースでどうぞ", image: "/hunberg.jpeg", category_id: "recommended", is_popular: true },
    { id: "r2", name: "本日の刺身盛り合わせ", price: 1480, description: "市場直送の新鮮な旬の魚介を豪華に盛り合わせ", image: "/hunberg.jpeg", category_id: "recommended", is_popular: true },
    { id: "r3", name: "海老天ぷら定食", price: 1180, description: "サクサク衣の大海老天ぷら。ご飯・味噌汁付き", image: "/hunberg.jpeg", category_id: "recommended" },
    { id: "m1", name: "和牛サーロインステーキ", price: 2480, description: "A5ランク黒毛和牛のサーロインを贅沢に", image: "/hunberg.jpeg", category_id: "main", is_popular: true },
    { id: "m2", name: "チキン南蛮", price: 980, description: "ジューシーなチキンに特製タルタルソース", image: "/hunberg.jpeg", category_id: "main" },
    { id: "m3", name: "鯖の味噌煮定食", price: 880, description: "じっくり煮込んだ定番の一品。ご飯がすすむ味", image: "/hunberg.jpeg", category_id: "main", is_sold_out: true },
    { id: "m6", name: "味噌カツ定食", price: 1080, description: "サクサクのとんかつに濃厚な赤味噌ダレ", image: "/hunberg.jpeg", category_id: "main" },
    { id: "m4", name: "特上 海鮮丼", price: 1500, description: "新鮮な海の幸をふんだんに使用した贅沢丼", image: "/hunberg.jpeg", category_id: "main" },
    { id: "m5", name: "鶏の唐揚げ定食", price: 950, description: "サクサクでジューシーな定番の唐揚げ", image: "/hunberg.jpeg", category_id: "main", is_popular: true },
    { id: "s1", name: "枝豆", price: 380, description: "塩茹でした新鮮な枝豆。ビールのお供に", image: "/hunberg.jpeg", category_id: "side" },
    { id: "s2", name: "シーザーサラダ", price: 580, description: "パルメザンチーズとクルトンたっぷり", image: "/hunberg.jpeg", category_id: "side" },
    { id: "s3", name: "だし巻き卵", price: 480, description: "ふわふわ食感の自家製だし巻き卵", image: "/hunberg.jpeg", category_id: "side", is_sold_out: true },
    { id: "s4", name: "冷奴", price: 320, description: "国産大豆の絹ごし豆腐。薬味たっぷり", image: "/hunberg.jpeg", category_id: "side" },
    { id: "d1", name: "生ビール（中）", price: 550, description: "キンキンに冷えた生ビール", image: "/hunberg.jpeg", category_id: "drink", is_popular: true },
    { id: "d2", name: "ハイボール", price: 480, description: "すっきり爽やかなハイボール", image: "/hunberg.jpeg", category_id: "drink" },
    { id: "d3", name: "ウーロン茶", price: 280, description: "さっぱりとした味わい。お食事のお供に", image: "/hunberg.jpeg", category_id: "drink" },
    { id: "d4", name: "レモンサワー", price: 450, description: "搾りたてレモンの爽やかサワー", image: "/hunberg.jpeg", category_id: "drink" },
    { id: "de1", name: "季節のフルーツパフェ", price: 850, description: "旬のフルーツをたっぷり使った贅沢パフェ", image: "/hunberg.jpeg", category_id: "dessert", is_popular: true },
    { id: "de2", name: "自家製 濃厚プリン", price: 400, description: "卵の風味が豊かな昔ながらの固めプリン", image: "/hunberg.jpeg", category_id: "dessert" },
    { id: "de3", name: "抹茶アイス", price: 380, description: "濃厚な宇治抹茶を使った本格アイス", image: "/hunberg.jpeg", category_id: "dessert" },
  ];

  for (const item of menuItems) {
    await sql`
      INSERT INTO menu_items (id, name, price, description, image, category_id, is_sold_out, is_popular)
      VALUES (${item.id}, ${item.name}, ${item.price}, ${item.description}, ${item.image}, ${item.category_id}, ${item.is_sold_out ?? false}, ${item.is_popular ?? false})
    `;
  }

  console.log("Seed completed: 5 categories, 20 menu items");
  await sql.end();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
