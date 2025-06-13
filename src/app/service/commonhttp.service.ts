import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonhttpService {

  myHeaders = new HttpHeaders();
  type!: 'json';
  baseUrl = new Map<string, string>();

  constructor(private _http: HttpClient) {
    this.myHeaders = this.myHeaders.set('Content-Type', 'application/json');
  }


  getBaseUrl(key: string) {
    return this.baseUrl.get(key);
  }

  getWebBase(url: string): string {
    return environment.apiurl + url;
  }



  httpModel(http: Observable<Object>, callback: Function): void {
    http.subscribe({
      next: (result) => {
        if (callback) {
          callback(result);
        }
      },
      error: (error) => {
        if (callback) {
          callback(error);
        }
      }
    });
  }


  httpGet(url: any, params: HttpParams, callback: Function): void {
    this.httpModel(this._http.get(this.getWebBase(url),
      {
        headers: this.myHeaders,
        params: params
      })
      .pipe(map(data => {
        return data;
      })), callback);
  }

  httpPut(url: any, params: HttpParams, callback: Function): void {
    this.httpModel(this._http.put(this.getWebBase(url),
      {
        headers: this.myHeaders,
        params: params
      })
      .pipe(map(data => {
        return data;
      })), callback);
  }

  httpDelete(url: any, params: HttpParams, callback: Function): void {
    this.httpModel(this._http.delete(this.getWebBase(url),
      {
        headers: this.myHeaders,
        params: params
      })
      .pipe(map(data => {
        return data;
      })), callback);
  }

  httpPost(url: any, data: any, callback: Function) {
    this.httpModel(this._http.post(this.getWebBase(url), data)
      .pipe(map(data => {
        return data;
      })), callback);
  }
}
