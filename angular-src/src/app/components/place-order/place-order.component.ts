import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// import { StoreComponent } from '../store/store.component';
import { Item } from '../../item';

import { OrderService } from '../../services/order.service';
import { ItemService } from '../../services/item.service';  // to look up items by Item ID

/*
NOTE:
  This component could probably be reduced to the order service since we don't
  actually use the 'component' part of this component and rather just use it
  to handle the data that gets passed to order service. However there are some
  pros to handling the data separately.
 */
@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {
  order: Item[];
  order_cost: number;
  order_number: Number;
  order_begun: boolean;

  constructor(private router: Router,
              private orderService: OrderService,
              private itemService: ItemService
              // private store: StoreComponent
            ) {
              this.order_begun = false;
              this.order = [];
              this.order_cost = 0.00;
              this.order_number = getRandomInt(10000000,99999999);
            }

  ngOnInit() {
  }

  onOrderSubmit(){
    this.orderService.placeOrder(this.order, this.order_cost, this.order_number).subscribe(
      data => {
        if(data.success){
          console.log(data);
        }
      }
    );
    this.order = [];
    this.order_cost = 0.00;
    this.order_number = this.order_number = getRandomInt(10000000,99999999);
    this.order_begun = false;
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
