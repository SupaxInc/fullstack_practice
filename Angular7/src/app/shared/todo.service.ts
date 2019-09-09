import { Injectable, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TodoService{
  private BaseURL: string;

  // Stores the list of to-dos in memory instead of just an observable
  private dataCopy: {
    toDoList: Todo[]
  };
  todos$: Observable<Todo[]>; // Good practice for Observables to have $ in its name

  // BehaviorSubjects should not be allowed outside of the service due to ability to alter data
  private _todos: BehaviorSubject<Todo[]>;

  constructor(private http: HttpClient, private toastr: ToastrService) { 
    this.BaseURL = 'http://localhost:5000/api';
    this.dataCopy = { toDoList: []};
    this._todos = <BehaviorSubject<Todo[]>> new BehaviorSubject([]);
    this.todos$ = this._todos.asObservable();
  }

  // PATH URL: api/list for POST
  addToDo(newToDo) {
    var body = {
      Description: newToDo.value  // needs to use value property when binded with HTML in HTML file
    };
    this.http.post(this.BaseURL+'/list', body).subscribe((res: Todo) => {
      this.dataCopy.toDoList.push(res);
      // Pushes a new copy of todo list to all Subscribers
      this._todos.next(Object.assign({}, this.dataCopy).toDoList);
      this.toastr.success('New to-do item added!', 'Action succesful!'); 
    },
    err => {
      this.toastr.error('To-do item could not be added', 'Cannot access database.');
      console.log(err);
    });
  }

  getToDo(id) {
    return this.http.get(this.BaseURL+`/list/${id}`);
  } 

  getAllToDo() {
    this.http.get(this.BaseURL+'/list').subscribe( (res: Todo[]) => {
      this.dataCopy.toDoList = res;
      this._todos.next(Object.assign({}, this.dataCopy).toDoList);
    }),
    err => {
      this.toastr.error('To-do items could not be retrieved!', 'Cannot access database.');
      console.log(err);
    }
  }

  deleteToDo(id) {
    this.http.delete(this.BaseURL+`/list/${id}`).subscribe( res => {
      this.dataCopy.toDoList.forEach((x,y) => {
        // If Id matches up with the function Id parameter then delete the Todo item
        if(x.Id == id) {
          this.dataCopy.toDoList.splice(y, 1);
        }
      });
      this._todos.next(Object.assign({}, this.dataCopy).toDoList);
    },
    err => {
      this.toastr.error('To-do items could not be deleted!', 'Cannot access database.');
      console.log(err);
    });
  }

  checkOrUncheckToDo(flag: boolean, id) {
    var body = [{
      op: "replace",
      path: "isCompleted",
      value: `${flag ? 'Y': 'N'}`
    }];
    this.http.patch(this.BaseURL+`/list/${id}`, body).subscribe((res:Todo) => {
      // Using tuple forEach to replace the IsCompleted for the specified ID
      this.dataCopy.toDoList.forEach((x, y) => {
        if(x.Id == res.Id) {
          this.dataCopy.toDoList[y].IsCompleted = res.IsCompleted;
        }
      });

      this._todos.next(Object.assign({}, this.dataCopy).toDoList);
    },
    err => {
      this.toastr.error('To-do items could not be changed', 'Cannot access database.');
      console.log(err);
    });
  } 


}
