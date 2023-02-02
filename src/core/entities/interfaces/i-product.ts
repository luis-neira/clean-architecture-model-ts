export interface IProduct {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  color: string;
  meta: Record<string, any>;
  orders?: unknown;
  createdAt?: Date;
  updatedAt?: Date;

  toJSON(): Omit<IProduct, 'toJSON'> | {}
}
