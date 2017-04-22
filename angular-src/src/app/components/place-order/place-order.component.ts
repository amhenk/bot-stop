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

  constructor(private router: Router,
              private orderServe: OrderService,
              private itemService: ItemService
              // private store: StoreComponent
            ) {
              this.order = [];
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
  }
}
