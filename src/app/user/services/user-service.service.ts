import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from 'src/app/model/CommonResponse';
import { BaseUrlsService } from 'src/app/service/base-urls.service';
import { CommonhttpService } from 'src/app/service/commonhttp.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(private httpService: CommonhttpService, private baseUrls: BaseUrlsService) { }

  updateCart(id: any) {
    // return this.http.post(`${environment.apiurl}/update-cart`, { id: id });
  }


}
