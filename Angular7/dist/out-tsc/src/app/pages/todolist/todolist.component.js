import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TodoService } from 'src/app/shared/todo.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
let TodolistComponent = class TodolistComponent {
    constructor(toDoService, toastr, userService) {
        this.toDoService = toDoService;
        this.toastr = toastr;
        this.userService = userService;
    }
    ngOnInit() {
        this.toDoService.getAllToDo().subscribe((res) => {
            this.toDoService.toDoList = res;
        });
    }
    // Toastr services currently does not work!
    addToDo(newToDo) {
        this.toDoService.addToDo(newToDo).subscribe((res) => {
            if (res.status == 200) {
                this.toastr.success('New to do item created!', 'To do list updated.');
            }
            this.toastr.success('New to-do item created!', 'To do list updated.');
        }, err => {
            this.toastr.error('To-do item was not added!', 'Cannot access database.');
            console.log(err);
        });
    }
    alterCheck(flag, id) {
        this.toDoService.checkOrUncheckToDo(flag, id).subscribe((res) => {
            if (res.status === 204) {
                this.toastr.success('Congratulations on finishing a task!', 'To-do list');
            }
        }, err => {
            console.log(err);
        });
    }
    deleteToDo(id) {
        this.toDoService.deleteToDo(id).subscribe((res) => {
            if (res.status === 200) {
                this.toastr.success('To-do item succesfully deleted!', 'To-do item');
            }
        }, err => {
            if (err.status === 404) {
                this.toastr.error('To-do item could not be found!', 'To-do item');
            }
        });
    }
};
TodolistComponent = tslib_1.__decorate([
    Component({
        selector: 'app-todolist',
        templateUrl: './todolist.component.html',
        styles: []
    }),
    tslib_1.__metadata("design:paramtypes", [TodoService, ToastrService,
        UserService])
], TodolistComponent);
export { TodolistComponent };
//# sourceMappingURL=todolist.component.js.map