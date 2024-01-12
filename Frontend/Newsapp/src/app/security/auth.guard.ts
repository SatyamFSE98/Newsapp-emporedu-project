import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserServiceService } from '../_services/user-service.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: UserServiceService 
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
   
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.userAuthService.getToken() !== null) {
      const role = route.data['roles'] as Array<string>;

      if (role) {
        const match = this.userService.roleMatch(role);

        if (match) {
          return true;
        } else {
          return false;
        }
      }


    }

    this.router.navigate(['/login']);
    return false;
  }
}
