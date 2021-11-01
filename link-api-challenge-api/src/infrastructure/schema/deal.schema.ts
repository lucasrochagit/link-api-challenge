import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

export type DealDocument = Deal & Document;

export type DealAggregate = {
  total_value: number;
  count: number;
  date: string;
};

type Client = {
  name: string;
  email: string;
  phone: string;
};

type Product = {
  name: string;
  quantity: number;
  item_price: number;
};

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  versionKey: false,
})
export class Deal {
  @Prop()
  deal_id: number;

  @Prop()
  date: string;

  @Prop({ type: Object })
  client: Client;

  @Prop({ type: [{ type: Object }] })
  products: Product[];

  @Prop()
  value: number;
}

export const DealSchema = SchemaFactory.createForClass(Deal);
