import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  items: item[] = [];
  chips: item;
  apple: item;

  constructor() { }

  ngOnInit() {
    this.chips = {
      category : "Pantry",
      name : "Doritios",
      price : 1.99,
      item_id: "1233AB"
    };

    this.apple = {
      category : "Produce",
      name : "Granny Smith Apple",
      price : 1.49,
      item_id: "94823AC"
    };

    this.items.push(this.chips);
    this.items.push(this.apple);
  }

}

interface item{
  category: string;
  name: string;
  price: number;
  item_id: string;
}
