import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { DatePickerOptions, DateModel } from 'ng2-datepicker-bootstrap';

import { OrderService } from '../../services/order.service';

import { User } from '../../models/user.model';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-schedule-order',
  templateUrl: './schedule-order.component.html',
  styleUrls: ['./schedule-order.component.css']
})
export class ScheduleOrderComponent implements OnInit {
  model = Object;
  constructor() { }

  ngOnInit() {
  }

}
