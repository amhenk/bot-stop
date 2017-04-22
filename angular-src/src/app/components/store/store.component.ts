import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../../services/item.service';

import { PlaceOrderComponent } from '../place-order/place-order.component';

/* Classes */
import { Item } from '../../item';
import { Order } from '../../order';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  providers: [PlaceOrderComponent]
})
export class StoreComponent implements OnInit {
  items: Object[] = [];
  categories: string[] =[];

  order_begun: boolean = false;

  picked_item = Item;
  order: Item[] = [];

  @Output() result = new EventEmitter<Item>();

  constructor(private inventory: ItemService,
              private orderList: PlaceOrderComponent
  ) { }

  ngOnInit() {
    this.inventory.getAllItems().subscribe(inventory => {
      this.orderList.order = [];
      this.items = inventory;
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
        this.picked_item = item;
        this.orderList.order.push(item);
      },
      err => {
        console.log('Couldn\'t find item with id: ' + item_id);
        return false;
      }
    );
    if(!this.order_begun){
      this.order_begun = true;
    }
    // TODO: Might want to add emitter here and we can use place-order component
  }

}
