import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthServiceService {
  constructor() {}

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles():string[] | null {
    const rolesData = localStorage.getItem('roles');

    if (rolesData) {
      return JSON.parse(rolesData);
    } else {
      return null;
    }
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }


  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }
}
