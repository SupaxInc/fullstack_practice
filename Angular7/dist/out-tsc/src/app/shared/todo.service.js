import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
let TodoService = class TodoService {
    constructor(fb, http) {
        this.fb = fb;
        this.http = http;
        this.BaseURL = 'http://localhost:5000/api';
    }
    // PATH URL: api/list for POST
    addToDo(newToDo) {
        var body = {
            Description: newToDo.value // needs to use value property when binded with HTML
        };
        return this.http.post(this.BaseURL + '/list', body); // returns observer
    }
    getToDo(id) {
        return this.http.get(this.BaseURL + `/list/${id}`);
    }
    getAllToDo() {
        return this.http.get(this.BaseURL + '/list');
    }
    deleteToDo(id) {
        return this.http.delete(this.BaseURL + `/list/${id}`);
    }
    checkOrUncheckToDo(flag, id) {
        var body = [{
                op: "replace",
                path: "isCompleted",
                value: `${flag ? 'Y' : 'N'}`
            }];
        return this.http.patch(this.BaseURL + `/list/${id}`, body);
    }
    refreshToDo() {
        this.http.get(this.BaseURL + '/list')
            .toPromise().then(res => this.toDoList = res);
    }
};
TodoService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder, HttpClient])
], TodoService);
export { TodoService };
//# sourceMappingURL=todo.service.js.map