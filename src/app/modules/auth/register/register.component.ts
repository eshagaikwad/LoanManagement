import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Register } from '../../../model/register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  errorMessage: string = '';
  successMessage: string = '';

  newRegister: Register = {
    userId: 0,
    userName: '',
    userEmail: '',
    userPassword: '',
    userPhone: ''
  };

  constructor(private router: Router, private authService: AuthService) {}

  onRegister(form: NgForm) {
    if (!form.valid) {
      this.errorMessage = 'Please fill all fields correctly.';
      return;
    }

    // Proceed to send data if form is valid
    this.authService.GenerateRegistration(this.newRegister).subscribe(
      response => {
        console.log('Registration successful:', response);
        this.successMessage = 'Registration successful!';
        
        // Reset the form and navigate
        this.newRegister = {
          userId: 0,
          userName: '',
          userEmail: '',
          userPassword: '',
          userPhone: ''
        };
        form.reset();
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error during registration:', error);
        this.errorMessage = 'An error occurred during registration.';
      }
    );
  }
}
