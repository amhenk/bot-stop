import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

import { Item } from '../../models/item.model';
/*
  TODO:
    - Have form clear fields instead of redirect to root
 */

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
  providers: [ItemService]
})
export class AddItemComponent implements OnInit {
  category: String;
  name: String;
  sales_price: Number;
  item_id: String;
  item_type: String;
  left_in_stock: Number;
  automated: Boolean;
  items: Item[] = [];

  constructor(private itemService: ItemService,
              private router: Router,
              private flashMessagesService: FlashMessagesService) {}
              //private addItemForm: NgForm) { }

  ngOnInit() {
    this.updateItems();
  }

  updateItems() {
    this.itemService.getAllItems().subscribe(items => {
      this.items = items;
    }, err => {
      throw err;
    })
  }

  clearForm() {
    this.category = null;
    this.name = null;
    this.sales_price = null;
    this.item_id = null;
    this.item_type = null;
    this.left_in_stock = null;
    this.automated = null;
  }

  onItemSubmit() {
    const new_item = {
      category: this.category,
      name: this.name,
      sales_price: this.sales_price,
      item_id: this.item_id,
      item_type: this.item_type,
      left_in_stock: this.left_in_stock,
      automated: this.automated ? this.automated : false
    };

    this.itemService.addItem(new_item).subscribe( data => {
      if(data.success){
        this.flashMessagesService.show('Item added!', {cssClass: 'alert-success', timeout: 3000, fade: true});
        this.updateItems();
        this.clearForm();
      }
      else {
        this.flashMessagesService.show('Item not added!', {cssClass: 'alert-danger', timeout: 3000, fade: true});
        console.log('Adding item failed');
      }
    });
    // Clear form
    // this.addItemForm.reset();
  }
}
