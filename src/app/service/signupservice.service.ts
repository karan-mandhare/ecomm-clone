import { Injectable } from '@angular/core';
import { CommonhttpService } from './commonhttp.service';
import { BaseUrlsService } from './base-urls.service';

@Injectable({
  providedIn: 'root'
})
export class SignupserviceService {

  constructor(private httService: CommonhttpService, private url: BaseUrlsService) { }

  createUser(data: any, callback: Function) {
    let url = this.url.getBaseUrl('auth') + '' + this.url.getBaseUrl('register');
    this.httService.httpPost(url, data, (result: any) => {
      if (callback) {
        callback(result)
      }
    })
  }
}
