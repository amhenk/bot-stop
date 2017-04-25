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

  user: User = new User();
  orders: Order[];
  past_orders: Order[] = [];
  future_orders: Order[] = [];
  temp: Order = new Order();

  /* Module Toggles */
  displayRecommended: boolean = true
  displayPastOrders: boolean = false;
  displayUpcomingOrders: boolean = false;
  displayCreateScheduledOrder: boolean = false;
  displayShoppingList: boolean = false;
  displayCreateNewShoppingList: boolean = false;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile =>{
      this.user = profile.user;

      this.orderService.getOrder(profile._id).subscribe(orders => {
        this.orders = orders;
        this.orders.forEach( (s) => {
          if("pickup_date" in s){
            var pickupdate = new Date(s.pickup_date);
            var now = new Date().getTime().valueOf();
            if (s.pickup_date == null || pickupdate.getTime().valueOf() < now){
              s.pickup_date = (pickupdate.getMonth()+1) +'/'
                              + pickupdate.getDay() + '/' + pickupdate.getFullYear()
                              + ' ' + pickupdate.getHours() + ':' + pickupdate.getMinutes();
              this.past_orders.push(s);
            }
            else {
              s.pickup_date = (pickupdate.getMonth()+1) +'/'
                              + pickupdate.getDay() + '/' + pickupdate.getFullYear()
                              + ' ' + pickupdate.getHours() + ':' + pickupdate.getMinutes();
              this.future_orders.push(s);
            }
          } else if(!("pickup_date" in s)){
            console.log("No!");
          }
        });
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

  private setAllFalse(){
    this.displayRecommended = false;
    this.displayPastOrders = false;
    this.displayUpcomingOrders = false;
    this.displayCreateScheduledOrder = false;
    this.displayShoppingList = false;
    this.displayCreateNewShoppingList = false;
  }

  viewPastOrders(){
    this.setAllFalse();
    this.displayPastOrders = true;
  }

  startNewList(){
    console.log("Whaddup");
  }

}
