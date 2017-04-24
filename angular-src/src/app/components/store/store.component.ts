import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { AuthService } from '../../services/auth.service';

import { PlaceOrderComponent } from '../place-order/place-order.component';

/* Classes */
import { Item } from '../../item';
import { Order } from '../../order';
import { User } from '../../user';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  providers: [PlaceOrderComponent]
})
export class StoreComponent implements OnInit {
  items: Item[] = [];
  categories: string[] =[];
  displayCost: String;
  itemDict: Dictionary = {};

  order: Item[] = [];

  user: User = new User();
  loggedIn: boolean;
  // Still need to find a use for this, might be relevant later.
  // @Output() result = new EventEmitter<Item>();

  constructor(private inventory: ItemService,
              private orderList: PlaceOrderComponent,
              private authService: AuthService
  ) { }

  ngOnInit() {
    /*
      TODO: Need to modify this so we handle guest transactions and signed in folks
     */

    if(this.authService.loggedIn()){
      this.authService.getProfile().subscribe(profile => {
        this.user = profile.user;
        console.log(this.user.name);
      })
      this.loggedIn = true;
    } else {
      this.user.name = "guest";
      this.loggedIn = false;
    }

    this.inventory.getAllItems().subscribe(inventory => {
      this.orderList.order = [];
      this.items = inventory;
      this.displayCost = "0.00";

      console.log('Items retrieved');
      console.log(this.items);
    },
    err => {
      console.log('No items found');
      console.log(err);
      return false;
    });
  }

/* XXX:
This might end up being an issue later on since it's making a call every time
someone wants to add an item to their order. We may want to just load all of the
items and then do a search on them based on the item_id in order to determine
which item was selected.
*/
  addItemToOrder(item_id) {
    this.inventory.getItemById(item_id).subscribe(item => {
        console.log('ITEM FOUND: ' + item.name);
        /* Item Quantity */
        if(this.orderList.order.find(i => i._id == item_id)){
          this.orderList.order_cost += +item.sales_price.toFixed(2);
          this.orderList.order.find(i=>i._id == item_id).quantity++;
          this.displayCost = ((this.orderList.order_cost * 100) / 100).toFixed(2).toString();
        }
        else
        {
          this.orderList.order.push(item);
          this.orderList.order.find(i => i._id == item_id).quantity = 1;
          this.orderList.order_cost += +item.sales_price.toFixed(2);
          this.displayCost = ((this.orderList.order_cost * 100) / 100).toFixed(2).toString();
        }
      },
      err => {
        console.log('Couldn\'t find item with id: ' + item_id);
        return false;
      }
    );
    if(!this.orderList.order_begun){
      this.orderList.order_begun = true;
    }
    // TODO: Might want to add emitter here and we can use place-order component
  }

}

interface Dictionary {
  [index: string]: number;
}
