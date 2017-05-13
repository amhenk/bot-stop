import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';

import { ItemService } from '../../services/item.service';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  items: String[] = [];
  item_name: String;

  constructor(private itemService: ItemService,
              private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.item_name = '';
  }

  addItemToList(){
    if(this.item_name.length < 1) {
      console.log('No item to add');
      this.flashMessage.show('Please input an item', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
    console.log('Adding item: ' + this.item_name);
    this.items.push(this.item_name);
    this.item_name='';
  }

}
