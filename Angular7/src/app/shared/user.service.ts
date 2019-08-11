import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder, private http:HttpClient) { } // injects FormBuilder

  BaseURL = 'http://localhost:5000/api';  

  formModel = this.fb.group({
    UserName :['', Validators.required],
    Email :['', Validators.email],  // to check if email is valid
    FullName :[''],
    
    // Add the passwords to another Form loop
    Passwords : this.fb.group({
      Password :['', [Validators.required, Validators.minLength(4)]], // needs two SEPERATE[] arrays
      ConfirmPassword :['', Validators.required]
    }, {validator: this.comparePasswords})  // added validator object to comparePasswords
  });

  comparePasswords(fb:FormGroup) {  // similar to Passwords obj above
    let confirmPwCtrl = fb.get('ConfirmPassword');
    // passwordMismatch
    // confirmPwCtrl.errors = {passwordMismatch:true}
    if(confirmPwCtrl.errors == null || 'passwordMismatch' in confirmPwCtrl.errors){
      if(fb.get('Password').value != confirmPwCtrl.value) { // if passwords are not equal
        confirmPwCtrl.setErrors({passwordMismatch:true}); // error will be password mismatch
      } else {  // if passwords are equal
        confirmPwCtrl.setErrors(null);  // no errors
      }
    }
  }

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURL+'/ApplicationUser/Register', body);
    // returns observer
  }

  login(formData) {
    // formData is the UserName and Password being used
    return this.http.post(this.BaseURL+'/ApplicationUser/Login', formData);
  }

  getUserProfile() {
    return this.http.get(this.BaseURL+'/UserProfile'); // URL path created in the webAPI
    // returns an observer
  }

}
