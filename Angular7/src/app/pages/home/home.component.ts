import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  // class variable
  userDetails;

  constructor(private router:Router, private service:UserService) { }

  ngOnInit() {  // life cycle function
    this.service.getUserProfile().subscribe(
      // Callback functions for success and error
      // Success function should receive the User Profile data JSON object
      res => {
        this.userDetails = res;
      },
      err =>{
        console.log(err);
      }
    );

  }

}
