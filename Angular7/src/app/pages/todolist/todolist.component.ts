import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/shared/todo.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { Todo } from 'src/app/shared/todo.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styles: []
})
export class TodolistComponent implements OnInit {
  todos$: Observable<Todo[]>;
  
  constructor(public toDoService: TodoService, private toastr: ToastrService,
    public userService: UserService) { }

  ngOnInit() {
    this.todos$ = this.toDoService.todos$; // Subscribes to entire to-do observer collection

    /* To subscribe to only one to-do
    this.singleToDo$ = this.toDoService.todos.pipe (
      map(todos => todos.find(item => item.id === '1'))
    );
    */

    this.toDoService.getAllToDo();
  }

  delete(id: number) {
    this.toDoService.deleteToDo(id);
  }

  alterCheck(flag: boolean, id: number) {
    this.toDoService.checkOrUncheckToDo(flag, id);
  }
}
