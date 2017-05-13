import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Item } from '../../models/item.model';

import { ItemService } from '../../services/item.service';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  items: Item[] = [];
  item_name: String;
  curr_item_list: Item[];
  current_item: Item;

  constructor(private itemService: ItemService,
              private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.item_name = 'Milk';
    this.curr_item_list = [];
    this.current_item = null;
    this.getUserSelectedItem();
  }

  getUserSelectedItem() {
    if(this.item_name.length < 1) {
      console.log('No item to add');
      this.flashMessage.show('Please input an item', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    this.itemService.getItemsByName(this.item_name).subscribe(items => {
      this.curr_item_list = items;
      console.log(this.curr_item_list);
    },
    err => {
      console.log('Oh no!');
      return false;
    });
  }

  // TODO: Get Items from the current item list
  addItemToList(item){
    console.log('Adding item: ' + item);
    this.items.push(item);
    this.item_name = '';

    // Empty the searched items
    this.curr_item_list = [];
  }

  displayItemInfo(selected_item){
    // Empty the item list to dispaly the selected item's info
    this.curr_item_list = [];

    this.current_item = selected_item;
    console.log('Selected Item: ' + this.current_item.name);
  }

  removeSelectedItem() {
    for(var i = this.items.length - 1; i >= 0; i--) {
      if(this.items[i] === this.current_item){
        this.items.splice(i,1);
        this.current_item = null;
      }
    }
  }

}
