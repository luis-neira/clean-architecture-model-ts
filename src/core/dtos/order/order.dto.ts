export default interface IOrderDto {
  orderId: string,
  userId: string,
  productIds: string[],
  date: Date,
  isPayed: boolean,
  meta: Record<string, any>
}
