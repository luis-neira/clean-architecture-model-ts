import { Entity, PrimaryKey, Property, t, wrap } from '@mikro-orm/core';
import { v4 } from 'uuid';

import { IProduct } from '@core/entities/interfaces';

@Entity()
export class Product implements IProduct {
  @PrimaryKey({ type: t.uuid, nullable: false})
  id: string = v4();

  @Property({ type: t.string, nullable: false })
  name!: string;

  @Property({ type: t.text, nullable: false })
  description!: string;

  @Property({ type: t.array, default: [], nullable: false })
  images!: string[];

  @Property({ type: t.float, default: 0.00, nullable: false, unsigned: true })
  price!: number;

  @Property({ type: t.string, nullable: false })
  color!: string;

  @Property({ type: t.json, defaultRaw: "'{}'", nullable: false })
  meta!: Record<string, any>;

  @Property({ type: t.datetime, defaultRaw: 'NOW()', nullable: false })
  createdAt!: Date;

  @Property({ type: t.datetime, defaultRaw: 'NOW()', nullable: false })
  updatedAt!: Date;

  toJSON() {
    const o = wrap<Product>(this).toObject();
    return o;
  }
}
