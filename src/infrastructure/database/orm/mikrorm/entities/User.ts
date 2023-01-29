import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class User {
  @PrimaryKey()
  id: string = v4();

  @Property()
  firstName!: string;

  @Property()
  lastName!: string;

  @Property()
  meta!: object;

  @Property({ defaultRaw: 'now' })
  cratedAt!: Date;

  @Property({ defaultRaw: 'now' })
  updatedAt!: Date;
}
