export default interface IProductDto {
  productId: string,
  name: string,
  description: string,
  images: string[],
  price: string,
  color: string,
  meta: Record<string, any>
}
