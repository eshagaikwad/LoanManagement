import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoanApplicationManagementService } from '../../services/user/loan-application-management.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanRepayment } from '../../model/GetLoanRepayment.model';
import { LoanApprovalService } from '../../services/loan-officer/loan-approval.service';
declare var paypal:any;
@Component({
  selector: 'app-repayment',
  templateUrl: './repayment.component.html',
  styleUrl: './repayment.component.css'
})
export class RepaymentComponent {
  userName: string | null = '';
  loanRepaymentForm !: FormGroup;
  repaymentAmount!: number;
  transactionInProgress: boolean = false;
  loanRepayment: LoanRepayment[] = []; 
  constructor(private loanApprovalService:LoanApprovalService, private route: ActivatedRoute ,private formBuilder: FormBuilder,private router:Router){
    this.loanRepaymentForm = this.formBuilder.group({
      PaymentAmount:['',Validators.required]
    });
  }
 
  loanApplicationId: number=0;
  ngOnInit(): void {
    this.userName = localStorage.getItem('username'); 
      this.loanApplicationId = +this.route.snapshot.paramMap.get('id')!;
      // this.loanRepaymentHistory();
      this.loadLoanRepaymentData(); 

      const script = document.createElement('script');
      script.src = "https://www.paypal.com/sdk/js?currency=USD&client-id=AWRcUn08FDyskxfWXtw8v9ZsuFPVzLs81o1szm6NS-FyvRQOWrwcvrlqJ0Yz5ZELjDCaUMDnKi90TU8F"; // Replace with your client ID
      script.onload = () => this.initPayPalButton();
      document.body.appendChild(script);
      // Ensure loanApplicationId is valid
      if (!this.loanApplicationId) {
        console.error("Loan Application ID not found in URL");
        return;
      }

 
    }

    logout(): void {
      localStorage.clear(); // Clear all local storage data
      this.router.navigate(['/home']); // Redirect to the login page
    }
  loadLoanRepaymentData(): void { 
    this.loanApprovalService.getLoanRepayment(this.loanApplicationId).subscribe( 
      (data) => { 
        console.log("hello ",data);
        
        if (Array.isArray(data)) { 
          this.loanRepayment = data; 
        } else { 
          // If the API returns an object, convert it to an array or handle it accordingly 
          this.loanRepayment = [data]; // wrap it in an array 
        } 
        console.log(this.loanRepayment); 
      }, 
      (error) => { 
        console.error('Error fetching loan repayment data', error); 
      } 
    ); 
  }

  showForm: boolean = false;
 
  // Method to show the form
  showLoanRepaymentForm1(): void {
   this.showForm = true;  // Show the form when the button is clicked
   setTimeout(() => {
     this.initPayPalButton();  // Initialize PayPal button after form is shown
   }, 0);
 }
  
 showLoanRepaymentForm( amount: number): void {
   this.showForm = true;
   this.loanRepaymentForm.patchValue({ PaymentAmount: amount }); // Set the payment amount in the form
   setTimeout(() => {
     this.initPayPalButton();  // Initialize PayPal button after form is shown
   }, 0);
 }
  
 removeForm(): void {
   this.showForm = false;
   this.loanRepaymentForm.reset(); // Reset the form values
 }
  
 loanApplicationIdd: number = 2006;
 emiAmount: number=0;
 // Method to submit loan repayment to backend
 postLoanRepayment(): void {
   if (this.loanRepaymentForm.valid) {
     const paymentAmount = this.loanRepaymentForm.get('PaymentAmount')?.value;
  
     // Call the service to create the loan repayment
     this.loanApprovalService.createLoanRepayment(2006, paymentAmount)
       .subscribe({
         next: (response) => {
           console.log('Loan repayment successful:', response);
           this.transactionInProgress = false;  // Reset progress
         },
         error: (error) => {
           console.error('Error making loan repayment:', error);
           this.transactionInProgress = false;
         }
       });
   } else {
     console.error('Form is invalid');
   }
 }
  
