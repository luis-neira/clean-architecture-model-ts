export default interface IEntityMapper<E, DTO> {
  toDTO(entity: E): DTO;
  
  toDomain(raw: { [key:string]: any }): E;
}
