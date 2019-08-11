import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  // Create a formModel object with properties
  formModel={
    UserName: '', // Initializes the property as an empty string
    Password: ''
  }

  // UserService class is from user.service.ts
  // Router class is to re-direct the User to a different web route
  constructor(private service:UserService, private router:Router, private toastr:ToastrService) { }

  ngOnInit() {
      // if user is already authenticated
      if(localStorage.getItem('token') != null) {
        this.router.navigateByUrl('/pages/home');
    }
  }

  onSubmit(form:NgForm) { // parameter 'form' is of type NgForm
    // We need to subscribe to the observer that is returned from the login() function
    this.service.login(form.value).subscribe( // form.value are JSON objects from the
                                              // UserName and Password textboxes

      // We now need two callback functions, one for success and another for error
      // When the login function is successful it returns the JWT token
      (res:any)=>{
        localStorage.setItem('token', res.token); // Saves the token into the browsers local storage
        this.router.navigateByUrl('/pages/home'); // Usually when login is successful it re-directs the User
      },
      err => {
        if(err.status == 400) { // Error status 400 is received from ApplicationUserController.cs
          this.toastr.error('Incorrect username or password!', 'Authentication failed!');
        } else {
          console.log(err);
        }
      }
    );
  }
}
