import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderService } from '../../services/order.service';
import { ItemService } from '../../services/item.service';  // to look up items by Item ID

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  constructor(private router: Router,
              private orderServe: OrderService,
              private itemService: ItemService
            ) { }

  ngOnInit() {
  }

  onOrderSubmit(){

  }
}
