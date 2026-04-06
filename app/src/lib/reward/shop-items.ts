/**
 * Shop item master data.
 * MVP: 15 items across 3 types.
 */

export type ShopItemType = "figure" | "furniture" | "wallpaper";

export type ShopItem = {
  readonly id: string;
  readonly name: string;
  readonly type: ShopItemType;
  readonly price: number;
  readonly imageKey: string;
};

export const SHOP_ITEMS: readonly ShopItem[] = [
  // Figures (collectible characters)
  { id: "fig_cat", name: "ねこ", type: "figure", price: 20, imageKey: "figure_cat" },
  { id: "fig_dog", name: "いぬ", type: "figure", price: 20, imageKey: "figure_dog" },
  { id: "fig_bird", name: "とり", type: "figure", price: 25, imageKey: "figure_bird" },
  { id: "fig_fish", name: "さか���", type: "figure", price: 25, imageKey: "figure_fish" },
  { id: "fig_bear", name: "くま", type: "figure", price: 30, imageKey: "figure_bear" },

  // Furniture (room decoration)
  { id: "fur_chair", name: "いす", type: "furniture", price: 15, imageKey: "furniture_chair" },
  { id: "fur_table", name: "テーブル", type: "furniture", price: 15, imageKey: "furniture_table" },
  { id: "fur_lamp", name: "ランプ", type: "furniture", price: 20, imageKey: "furniture_lamp" },
  { id: "fur_plant", name: "しょくぶつ", type: "furniture", price: 20, imageKey: "furniture_plant" },
  { id: "fur_shelf", name: "たな", type: "furniture", price: 25, imageKey: "furniture_shelf" },

  // Wallpapers (room background)
  { id: "wp_sky", name: "そら", type: "wallpaper", price: 30, imageKey: "wallpaper_sky" },
  { id: "wp_forest", name: "もり", type: "wallpaper", price: 30, imageKey: "wallpaper_forest" },
  { id: "wp_ocean", name: "うみ", type: "wallpaper", price: 35, imageKey: "wallpaper_ocean" },
  { id: "wp_space", name: "うちゅう", type: "wallpaper", price: 40, imageKey: "wallpaper_space" },
  { id: "wp_candy", name: "おかし", type: "wallpaper", price: 40, imageKey: "wallpaper_candy" },
];
