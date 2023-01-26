export default interface IOrderDto {
  orderId: string,
  userId: string,
  productIds: string[],
  date: Date,
  isPaid: boolean,
  meta: Record<string, any>
}
