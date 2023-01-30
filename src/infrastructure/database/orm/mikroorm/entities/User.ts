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

  @Property({ defaultRaw: 'NOW()' })
  createdAt!: Date;

  @Property({ defaultRaw: 'NOW()' })
  updatedAt!: Date;
}
