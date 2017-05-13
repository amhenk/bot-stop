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
  constructor(private itemService: ItemService) { }

  ngOnInit() {
  }

  addItemToOrder(){
    
  }

}
