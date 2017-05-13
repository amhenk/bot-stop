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
  items: String[] = [];
  item_name: String;
  curr_item_list: Item[] = [];


  constructor(private itemService: ItemService,
              private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.item_name = '';
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
    this.item_name = '';
  }

  // TODO: Get Items from the current item list
  addItemToList(){
    console.log('Adding item: ' + this.item_name);
    this.items.push(this.item_name);
    this.item_name='';
  }

}
