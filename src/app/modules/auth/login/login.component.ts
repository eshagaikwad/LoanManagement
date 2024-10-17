import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UserCheck } from '../../../model/UserCheck.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | undefined;
  siteKey: string = "6LcVY1UqAAAAAGcPMMco6V5RjOZWbU0xQn8GkVsP";
  newLogin: UserCheck = {
    userId: 0,
    userName: '',
    userPassword: '',
    userRole: '',
    userMessage: '',
    accessToken: ''
  };

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      userPassword: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });
  }

  // onLogin(): void {
  //   this.newLogin.userName = this.loginForm.value.userName;
  //   this.newLogin.userPassword = this.loginForm.value.userPassword;

  //   this.authService.login(this.newLogin).subscribe(
  //     response => {
  //       localStorage.setItem('token', response.accessToken);
  //       localStorage.setItem('userRole', response.userRole);
  //       localStorage.setItem('username', response.userName);
  //       localStorage.setItem('userId', response.userId);

  //       this.errorMessage = ''; 
  //       this.errorMessage = 'Login Successful.';
  //       const UserId = response.userId;

  //       if (response.userRole === "User") {
  //         this.router.navigate(['/dashboard']);
  //       } else if (response.userRole === "Admin") {
  //         this.router.navigate(['/admin']);
  //       } else {
  //         console.error('User role is missing in the response:', response);
  //          this.errorMessage = 'User role is missing, unable to redirect.';
  //       }
  //     },
  //     error => {
  //       console.error(error);
        
  //       this.errorMessage = 'Invalid login credentials';
  //     }
  //   );
  // }

  onLogin():void{ 
    
    
    this.newLogin.userName=this.loginForm.value.userName; 
    this.newLogin.userPassword=this.loginForm.value.userPassword; 
    //this.user.isAdmin=true; 
    this.authService.login(this.newLogin).subscribe( 
      response => { 
        console.log(response);         
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('userRole', response.userRole);
        localStorage.setItem('username', response.userName);
        localStorage.setItem('userId', response.userId);


              this.errorMessage = ''; 
             this.errorMessage = 'Login Successful.';
         
 
 
        const role = this.authService.getRole(); 
        console.log(role);
        // Using getRole method 
        const userId = response.userId; 
 
        if (role) { 
          if (role === 'Admin') { 
            this.router.navigate(['/admin']);
          } else if (role === 'User') { 
            this.router.navigate(['/dashboard']);
          } else if (role === 'LoanOfficer') { 
            this.router.navigate(['/loan-officer/review-loan-applications', userId]); 
          } else { 
            console.error('Unknown role:', role); 
            alert('Unknown role, unable to redirect.'); 
          } 
        } else { 
          console.error('User role or ID is missing in the response:', response); 
          alert('User role or ID is missing, unable to redirect.'); 
        } 
      }, 
    error => { 
      console.error(error); 
      alert('Invalid login credentials'); 
      this.errorMessage = 'Invalid login credentials'; 
    } 
  ); 
} 
 
 
}

