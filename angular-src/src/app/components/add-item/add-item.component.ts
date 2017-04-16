import { Component, OnInit } from '@angular/core';
import { ItemService } from '../../services/item.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
// import { FormGroup } from '@angular/forms';

/*
  TODO:
    - Have form clear fields instead of redirect to root
 */

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
  providers: [ItemService]
})
export class AddItemComponent implements OnInit {
  category: String;
  name: String;
  sales_price: Number;
  item_id: String;
  item_type: String;
  left_in_stock: Number;
  automated: Boolean;
  // addItemForm: FormGroup;

  constructor(private itemService: ItemService,
              private router: Router,
              private flashMessagesService: FlashMessagesService) {}
              //private addItemForm: NgForm) { }

  ngOnInit() {
  }

  onItemSubmit() {
    const new_item = {
      category: this.category,
      name: this.name,
      sales_price: this.sales_price,
      item_id: this.item_id,
      item_type: this.item_type,
      left_in_stock: this.left_in_stock,
      automated: this.automated ? this.automated : false
    };

    this.itemService.addItem(new_item).subscribe( data => {
      if(data.success){
        this.flashMessagesService.show('Item added!', {cssClass: 'alert-success', timeout: 3000, fade: true});
        this.router.navigate(['/additem']);
        this.router.navigate(['/']);
      }
      else {
        this.flashMessagesService.show('Item not added!', {cssClass: 'alert-danger', timeout: 3000, fade: true});
        console.log('Adding item failed');
        this.router.navigate(['/']);
      }
    });
    // Clear form
    // this.addItemForm.reset();
  }
}
