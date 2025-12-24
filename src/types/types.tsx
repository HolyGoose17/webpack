export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  tags: string[];
  rating: number;
}

export interface IProductInput extends Omit<IProduct, 'id'> {}

export interface IProductUpdate {
  id: number;
  product: Partial<IProduct>;
}

export interface IProductResponse {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
}

export interface ICartProduct extends Omit<IProduct, 'category' | 'tags' | 'rating'> {
  category?: string;
  tags?: string;
  rating?: number;
}

export interface IProps {
  categories: string[];
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
}
