import { Injectable } from '@angular/core';
import { CommonhttpService } from './commonhttp.service';
import { BaseUrlsService } from './base-urls.service';

@Injectable({
  providedIn: 'root'
})
export class LoginserviceService {

  constructor(private httpService: CommonhttpService, private url: BaseUrlsService) { }

  loginUser(data: any, callback: Function) {
    let url = this.url.getBaseUrl('auth') + '' + this.url.getBaseUrl('login');
    this.httpService.httpPost(url, data, (result: any) => {
      if (callback) {
        callback(result)
      }
    })
  }
}
