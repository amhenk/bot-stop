import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';

@Injectable()
export class UserService {
  user: any;
  constructor(private http: Http,
              private authService: AuthService
  ) {

    this.authService.getProfile().subscribe(user => {
      this.user = user.user;
    }, err => {
      throw err;
    });

  }

  saveUserList(userList) {
    userList.userId = this.user._id;
    console.log(userList);
    console.log('UserService items: ' + userList.items);
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/users/updateList', {'shopping_list': userList},
                    {headers: headers}).map(res => res.json());
  }

  removeUserList(list_name) {
    console.log('Removing List: ' + list_name);
  }
}
