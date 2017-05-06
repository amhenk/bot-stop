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
    function addZero(num) {
      return (num >= 0 && num < 10) ? "0" + num : num + "";
    }
    console.log(this.date);
    //TODO: Setup method for partial orders.
    //TODO: Load current user's selected list
    var d = new Date(Date.parse(this.date.formatted));
    var date_string = addZero(d.getMonth()+1) + '/' + addZero(d.getDate()) +'/' + d.getFullYear()
                + ' ' + addZero(d.getHours()) + ':' + addZero(d.getMinutes());
    // this.orderService.scheduleOrder(date_string);
    localStorage.setItem('order_pickup_date', date_string);
  }

}
