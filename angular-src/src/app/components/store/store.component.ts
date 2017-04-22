import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { Item } from '../../item';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  items: Object[] = [];
  picked_item = Item;
  categories: string[] =[];
  @Output() result = new EventEmitter<Item>();
  constructor(private inventory: ItemService) { }

  ngOnInit() {
    this.inventory.getAllItems().subscribe(inventory => {
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

  addItemToOrder(item_id) {
    this.inventory.getItemById(item_id).subscribe(item => {
      this.picked_item = item;
      console.log('ITEM FOUND: ' + item.name);
    },
    err => {
      console.log('Couldn\'t find item with id: ' + item_id);
      return false;
    }
  );
  }
}
