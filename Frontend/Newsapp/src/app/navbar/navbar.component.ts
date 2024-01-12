import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isNavbarFixed = false;
  isLoggedIn = false;

  constructor(private router: Router, private userauthservice: UserAuthService) { }

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isNavbarFixed = window.scrollY > 0;
  }


  isloginUser(): boolean {

    if (this.userauthservice.isLoggedIn()) {
      return true;
      this.isLoggedIn=true;
    }
    return false;

  }


  logoutUser(): void {

    this.userauthservice.clear();

    this.isLoggedIn = false;


    this.router.navigate(['/home']);
  }

}
