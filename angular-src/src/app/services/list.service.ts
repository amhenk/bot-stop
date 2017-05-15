import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';

@Injectable()
export class ListService {
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

  getUserLists(user_id){
    let headers = new Headers();
    headers.append('Content-Type', 'Application/json');
    return this.http.get('http://localhost:8080/users/getUserLists',
                    {headers: headers, search: {'user_id': user_id}}).map(res => res.json());
  }

  getListById(list_id){
    let headers = new Headers();
    headers.append('Content-Type', 'Application/json');
    return this.http.get('http://localhost:8080/users/getListById',
            {headers: headers, search: {'list_id': list_id}}).map(res => res.json());
  }

  // Search by list name and user id so there isn't a mix up
  getListByName(list_name) {
    let headers = new Headers();
    let search_params = {'list_name': list_name,'user_id': this.user._id};
    headers.append('Content-Type', 'Application/json');
    return this.http.get('http://localhost:8080/users/getListByName',
            {headers: headers, search: search_params}).map(res => res.json());
  }

/****************************************
 * ETL type things
 ***************************************/
  saveUserList(userList) {
    userList.userId = this.user._id;
    // TODO: Check if the list exists in the database, if it does, we update, else
    //       we insert a new list.
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/users/updateList',
        {'shopping_list': userList}, {headers: headers}).map(res => res.json());
  }

  removeUserList(list_name) {
    console.log('Removing List: ' + list_name);
  }
}
