import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

// To make this class injectable anywhere else we need to add decorator @Injectable()
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(localStorage.getItem('token') != null) {
            // req paramater is readonly so we need to clone it, to be able to set the header
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer '+localStorage.getItem('token'))
            });
            return next.handle(clonedReq).pipe(
                // Need to import tap manually from 'rxjs/operators'
                tap(
                    succ =>{},
                    err => {
                        // This will detect ANY change that is made client side so it will re-direct the User
                        // back to login page if the token is CHANGED or DELETED to prevent hackers
                        if(err.status == 401) {
                            // Need to remove the token if the token does not append
                            localStorage.removeItem('token');
                            this.router.navigateByUrl('/user/login');
                        }
                    }
                )
            ) 
        } else {
            return next.handle(req.clone());
        }
    }

}