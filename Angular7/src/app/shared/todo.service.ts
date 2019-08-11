import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService{

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  BaseURL = 'http://localhost:5000/api';

  // PATH URL: api/list for POST
  addToDo(newToDo) {
    var body = {
      Description: newToDo.value  // needs to use value property when binded with HTML
    };
    return this.http.post(this.BaseURL+'/list', body); // returns observer
  }

  getToDo(id) {
    return this.http.get(this.BaseURL+`/list/${id}`);
  } 

  getAllToDo() {
    return this.http.get(this.BaseURL+'/list');
  }

  deleteToDo(id) {
    return this.http.delete(this.BaseURL+`/list/${id}`);
  }

  checkOrUncheckToDo(flag: boolean, id) {
    var body = [{
      op: "replace",
      path: "isCompleted",
      value: `${flag ? 'Y': 'N'}`
    }];
    return this.http.patch(this.BaseURL+`/list/${id}`, body);
  } 


}
