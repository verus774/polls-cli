import {BaseRequestOptions, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class DefaultRequestOptions extends BaseRequestOptions {

  constructor() {
    super();

    if (localStorage.getItem('access_token')) {
      this.headers.set('Authorization', localStorage.getItem('access_token'));
    }

  }

}

export const requestOptionsProvider = {provide: RequestOptions, useClass: DefaultRequestOptions};
