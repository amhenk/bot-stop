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
  }


  ngOnInit() {
    this.options.initialDate = new Date();
  }

  sendDateToStore(){
    console.log(this.date);
    //TODO: Setup method for partial orders.
    //TODO: Load current user's selected list
    this.orderService.scheduleOrder(this.date.formatted);
  }

}
