export interface IOrder {
  id: string;
  userId: string;
  productIds: string[];
  date: Date;
  isPaid: boolean;
  meta: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;

  toJSON(): Omit<IOrder, 'toJSON'> | {}
}
