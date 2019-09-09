import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
let LoginComponent = class LoginComponent {
    // UserService class is from user.service.ts
    // Router class is to re-direct the User to a different web route
    constructor(service, router, toastr) {
        this.service = service;
        this.router = router;
        this.toastr = toastr;
        // Create a formModel object with properties
        this.formModel = {
            UserName: '',
            Password: ''
        };
    }
    ngOnInit() {
        // if user is already authenticated
        if (localStorage.getItem('token') != null) {
            this.router.navigateByUrl('/pages/home');
        }
    }
    onSubmit(form) {
        // We need to subscribe to the observer that is returned from the login() function
        this.service.login(form.value).subscribe(// form.value are JSON objects from the
        // UserName and Password textboxes
        // We now need two callback functions, one for success and another for error
        // When the login function is successful it returns the JWT token
        (res) => {
            localStorage.setItem('token', res.token); // Saves the token into the browsers local storage
            this.router.navigateByUrl('/pages/home'); // Usually when login is successful it re-directs the User
        }, err => {
            if (err.status == 400) { // Error status 400 is received from ApplicationUserController.cs
                this.toastr.error('Incorrect username or password!', 'Authentication failed!');
            }
            else {
                console.log(err);
            }
        });
    }
};
LoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styles: []
    }),
    tslib_1.__metadata("design:paramtypes", [UserService, Router, ToastrService])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map