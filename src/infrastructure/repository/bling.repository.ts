import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import * as Easyxml from 'easyxml';
import { BlingOrderXml } from '../entity/bling.order';

@Injectable()
export class BlingRepository {
  private readonly _bling_url: string;
  private readonly _api_key: string;
  private readonly _xml_converter: any;

  constructor() {
    const { BLING_URL, BLING_API_KEY } = process.env;
    [this._bling_url, this._api_key] = [BLING_URL, BLING_API_KEY];
    this._xml_converter = new Easyxml({
      singuralize: true,
      rootElement: 'pedido',
      manifest: true,
    });
  }

  async createOrder(order: BlingOrderXml): Promise<void> {
    const xmlOrder = this._xml_converter
      .render(order)
      .replace(/items/gi, 'itens');
    const url = `${this._bling_url}/pedido/json?apikey=${this._api_key}&xml=${xmlOrder}`;

    return new Promise<void>((resolve, reject) => {
      axios
        .post(url)
        .then((res) => {
          if (res.data?.retorno?.erros) {
            return reject(this.parseError(res));
          }
          return resolve();
        })
        .catch((err) => reject(this.parseError(err.response)));
    });
  }

  private parseError(err: any): HttpException {
    const exception_body = {
      message:
        'An error occured while make this request. Please try again later.',
    };
    const {
      status = HttpStatus.INTERNAL_SERVER_ERROR,
      data: { retorno: { erros = [] } = {} },
    } = err;
    const error = erros[0];
    if (error) {
      exception_body.message = error.msg;
    }
    return new HttpException(exception_body, +status);
  }
}
