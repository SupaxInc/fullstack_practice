import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
let PagesComponent = class PagesComponent {
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
PagesComponent = tslib_1.__decorate([
    Component({
        selector: 'app-pages',
        templateUrl: './pages.component.html',
        styles: []
    }),
    tslib_1.__metadata("design:paramtypes", [Router])
], PagesComponent);
export { PagesComponent };
//# sourceMappingURL=pages.component.js.map