import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderService {

  constructor(private http: Http) { }

  placeOrder(cust_id, order, order_cost, order_number) {
    var item_array = []
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    for(var i = 0; i < order.length; i++){
      for( var j = 0; j < order[i].quantity; j++){
          item_array.push(order[i].item_id);
      }
    }
    var newOrder = {
      cust_id: cust_id,
      items: item_array,
      order_number: order_number,
      order_cost: order_cost
    };
    console.log(newOrder);
    return this.http.post('http://localhost:8080/handle_order/addOrder', newOrder,
                {headers: headers}).map(res => res.json());
  }

  getOrder(cust_id){
    let headers = new Headers();
    let params: URLSearchParams = new URLSearchParams();
    params.set('cust_id', cust_id);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/handle_order/getOrder', {headers: headers, search: params})
      .map(res => res.json());
  }

}
