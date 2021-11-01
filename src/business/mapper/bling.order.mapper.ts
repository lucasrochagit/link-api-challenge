import { Injectable } from '@nestjs/common';
import { BlingOrderXml } from '../../infrastructure/entity/bling.order';
import { Deal } from '../../infrastructure/schema/deal.schema';

@Injectable()
export class BlingOrderMapper {
  toXmlBlingOrder(deal: any, products: any[], date: string): BlingOrderXml {
    const pedido = {
      data: date,
      cliente: { nome: '', fone: '', email: '' },
      items: [],
    };
    if (deal.person_id) {
      if (deal.person_id.name) pedido.cliente.nome = deal.person_id.name;
      if (deal.person_id.phone && deal.person_id.phone.length > 0) {
        const primaryPhone = deal.person_id.phone.find(
          (phone: any) => phone.primary,
        );
        pedido.cliente.fone = primaryPhone ? primaryPhone.value : '';
      }
      if (deal.person_id.email && deal.person_id.email.length > 0) {
        const primaryEmail = deal.person_id.email.find(
          (email: any) => email.primary,
        );
        pedido.cliente.email = primaryEmail ? primaryEmail.value : '';
      }
    }
    if (products.length > 0) {
      pedido.items = products.map((product) => {
        return {
          codigo: product.name,
          descricao: product.name,
          un: 'Un',
          qtde: product.quantity,
          vlr_unit: product.item_price,
        };
      });
    }

    return { pedido };
  }
}
