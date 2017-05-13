import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
import { ItemService } from '../../services/item.service';

import { User } from '../../models/user.model';
import { Order } from '../../models/order.model';
import { Item } from '../../models/item.model';

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
  temp: Order;
  order_items: Object[] = [];

  /* Module Toggles */
  displayPastOrders: boolean = false;
  displayUpcomingOrders: boolean = false;
  displayCreateScheduledOrder: boolean = false;
  displayShoppingList: boolean = true;
  displayCreateNewShoppingList: boolean = false;

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private itemService: ItemService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile =>{
      this.user = profile.user;

      this.orderService.getCustomerOrders(profile._id).subscribe(orders => {
        this.orders = orders;
        this.orders.forEach( (s) => {
          if("pickup_date" in s){
            var pickupdate = new Date(s.pickup_date);
            var now = new Date().getTime().valueOf();
            if (s.pickup_date == null || pickupdate.getTime().valueOf() < now){
              s.pickup_date = (pickupdate.getMonth()+1) +'/'
                              + pickupdate.getDate() + '/' + pickupdate.getFullYear()
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
        console.log(this.future_orders);
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
    this.displayPastOrders = false;
    this.displayUpcomingOrders = false;
    this.displayCreateScheduledOrder = false;
    this.displayShoppingList = false;
    this.displayCreateNewShoppingList = false;
  }

  viewPastOrders(){
    this.setAllFalse();
    this.order_items = [];
    this.temp = null;
    this.displayPastOrders = true;
  }

  startNewList(){
    this.setAllFalse();
    this.displayShoppingList = true;
    console.log("Whaddup");
  }

  retrieveOrder(orderId){
    this.viewPastOrders();
    this.orderService.getOrderById(orderId).subscribe(order => {
      this.temp = order;
      this.order_items = [];
      console.log('Order retrieved');
      this.temp.items.forEach( (item_number) => {
        this.itemService.getItemByItemNumber(item_number).subscribe(item => {
          this.order_items.push(item[0]);
        }, err => {
          console.log(err);
          return false;
        });
      });
      console.log(this.order_items);
    },
    err => {
      console.log(err);
      return false;
    });

  }

  scheduleOrder(){
    console.log('Hello!');
    this.setAllFalse();
    this.displayCreateScheduledOrder = true;
  }

}
