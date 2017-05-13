import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  form: FormGroup;
  items: String[] = [];
  item_name: String;

  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  addItemToList(){
    console.log('Adding item: ' + this.item_name);
    this.items.push(this.item_name);
  }

}
