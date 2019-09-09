import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
let AuthGuard = class AuthGuard {
    constructor(router) {
        this.router = router;
    }
    canActivate(next, state) {
        // We have to block the user from activate private routes.
        if (localStorage.getItem('token') != null) { // if not null then there is a JWT
            return true;
        }
        else { // If no JWT token stored then redirect user
            this.router.navigate(['/user/login']);
            return false; // prevents user from accessing the route
        }
    }
};
AuthGuard = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [Router])
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map