import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { HttpModule } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthorizationService {
BASE_URL: string = 'https://cardxchange.herokuapp.com';
  constructor(private http: Http) { }

  handleError(e) {
    return Observable.throw(e.json().message);
  }

  signup(signupInfo) {
  return this.http.post(`${this.BASE_URL}/api/signup`, signupInfo, {withCredentials: true})
  .map(res => res.json())
  .catch(this.handleError)
  }

 login(loginInfo) {
  return this.http.post(`${this.BASE_URL}/api/login`, loginInfo, {withCredentials: true})
  .map(res => res.json())
  .catch(this.handleError)
 }

 isLoggedIn() {
   return this.http.get(`${this.BASE_URL}/api/loggedin`, {withCredentials:true})
   .map(res => res.json())
   .catch(this.handleError)
 }

 logout() {
    return this.http.post(`${this.BASE_URL}/api/logout`, {withCredentials: true})
    .map(res => res.json())
    .catch(this.handleError)
 }

}
