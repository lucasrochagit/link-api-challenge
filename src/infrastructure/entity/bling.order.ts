export class BlingOrderXml {
  pedido: OrderXml;
}

type OrderXml = {
  cliente: ClientXml;
  items: any[];
};

type ClientXml = {
  nome: string;
  email: string;
  fone: string;
};