 // PayPal Button Initialization
 initPayPalButton(): void {
  if (document.getElementById('paypal-button-container')) {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        const loanRepaymentData = {
          ...this.loanRepaymentForm.value,
          loanApplicationId: this.loanApplicationId
        };

        // Ensure repayment amount is valid
        if (!loanRepaymentData.PaymentAmount || loanRepaymentData.PaymentAmount <= 0) {
          console.error('Invalid repayment amount');
          return Promise.reject(new Error('Invalid repayment amount'));
        }

        // PayPal payment creation
        return actions.order.create({
          purchase_units: [{
            amount: {
              currency_code: "USD",
              value: loanRepaymentData.PaymentAmount.toString(),
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        this.transactionInProgress = true;
        return actions.order.capture().then((details: any) => {
          console.log('Transaction completed by ' + details.payer.name.given_name);
          this.postLoanRepayment();
        });
      },
      onCancel: (data: any) => {
        console.log('Transaction was canceled.');
        this.transactionInProgress = false;
      },
      onError: (err: any) => {
        console.error('Error during the transaction', err);
        this.transactionInProgress = false;
      }
    }).render('#paypal-button-container');
  } else {
    console.error('PayPal button container not found');
  }
}

  
 ngAfterViewInit(): void {
   if (this.showForm) {
     this.initPayPalButton();
   }
 }


//  repaymentHistory: any[] = [];
 
// repaymentId: number = 6048;
// loanRepaymentHistory(): void {
//   this.loanApprovalService.getRepaymentHistory(this.repaymentId).subscribe(
//     (response) => {
//       // Directly check if response is an array instead of looking for a `data` property
//       if (Array.isArray(response)) {
//         this.repaymentHistory = response; // Assign the array directly
//       } else {
//         // Handle unexpected response format
//         this.repaymentHistory = [];
//         console.error('Unexpected data format:', response);
//       }
//       console.log(this.repaymentHistory);
//     },
//     (error) => {
//       console.error('Error fetching loan repayment data', error);
//     }
//   );
// }

 




























}



//   loanApplicationId: number | undefined;

//   private loanRepaymentUrl!: string;
  
//   loanRepaymentForm !: FormGroup;
//   constructor( 
//     private modalService: NgbModal, 
//     private loanApplicationService: LoanApplicationManagementService, 
//     private formBuilder: FormBuilder, 
//     private http:HttpClient,
//     private route: ActivatedRoute ,
//       private router:Router 
//  ) {
//   this.loanRepaymentForm = this.formBuilder.group({  
//         PaymentAmount:['',Validators.required]
//   });
// }

//   userName: string | null = ''; // Variable to hold the username



//   logout(): void {
//     localStorage.clear(); // Clear all local storage data
//     this.router.navigate(['/home']); // Redirect to the login page
//   }
// ngOnInit(): void {
//   this.userName = localStorage.getItem('username'); 
//   this.loanApplicationId = +this.route.snapshot.paramMap.get('id')!;
  
//   // Ensure loanApplicationId is valid
//   if (!this.loanApplicationId) {
//     console.error("Loan Application ID not found in URL");
//     return;
//   }


//   this.loanRepaymentUrl = `https://localhost:7280/api/LoanRepayment/pay/${this.loanApplicationId}`;
// }

// repaymentAmount!: number; 
// transactionInProgress: boolean = false; 

// async submitLoanRepayment() { 
//   console.log("Form valid:", this.loanRepaymentForm.valid); 
  
//   if (this.loanRepaymentForm.valid) { 
//     const loanRepaymentData = {  
//       ...this.loanRepaymentForm.value,  
//       loanApplicationId: this.loanApplicationId // Include loanApplicationId here 
//     }; 

//     // Log the final loan repayment data before sending 
//     console.log('Loan Repayment Data:', loanRepaymentData); 

//     this.http.post(this.loanRepaymentUrl, loanRepaymentData, { observe: 'response' }).subscribe({ 
//       next: (response) => { 
//         // Check if the response is successful (status code 200) 
//         if (response.status === 200) { 
//           console.log('Repayment processed successfully:', response); 
//           // Optionally, you can display a success message instead of redirecting
//         } else { 
//           console.log('Unexpected status code:', response.status); 
//           // Optionally, display an error message without redirecting
//         } 
//       }, 
//       error: (error) => { 
//         console.error('Error during repayment submission:', error); 
//       } 
//     }); 
//   } else { 
//     console.error('Form is invalid'); 
//   } 
// }

// ngAfterViewInit(): void { 
//   this.initPayPalButton(); 
// } 
 
// initPayPalButton(): void { 
//   if (document.getElementById('paypal-button-container')) { 
//     paypal.Buttons({ 
//       createOrder: (data: any, actions: any) => { 
//         const loanRepaymentData = {  
//           ...this.loanRepaymentForm.value,  
//           loanApplicationId: this.loanApplicationId // Include loanApplicationId here 
//         }; 

//         // Ensure repaymentAmount is valid 
//         if (!loanRepaymentData.PaymentAmount || loanRepaymentData.PaymentAmount <= 0) { 
//           console.error('Invalid repayment amount'); 
//           return Promise.reject(new Error('Invalid repayment amount')); 
//         } 

//         return actions.order.create({ 
//           purchase_units: [{ 
//             amount: { 
//               currency_code: "USD", 
//               value: loanRepaymentData.PaymentAmount.toString(), 
//             } 
//           }] 
//         }); 
//       }, 
//       onApprove: (data: any, actions: any) => { 
//         this.transactionInProgress = true; 
//         return actions.order.capture().then((details: any) => { 
//           console.log('Transaction completed by ' + details.payer.name.given_name); 
//           this.submitLoanRepayment(); 
//         }); 
//       }, 
//       onCancel: (data: any) => { 
//         console.log('Transaction was canceled.'); 
//         this.transactionInProgress = false; 
//       }, 
//       onError: (err: any) => { 
//         console.error('Error during the transaction', err); 
//         this.transactionInProgress = false; 
//       } 
//     }).render('#paypal-button-container'); 
//   } else { 
//     console.error('PayPal button container not found'); 
//   } 
// }
