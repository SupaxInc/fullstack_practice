import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { TodolistComponent } from './pages/todolist/todolist.component';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  // Nothing specified in the URL will make /user/login default route
  {path:'', redirectTo: '/user/login', pathMatch:'full'},

  // Creating PATH URL: /user/
  { 
    path: 'user', component: UserComponent,
    children: [
      // PATH URL: /user/registration
      {path: 'registration', component: RegistrationComponent },
      // PATH URL: /user/login
      {path: 'login', component: LoginComponent }
    ]
  },

  {
    path: 'pages', component: PagesComponent,
    children: [
      // PATH URL: /pages/home
      {path: 'home', component: HomeComponent},
      // PATH URL: /pages/todolist
      {path: 'todolist', component: TodolistComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
