import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { UserAuthService } from './user-auth.service';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  _baseUrl = "http://54.220.198.214:9096/api/v1.0";

  _baseUrlsignup = "http://54.220.198.214:9091/api/v1.0"

  requestHeader = new HttpHeaders({
    'NoAuth': "True"
  });

  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) { }

  public login(loginData: any) {
    return this.httpClient.post(this._baseUrl + "/authentication" + "/login", loginData, { headers: this.requestHeader });
  }

  public registerNewUser(user: User) {
    return this.httpClient.post(this._baseUrlsignup + "/userProfile/register", user);

  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this._baseUrl + '/userProfile/register', user);
  }


  public forUser() {
    return this.httpClient.get(this._baseUrl + '/forUser', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpClient.get(this._baseUrl + '/forAdmin', {
      responseType: 'text',
    });
  }

 

  public roleMatch(allowedRoles: any): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let j = 0; j < allowedRoles.length; j++) {
        if (userRoles === allowedRoles[j]) {
          isMatch = true;
          return isMatch;
        } else {
          return isMatch;
        }
      }

    }
    return isMatch;
  }

  // public roleMatch(allowedRoles: string[]): boolean {
  //   let isMatch = false;
  //   const userRoles: { roleName: string; }[] | null = this.userAuthService.getRoles();
  
  //   if (userRoles !== null && userRoles.length > 0) {
  //     for (let j = 0; j < allowedRoles.length; j++) {
  //       if (userRoles.some(role => role.roleName === allowedRoles[j])) {
  //         isMatch = true;
  //         return isMatch;
  //       }
  //     }
  //   }
  //   return isMatch;
  // }
}
