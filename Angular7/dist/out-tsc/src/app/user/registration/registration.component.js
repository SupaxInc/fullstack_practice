import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
let RegistrationComponent = class RegistrationComponent {
    constructor(service, toastr) {
        this.service = service;
        this.toastr = toastr;
    }
    ngOnInit() {
    }
    onSubmit() {
        this.service.register().subscribe(// When user submits register button
        (res) => {
            if (res.succeeded) { // if the user was successfully added to the UserDB
                this.service.formModel.reset(); // blanks out the form, resettings textboxes
                // shows a popup and when user was created
                this.toastr.success('New user has been created!', 'Registration Successful.');
            }
            else { // if the user was not added, then show the following errors
                res.errors.forEach(element => {
                    switch (element.code) {
                        case 'DuplicateUserName':
                            this.toastr.error('Username is already taken!', 'Registration failed.');
                            break;
                        default:
                            // the following element.description is the description object from
                            // the json created when doing the POST method in Postman
                            this.toastr.error(element.description, 'Registration failed.');
                            break;
                    }
                });
            }
        }, err => {
            console.log(err);
        });
    }
};
RegistrationComponent = tslib_1.__decorate([
    Component({
        selector: 'app-registration',
        templateUrl: './registration.component.html',
        styles: []
    }),
    tslib_1.__metadata("design:paramtypes", [UserService, ToastrService])
], RegistrationComponent);
export { RegistrationComponent };
//# sourceMappingURL=registration.component.js.map