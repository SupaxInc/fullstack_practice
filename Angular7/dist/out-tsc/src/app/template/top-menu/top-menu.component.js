import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
let TopMenuComponent = class TopMenuComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
    }
    onLogout() {
        // Need to remove the JWT token when the User logs out.
        localStorage.removeItem('token');
        // We will then navigate the user back to the login page.
        this.router.navigate(['/user/login']);
    }
};
TopMenuComponent = tslib_1.__decorate([
    Component({
        selector: 'app-top-menu',
        templateUrl: './top-menu.component.html',
        styles: []
    }),
    tslib_1.__metadata("design:paramtypes", [Router])
], TopMenuComponent);
export { TopMenuComponent };
//# sourceMappingURL=top-menu.component.js.map