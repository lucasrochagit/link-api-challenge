import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class PipedriveRepository {
  private readonly _url: string;
  private readonly _api_token: string;

  constructor() {
    const { PIPEDRIVE_URL, PIPEDRIVE_API_TOKEN } = process.env;
    [this._url, this._api_token] = [PIPEDRIVE_URL, PIPEDRIVE_API_TOKEN];
  }

  async findDeals(params: { [key: string]: any }): Promise<any> {
    const url = `${this._url}/deals`;
    const options = { params: { api_token: this._api_token, ...params } };

    return new Promise<any>((resolve, reject) => {
      axios
        .get(url, options)
        .then((res) => {
          if (res.data.success === true) {
            return resolve(res.data);
          }
          return reject(this.parseError(res.data));
        })
        .catch((err) => {
          return reject(this.parseError(err.response?.data));
        });
    });
  }

  async findProductsFromDeal(id: number): Promise<any> {
    const url = `${this._url}/deals/${id}/products`;
    const options = { params: { api_token: this._api_token } };

    return new Promise<any>((resolve, reject) => {
      axios
        .get(url, options)
        .then((res) => {
          if (res.data.success === true) {
            return resolve(res.data);
          }
          return reject(this.parseError(res.data));
        })
        .catch((err) => {
          return reject(this.parseError(err.response?.data));
        });
    });
  }

  private parseError(error: any): HttpException {
    const {
      error_info:
        message = 'An error occured while make this request. Please try again later.',
      error: type = 'Internal Server Error',
      errorCode: code = HttpStatus.INTERNAL_SERVER_ERROR,
    } = error || {};
    return new HttpException(
      {
        message,
        type,
      },
      +code,
    );
  }
}
