export default interface ICreateUserDto {
  firstName: string,
  lastName: string,
  meta: {
    [key: string]: any
  }
}
