import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';  // Adjust the path if necessary
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Check if user is logged in
    const isLoggedIn = this.authService.isLoggedIn();
    const expectedRole = route.data['role'];  // Get the expected role from route data
    const userRole = this.authService.getRole();  // Get the user's role

    console.log(isLoggedIn,expectedRole,userRole);
    
    if (isLoggedIn && userRole && expectedRole === userRole) {
      return true; // Allow access if role matches
    } else {
      if (!userRole) {
        console.warn('User role is null, redirecting to login.');
      }
      this.router.navigate(['/login']); // Redirect to login page
      return false;
    }
  }
}






