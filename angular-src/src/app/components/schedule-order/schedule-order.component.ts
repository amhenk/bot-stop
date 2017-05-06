import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

import { OrderService } from '../../services/order.service';

import { User } from '../../models/user.model';
import { Order } from '../../models/order.model';

@Component({
  selector: 'schedule-order',
  templateUrl: './schedule-order.component.html',
  styleUrls: ['./schedule-order.component.css']
})
export class ScheduleOrderComponent implements OnInit {
  @Input() date: DateModel;
  options: DatePickerOptions;
  constructor(private orderService: OrderService) {
    this.options = new DatePickerOptions();
    this.options.format = 'MM/DD/YYYY';
  }


  ngOnInit() {
    this.options.initialDate = new Date();
  }

  sendDateToStore(){
    console.log(this.date);
    //TODO: Setup method for partial orders.
    //TODO: Load current user's selected list
    var date_string = this.date.month + '/' + this.date.day +'/' + this.date.year;
    // this.orderService.scheduleOrder(date_string);
    localStorage.setItem('order_pickup_date', date_string);
  }

}
