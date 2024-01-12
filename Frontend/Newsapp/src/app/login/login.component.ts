import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../_services/user-service.service';
import { UserAuthService } from '../_services/user-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor(public userservice: UserServiceService, private userAuthService: UserAuthService, private router: Router,) { }

 

  loginData = {
    username: '',
    password: '',
  };

  login() {
    console.log(this.loginData);
    this.userservice.login(this.loginData).subscribe(
      (response: any) => {
        console.log(response);
        if (Array.isArray(response.roles) && response.roles.length > 0) {
          this.userAuthService.setRoles(response.roles[0].name);
          this.userAuthService.setToken(response.accessToken);
  
          const role = response.roles[0].name;
          console.log(role);
          if (role === 'ROLE_CUSTOMER') {
            this.router.navigate(['/newslist']);
          } else {
            this.router.navigate(['/']);
          }
        }
      },
      (error) => {
        console.log(error);
        // Display SweetAlert for invalid username or password
        Swal.fire({
          icon: 'error',
          title: 'Invalid Credentials',
          text: 'Please check your username and password and try again.',
        });
      }
    );
  }
}