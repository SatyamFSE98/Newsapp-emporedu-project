import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  public setRoles(roles: { roleName: string }[]) {
    sessionStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): { roleName: string }[] {
    return JSON.parse(sessionStorage.getItem('roles') as string);
    
  }

  public setToken(jwtToken: string) {
    sessionStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return sessionStorage.getItem('jwtToken') as string;
  }

  public clear() {
    sessionStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && !!this.getToken();
  }

  public isAdmin() {
    const roles = this.getRoles();
    return roles.length > 0 && roles[0].roleName === 'Admin';
  }

  public isUser() {
    const roles = this.getRoles();
    return roles.length > 0 && roles[0].roleName === 'User';
  }
}