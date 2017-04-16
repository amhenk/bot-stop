import { Component, OnInit } from '@angular/core';
// import { BrowserModule, DomSanitizer } from '@angular/platform-browser'
import { FeaturedItemsComponent } from '../featured-items/featured-items.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  photo: String;
  company_name_image: String;
  constructor() {
    this.photo = 'assets/images/store_front.jpg';
    this.company_name_image = 'assets/images/bot_stop_name.png';
  }

  ngOnInit() {

  }

}
