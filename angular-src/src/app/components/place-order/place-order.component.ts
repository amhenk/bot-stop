import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { StoreComponent } from '../store/store.component';
import { Item } from '../../item';

import { OrderService } from '../../services/order.service';
import { ItemService } from '../../services/item.service';  // to look up items by Item ID

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  order: Item[];
  order_cost: number;
  order_number: Number;

  constructor(private router: Router,
              private orderService: OrderService,
              private itemService: ItemService
              // private store: StoreComponent
            ) {
              this.order = [];
              this.order_cost = 0.00;
              this.order_number = 39104001;
            }

  ngOnInit() {
  }

  updateOrder(){
    // Append selected item onto the current order
    // this.order.push();
  }
  onOrderSubmit(){
    // this.order.push();
    console.log('Whaddup!');
    // for(var i = 0; i < this.order.length; i++) {
    //   this.order_cost += +this.order[i].sales_price.toPrecision(2);
    // }
    this.orderService.placeOrder(this.order, this.order_cost, this.order_number);
  }
}
