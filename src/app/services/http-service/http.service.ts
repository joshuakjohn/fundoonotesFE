import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(public http: HttpClient) { }

  loginApiCall(endpoint: string, data: any){
    return this.http.post('http://localhost:3000'+endpoint, data)
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
