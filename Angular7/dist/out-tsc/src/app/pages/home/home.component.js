import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';
let HomeComponent = class HomeComponent {
    constructor(router, service) {
        this.router = router;
        this.service = service;
    }
    ngOnInit() {
        this.service.getUserProfile().subscribe(
        // Callback functions for success and error
        // Success function should receive the User Profile data JSON object
        res => {
            this.userDetails = res;
        }, err => {
            console.log(err);
        });
    }
};
HomeComponent = tslib_1.__decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styles: []
    }),
    tslib_1.__metadata("design:paramtypes", [Router, UserService])
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map