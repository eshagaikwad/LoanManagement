import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { loanOfficer } from '../../../model/loanOfficer.model';

@Component({
  selector: 'app-lend',
  templateUrl: './lend.component.html',
  styleUrl: './lend.component.css'
})
export class LendComponent implements OnInit {

  loginForm!: FormGroup ;
  siteKey: string = '6Lfy-VMqAAAAACL1P0pJo0dE_pyzAAP1OeD-g2Fk'; // Replace with your actual reCAPTCHA site key
  recaptchaResolved: boolean = false;
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loanOfficer:AuthService
  ) { }
newOfficer:loanOfficer={
  loanOfficerId: 0,
  loanOfficerName: '',
  loanOfficerPassword: '',
  officerRole: '',
  userMessage: '',
  accessToken: '',

}
ngOnInit(): void {
  this.loginForm = this.fb.group({
    userName: ['', Validators.required],  // Ensure this matches the backend expected field name
    userPassword: ['', Validators.required],
    recaptcha:['',Validators.required]
  });
}

  onCaptchaResolved(captchaResponse: any): void {
    if (captchaResponse) {
      console.log('Captcha resolved successfully:', captchaResponse);
      this.recaptchaResolved = true;
      this.loginForm.controls['recaptcha'].setValue(captchaResponse);  // Set recaptcha value
    } else {
      console.log('Captcha resolution failed.');
      this.recaptchaResolved = false;
    }
  }
  
  onLogin(): void {
    this.newOfficer.loanOfficerName = this.loginForm.value.userName;
    this.newOfficer.loanOfficerPassword = this.loginForm.value.userPassword;
  
    this.loanOfficer.getOfficerLoan(this.newOfficer).subscribe(
      response => {
        localStorage.setItem('token', response.accessToken);
        localStorage.setItem('userRole', response.officerRole); 
        localStorage.setItem('officerId',response.loanOfficerId); 
        localStorage.setItem('officerName',response.loanOfficerName);
  
    
  
        const officerId = response.loanOfficerId;
        console.log("Officer ID:", officerId);  
  
        if (response.officerRole === "LoanOfficer" ) {
          this.router.navigate(['/officer']); 
        }
         else {
          console.error('Invalid loan officer ID or role in the response:', response);
          alert('User role or ID is missing, unable to redirect.');
        }
      },
      error => {
        console.error(error);
        this.errorMessage = 'Invalid login credentials';
      }
    );
  }

  // onLogin(): void { 
  //   this.newOfficer.loanOfficerName = this.loginForm.value.userName; 
  //   this.newOfficer.loanOfficerPassword = this.loginForm.value.userPassword; 
   
  //   this.loanOfficer.getOfficerLoan(this.newOfficer).subscribe( 
  //     response => { 
  //       localStorage.setItem('token', response.accessToken); 
  //       localStorage.setItem('userRole', response.officerRole);   
  //       localStorage.setItem('Id',response.loanOfficerId); 
  //       alert('Login successful!'); 
   
  //       const role = this.loanOfficer.getRole();  
  //       const officerId = response.loanOfficerId; 
  //       console.log("Officer ID:", officerId);  // Log the officer ID for debugging 
   
  //       if (role === 'LoanOfficer') { 
  //         this.router.navigate(['/officer']); 
  //       } else { 
  //         console.error('Unknown role:', role); 
  //         alert('Unknown role, unable to redirect.'); 
  //       } 
 
  //     }, 
  //     error => { 
  //       console.error(error); 
  //       alert('Invalid login credentials'); 
  //       this.errorMessage = 'Invalid login credentials'; 
  //     } 
  //   ); 
  // }
  

}
