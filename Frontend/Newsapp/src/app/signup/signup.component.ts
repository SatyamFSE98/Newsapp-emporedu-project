import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { UserServiceService } from '../_services/user-service.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userForm: FormGroup;


  defaultUser: User = {
    id: 0,
    username: '',
    firstName: '',
    lastName: '',
    number: 0,
    dateOfBirth: '',
    email: '',
    roles: ["User"],
    password: '',
    confirmPassword: '',
    securityQuestion: 'What is your favorite color?',
    securityAnswer: 'Blue'
  };

  constructor(private fb: FormBuilder, private userService: UserServiceService, private routes: Router) {

    this.userForm = this.fb.group({
      email: [this.defaultUser.email, [Validators.required, Validators.email]],
      username: [this.defaultUser.username, Validators.required],
      firstName: [this.defaultUser.firstName, Validators.required],
      lastName: [this.defaultUser.lastName, Validators.required],
      password: [this.defaultUser.password, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [this.defaultUser.confirmPassword, [Validators.required, Validators.minLength(6)]],
      number: [this.defaultUser.number, [Validators.pattern('[0-9]*'), Validators.minLength(10)]],
      dateOfBirth: [this.defaultUser.dateOfBirth || '', Validators.required],
      roles: [this.defaultUser.roles || '', Validators.required],
      securityQuestion: [this.defaultUser.securityQuestion || '', Validators.required],
      securityAnswer: [this.defaultUser.securityAnswer || '', Validators.required],
      shareData: [false]
    }, { validators: this.passwordMatchValidator });
  }
  ngOnInit(): void {
    console.log("method not implemented")
  }
 

 



  signUp() {
    console.log('Sign up button clicked');
    console.log('Form values:', this.userForm.value);
    console.log(this.userForm);

    console.log(this.userForm.value);
    if (this.userForm.value) {

      this.userService.registerNewUser(this.userForm.value).subscribe(
        (response: any) => {

          console.log('User registered successfully', response);
          Swal.fire('Registered Successfully!');
          this.routes.navigate(['/login']);
        },
        (error: any) => {

          console.error('Error during user registration', error);
        }
      );
    } else {

      console.error('Form is invalid. Cannot submit.');
    }
  }

  passwordMatchValidator(group: FormGroup): { [s: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmpassword')?.value;

    if (password && confirmPassword) {
      return password === confirmPassword ? null : { passwordMismatch: true };
    }

    return null;
  }
}