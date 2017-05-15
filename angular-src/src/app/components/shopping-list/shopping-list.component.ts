import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { Item } from '../../models/item.model';
import { User } from '../../models/user.model';
import { ShoppingList } from '../../models/shopping_list.model';

import { AuthService } from '../../services/auth.service';
import { ListService } from '../../services/list.service';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  items: Item[] = [];
  item_name: String;
  list_name: String;
  new_list: boolean;

  curr_item_list: Item[];
  current_item: Item;
  shopping_list: ShoppingList;


  constructor(private itemService: ItemService,
              // private flashMessage: FlashMessagesService,
              private authService: AuthService,
              private listService: ListService
  ) { }

  ngOnInit() {
    this.shopping_list = new ShoppingList();
    this.new_list = true;
    this.item_name = 'Milk';
    this.curr_item_list = [];
    this.current_item = null;
    this.searchUserItem();
    this.shopping_list.name = 'New Shopping List';
    this.shopping_list.items = [];

  }

  searchUserItem() {
    if(this.item_name.length < 1) {
      console.log('No item to add');
      // this.flashMessage.show('Please input an item', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    this.current_item = null;
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
    this.shopping_list.items.push(item);
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
    for(var i = this.shopping_list.items.length - 1; i >= 0; i--) {
      if(this.shopping_list.items[i] === this.current_item){
        this.shopping_list.items.splice(i,1);
        this.current_item = null;
      }
    }
  }

  retrieveList() {

  }

  updateUserList() {
    console.log('Updating list...');
    this.listService.saveUserList(this.shopping_list)
      .subscribe(data => {
        console.log(data.msg);
      }, err => {
        console.log('Failed to save list');
        return false;
      });
  }

  removeUserList(list_name) {
    // TODO: Remove list from the current user
    this.listService.removeUserList(this.list_name);
  }

  discardList() {
    this.shopping_list.items = [];
  }

}
