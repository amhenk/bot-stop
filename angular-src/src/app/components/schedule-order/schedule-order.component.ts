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
  constructor() {
    this.options = new DatePickerOptions();
  }


  ngOnInit() {
    this.options.initialDate = new Date();
    this.options.minDate = new Date();
    // this.date.day = new Date().getDate().toString();
    // this.date.year = new Date().getFullYear().toString();
    // this.date.month = new Date().getMonth().toString();
  }

}
