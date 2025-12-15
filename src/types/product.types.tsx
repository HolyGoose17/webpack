export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  thumbnail: string;
  images: string[];
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  tags: string[];
}

export type ProductInput = Omit<IProduct, "id">;

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

export interface IErrorResponse {
  status: number;
  data: {
    message: string;
  };
}
