export default interface IUserDto {
  userId: string,
  firstName: string,
  lastName: string,
  meta: {
    [key: string]: any
  }
}
