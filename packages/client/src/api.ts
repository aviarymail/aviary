import fetch from 'node-fetch';

export interface ApiOpts {
  key: string;
  secret: string;
}

type GetEndpoints = '/introspect';
type PostEndpoints = '/send';

export class Api {
  host: string = 'https://aviaryemail.com';
  key: string;
  secret: string;

  constructor(opts: ApiOpts) {
    this.key = opts.key;
    this.secret = opts.secret;
  }

  get = async (endpoint: GetEndpoints) => {
    return fetch(this._url(endpoint), {
      method: 'GET',
      headers: this._headers(),
    });
  };

  post = async (endpoint: PostEndpoints, body: object = {}) => {
    return fetch(this._url(endpoint), {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify(body),
    });
  };

  _url = (endpoint: GetEndpoints | PostEndpoints) => {
    return this.host + endpoint;
  };

  _headers = () => {
    return {
      'Content-Type': 'application/json',
      'X-Aviary-Key': this.key,
      'X-Aviary-Secret': this.key,
    };
  };
}
