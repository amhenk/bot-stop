import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  item: Object;
  constructor() { }

  ngOnInit() {
  }

  onItemSelect(){

  }

}
