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
