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

export interface IProductResponse {
  limit: number;
  products: IProduct[];
  skip: number;
  total: number;
}

export interface IProps {
  open: boolean;
  onClose: () => void;
  product: IProduct;
}

export interface ICartProduct extends Omit<IProduct, 'category' | 'tags' | 'rating'> {
  category?: string;
  tags?: string;
  rating?: number;
}

export interface IProductCategories {
  categories: string[];
  selectedCategory: string | null;
  onSelect: (category: string | null) => void;
}
