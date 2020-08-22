import { Injectable } from '@angular/core';

import { roles } from './../../assets/mocks/roles';
import { userList } from './../../assets/mocks/user-list';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public user: any;

  constructor() { }

  getRoles() {
    return roles;
  }

  setUser(user): void {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  getUserList() {
    if(localStorage.userList) {
      return JSON.parse(localStorage.userList);
    }
    return [];
  }

  findUsers(options): Observable<any> {

    let data = this.getUserList();

    if(JSON.parse(localStorage.user) !== 'admin') {
      data =  data.filter((d) => d.userName === JSON.parse(localStorage.user));
    }

    data = data.sort((a, b) => {
      const sortOrder = options.sortDirection === 'asc' ? -1 : 1;
      const valueA = a[options.sortField];
      const valueB = b[options.sortField];

      const result = (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0;
      return result * sortOrder;
    });

    const start = options.page * options.pageSize;
    const end = start + options.pageSize;
    data = data.slice(start, end);
    console.log(data);
    return of({
      items: data,
      total: data.length,
    });
  }
}
