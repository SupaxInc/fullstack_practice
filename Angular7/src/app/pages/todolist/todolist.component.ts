import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/shared/todo.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styles: []
})
export class TodolistComponent implements OnInit {

  constructor(public toDoService: TodoService, private toastr: ToastrService,
    public userService: UserService) { }
  userDetails;
  toDoList: any[];
  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      // Callback functions for success and error
      // Success function should receive the User Profile data JSON object
      res => {
        this.userDetails = res;
      },
      err =>{
        console.log(err);
      }
    );

    // this.toDoService.getAllToDo().subscribe(
    //   (res:any[]) => {
    //     this.toDoList = res;
    //   }
    // );

    this.toDoService.getToDo(this.userDetails.id).subscribe(
      (res:any[]) => {
        this.toDoList = res;
      }
    );
  }

  // Toastr services currently does not work!
  addToDo(newToDo) {
    this.toDoService.addToDo(newToDo).subscribe(
      (res:any) => {
        if(res.status == 200) {
          this.toastr.success('New to do item created!', 'To do list updated.');
        }
        this.toastr.success('New to-do item created!', 'To do list updated.');
      },
      err => {
        this.toastr.error('To-do item was not added!', 'Cannot access database.');
        console.log(err);
      }
    );
  }

  alterCheck(flag: boolean, id) {
    this.toDoService.checkOrUncheckToDo(flag, id).subscribe(
      (res:any) => {
        if(res.status === 204) {
          this.toastr.success('Congratulations on finishing a task!', 'To-do list');
        } 
        
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteToDo(id) {
    this.toDoService.deleteToDo(id).subscribe(
      (res:any) => {
        if(res.status === 200) {
          this.toastr.success('To-do item succesfully deleted!', 'To-do item');
        }
      },
      err => {
        if(err.status === 404) {
          this.toastr.error('To-do item could not be found!', 'To-do item');
        }
      }
    );
  }
}
