import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
// To make this class injectable anywhere else we need to add decorator @Injectable()
let AuthInterceptor = class AuthInterceptor {
    constructor(router) {
        this.router = router;
    }
    intercept(req, next) {
        if (localStorage.getItem('token') != null) {
            // req paramater is readonly so we need to clone it, to be able to set the header
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
            });
            return next.handle(clonedReq).pipe(
            // Need to import tap manually from 'rxjs/operators'
            tap(succ => { }, err => {
                // This will detect ANY change that is made client side so it will re-direct the User
                // back to login page if the token is CHANGED or DELETED to prevent hackers
                if (err.status == 401) {
                    // Need to remove the token if the token does not append
                    localStorage.removeItem('token');
                    this.router.navigateByUrl('/user/login');
                }
            }));
        }
        else {
            return next.handle(req.clone());
        }
    }
};
AuthInterceptor = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [Router])
], AuthInterceptor);
export { AuthInterceptor };
//# sourceMappingURL=auth.interceptor.js.map