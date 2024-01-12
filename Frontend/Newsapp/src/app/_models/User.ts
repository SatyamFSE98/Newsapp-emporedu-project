import { Validators } from '@angular/forms';

export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    number: number;
    dateOfBirth: string; // Adjust the type based on the expected date format
    email: string;
    roles: string[];
    password: string;
    confirmPassword: string; // Note: Consider renaming to confirmPassword for consistency
    securityQuestion: string;
    securityAnswer: string;
  }

export const UserFormValidation = {
  username: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  firstName: ['', Validators.required],
  lastName: ['', Validators.required],
  password: ['', Validators.required],
  confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  number: ['', Validators.pattern('^[0-9]*$')],
};