export interface Product {
  id?: string;
  categoryId: string;
  image?: string;
  name: string;
  description: string;
  cost: number;
  rating: number;
  gender: string;
  count: number;
  soldCount?: number;
}
