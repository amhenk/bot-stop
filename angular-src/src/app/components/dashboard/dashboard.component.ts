import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';

import { User } from '../../user';
import { Order } from '../../order';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  name: String;
  username: String;
  orders: Object;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile =>{
      this.user = profile.user;
      this.name = this.user.name;
      this.username = this.user.username;

      this.orderService.getOrder(profile._id).subscribe(orders => {
        this.orders = orders;
        console.log(orders);
      },
      err => {
          console.log(err);
          return false;
      });
    },
    err => {
      console.log(err);
      return false;
    });
  }

  startNewList(){
    console.log("Whaddup");
  }

}
