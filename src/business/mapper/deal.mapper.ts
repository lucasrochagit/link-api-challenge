import { Injectable } from '@nestjs/common';
import { DealDocument } from '../../infrastructure/schema/deal.schema';

@Injectable()
export class DealMapper {
  toDocument(deal: any, products: any, date: string): DealDocument {
    const result = {
      client: { name: '', phone: '', email: '' },
      products: [],
    } as DealDocument;
    result.date = date;
    if (deal.id) result.deal_id = deal.id;
    if (deal.person_id) {
      if (deal.person_id.name) result.client.name = deal.person_id.name;
      if (deal.person_id.phone && deal.person_id.phone.length > 0) {
        const primaryPhone = deal.person_id.phone.find(
          (phone: any) => phone.primary,
        );
        result.client.phone = primaryPhone ? primaryPhone.value : '';
      }
      if (deal.person_id.email && deal.person_id.email.length > 0) {
        const primaryEmail = deal.person_id.email.find(
          (email: any) => email.primary,
        );
        result.client.email = primaryEmail ? primaryEmail.value : '';
      }
    }
    if (products.length > 0) {
      result.products = products.map((product) => {
        return {
          name: product.name,
          quantity: product.quantity,
          item_price: product.item_price,
        };
      });
    }
    if (deal.value) result.value = deal.value;
    return result;
  }
}
