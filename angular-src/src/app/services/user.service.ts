import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  user: any;
  constructor(private http: Http
  ) { }

  saveUserList(userList) {
    console.log(userList);
    console.log('UserService items: ' + userList.item_list.items)
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    params.set('user', this.user);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/users/updateList', userList,
                    {headers: headers, search: {'user_id': this.user._id}}).map(res => res.json());
  }
}
