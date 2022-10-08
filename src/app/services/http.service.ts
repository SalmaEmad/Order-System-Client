import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { DecryptService } from './decrypt.service';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  localStorage: DecryptService;
  constructor(private http : HttpClient, private injector: Injector) {
    this.localStorage = this.injector.get(DecryptService);
   }

   prepareRequestHeaders(){
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    });
    return headers;
  }

  prepareRequestHeadersWithToken() {
    const user = JSON.parse(JSON.stringify(this.localStorage.getItem('token')));
    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      'Authorization': 'Bearer ' + user
    });
    return headers;
  }

  prepareRequestHeaderWithFormData()
  {
    const user = JSON.parse(JSON.stringify(this.localStorage.getItem('token')));
    let headers: HttpHeaders = new HttpHeaders({
      'encrypt': 'multipart/form-data',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
      'Authorization': 'Bearer ' + user
    });
    return headers;
  }

  POSTWithoutToken(url: any, data: any) {
    return this.http.post(url,data,{ headers: this.prepareRequestHeaders() })
      .pipe()
  }

  POST(url: any, data: any) {
    return this.http.post(url,data,{ headers: this.prepareRequestHeadersWithToken() })
      .pipe()
  }

  POSTWithForm(url: any, data:any)
  {
    const formData : FormData = new FormData();
    formData.append("ProductImage", data.ProductImage);
    formData.append("ProductName", data.ProductName)
    formData.append('ProductPrice',data.ProductPrice)
    return this.http.post(url, formData, { headers: this.prepareRequestHeaderWithFormData() })
      .pipe()

  }

  DELETE(url:any){
    return this.http.delete(url, {headers: this.prepareRequestHeadersWithToken()})
    .pipe()
  }

  GET(url:any) {
    return this.http.get(url, { headers: this.prepareRequestHeadersWithToken() })
      .pipe()
  }

  PUT(url: any, data: any){
    return this.http.put(url,data, {headers: this.prepareRequestHeadersWithToken()})
    .pipe()
  }

  
  isLoggedIn() {
    return !!this.localStorage.getItem('token');
  }

  getToken(){
    return this.localStorage.getItem('token');
  }

  getUser(){
    return this.localStorage.getItem('username');
  }
  
}
