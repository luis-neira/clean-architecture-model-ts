import { Entity, PrimaryKey, Property, t } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class Product {
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
}
