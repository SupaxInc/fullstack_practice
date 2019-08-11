import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      // We have to block the user from activate private routes.
      if(localStorage.getItem('token') != null) { // if not null then there is a JWT
        return true;
      } else {  // If no JWT token stored then redirect user
        this.router.navigate(['/user/login']);
        return false; // prevents user from accessing the route
      }
  }
}
