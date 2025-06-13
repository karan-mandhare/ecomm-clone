import { Injectable } from '@angular/core';
import { CommonhttpService } from './commonhttp.service';
import { BaseUrlsService } from './base-urls.service';
import { HttpParams } from '@angular/common/http';
import { CommonResponse } from '../model/CommonResponse';
import { Category } from '../model/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrl!: string;

  constructor(private httpService: CommonhttpService, private url: BaseUrlsService) {
    this.apiUrl = this.url.getBaseUrl('admin') + '' + this.url.getBaseUrl('category')
  }

  addCategory(form: FormData, callback: Function) {
    let url = this.apiUrl + '/add-category';

    this.httpService.httpPost(url, form, (result: CommonResponse<any>) => {
      if (callback) {
        callback(result)
      }
    })
  }

  getCategories(callback: Function) {
    let url = this.apiUrl + '/get-categories';
    let params = new HttpParams;
    this.httpService.httpGet(url, params, (result: CommonResponse<Category>) => {
      if (callback) {
        callback(result)
      }
    })
  }

  deleteCategoryById(id: number, callback: Function) {
    let url = this.apiUrl + `/delete-category/${id}`
    let params = new HttpParams;
    this.httpService.httpDelete(url, params, (result: CommonResponse<Category>) => {
      if (callback) {
        callback(result)
      }
    })
  }

}
