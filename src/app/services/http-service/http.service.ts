import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient) { }

  postApiCall<T>(endpoint: string, data: any, headers?: HttpHeaders){
    return this.http.post<T>('http://localhost:3000'+endpoint, data, { headers })
  }

  getApiCall<T>(endpoint: string, headers: HttpHeaders){
    return this.http.get('http://localhost:3000'+endpoint, { headers })
  }

  // async loginSignupCall(endpoint: string, data: any): Promise<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   });

  //   try {
  //     const res = await this.http.post(this.baseUrl + endpoint, data, { headers }).toPromise()
  //     return res
  //   } catch (error) {
  //     return error
  //   }

  // }
}
