import { Entity, PrimaryKey, Property, t, wrap } from '@mikro-orm/core';
import { v4 } from 'uuid';

import { IUser } from '@core/entities/interfaces';

@Entity()
export class User implements IUser {
  @PrimaryKey({ type: t.uuid, nullable: false })
  id: string = v4();

  @Property({ type: t.string, nullable: false })
  firstName!: string;

  @Property({ type: t.string, nullable: false })
  lastName!: string;

  @Property({ type: t.json, defaultRaw: "'{}'", nullable: false })
  meta!: Record<string, any>;

  @Property({ type: t.datetime, defaultRaw: 'NOW()', nullable: false })
  createdAt!: Date;

  @Property({ type: t.datetime, defaultRaw: 'NOW()', nullable: false })
  updatedAt!: Date;

  toJSON() {
    const o = wrap<User>(this).toObject();
    return o;
  }
}
