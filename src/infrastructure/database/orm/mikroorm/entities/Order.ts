import { Entity, PrimaryKey, Property, t, ArrayType } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class Order {
  @PrimaryKey({ type: t.uuid, nullable: false})
  id: string = v4();

  @Property({ type: t.uuid, nullable: false })
  userId!: string;

  @Property({ type: t.array, nullable: false })
  productIds!: string[];

  @Property({ type: t.datetime, defaultRaw: 'NOW()', nullable: false })
  date!: number;

  @Property({ type: t.boolean, default: false, nullable: false })
  isPaid!: boolean;

  @Property({ type: t.json, defaultRaw: "'{}'", nullable: false })
  meta!: Record<string, any>;

  @Property({ type: t.datetime, defaultRaw: 'NOW()', nullable: false })
  createdAt!: Date;

  @Property({ type: t.datetime, defaultRaw: 'NOW()', nullable: false })
  updatedAt!: Date;
}
