import { Entity, PrimaryKey, Property, t, wrap, ManyToOne } from '@mikro-orm/core';
import { v4 } from 'uuid';

import { IOrder } from '@core/entities/interfaces';
import { User } from './User'

@Entity()
export class Order implements IOrder {
  @PrimaryKey({ type: t.uuid, nullable: false})
  id: string = v4();

  @Property({ type: t.array, nullable: false })
  productIds!: string[];

  @Property({ type: t.datetime, defaultRaw: 'NOW()', nullable: false })
  date!: Date;

  @Property({ type: t.boolean, default: false, nullable: false })
  isPaid!: boolean;

  @Property({ type: t.json, defaultRaw: "'{}'", nullable: false })
  meta!: Record<string, any>;

  @ManyToOne(() => User)
  user!: User;

  @Property({ type: t.datetime, defaultRaw: 'NOW()', nullable: false })
  createdAt!: Date;

  @Property({ type: t.datetime, defaultRaw: 'NOW()', nullable: false })
  updatedAt!: Date;

  toJSON() {
    const o = wrap<Order>(this).toObject();
    return o;
  }
}
