import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLogout() {
    // Need to remove the JWT token when the User logs out.
    localStorage.removeItem('token');
    // We will then navigate the user back to the login page.
    this.router.navigate(['/user/login']);
  }

}
