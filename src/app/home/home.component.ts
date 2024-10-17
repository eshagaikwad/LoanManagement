import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router'; // Ensure Router is imported from @angular/router
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInOnScroll', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideInOnScroll', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('0.5s ease-in', style({ transform: 'translateX(0)' }))
      ])
    ]),
    trigger('slideInTestimonials', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('0.7s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class HomeComponent  {
  features = [
    { title: 'Fast Loan Processing', description: 'Apply and get approved quickly!', image: 'assets/feature1.png' },
    { title: 'Secure Payments', description: 'We ensure your transactions are secure.', image: 'assets/feature2.png' },
    { title: 'No Hidden Fees', description: 'Everything is upfront with no surprises.', image: 'assets/feature3.png' }
  ];

  steps = [
    { number: 1, title: 'Apply Online', description: 'Fill out the online application form.', icon: 'assets/icons/form.png' },
    { number: 2, title: 'Loan Officer Review', description: 'A loan officer reviews your application.', icon: 'assets/icons/review.png' },
    { number: 3, title: 'Get Approved', description: 'Once approved, start using the funds.', icon: 'assets/icons/approval.png' }
  ];

  testimonials = [
    { quote: 'The entire process was fast, safe and convenient.!', name: 'John Sena' },
    { quote: 'Amazing experience, very professional.', name: 'Dhruv Rathee' },
    { quote: 'Highly recommended for fast loans.', name: 'Sonam Kapoor' }
  ];
  constructor(private authService: AuthService, private router: Router) {}
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Method to handle user logout
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']); // Redirect to home after logout
  }
 
}
