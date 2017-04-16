import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  items: Object[] = [];
  categories: string[] =[];

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

}
