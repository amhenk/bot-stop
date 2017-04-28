import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService {
  item: Object;
  constructor(private http: Http) { }

  getAllItems(){
    console.log('Making request for inventory items');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/store/inventory', {headers: headers}).map(res => res.json());
  }

  getProduce(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    // this.http.get('store/inventory/category');
  }

  sayHello(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/store/hello', {headers: headers}).map(res => res.json());
  }

  addItem(item){
    let headers = new Headers();
    console.log(item);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/store/addItem', item,
            {headers: headers}).map(res => res.json());
  }

  getItemById(item_id){
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    params.set('item_id', item_id);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/store/inventory/getItemById', {headers: headers, search: params}).map(res => res.json());
  }

  getItemByItemNumber(item_number){
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    params.set('item_number', item_number);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/store/inventory/getItemByItemNumber', {headers: headers, search: params}).map(res => res.json());
  }
}
