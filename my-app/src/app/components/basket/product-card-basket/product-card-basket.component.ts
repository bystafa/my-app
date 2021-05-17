import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-product-card-basket',
  templateUrl: './product-card-basket.component.html',
  styleUrls: ['./product-card-basket.component.scss']
})
export class ProductCardBasketComponent implements OnInit {

  @Input() response
  @Input() quantity
  @Output() price = new EventEmitter()
  total

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.total = this.quantity * this.response.price
    this.emitPrice()
  }

  emitPrice() {
    this.price.emit(this.total)
  }

  changeQuantity(type) {
    let qual = 1;
    if (type === 'ADD') qual = (this.quantity < this.response.quantity) ? this.quantity + 1 :  this.quantity;
    else if (type === 'REMOVE') qual = (this.quantity > 1) ? this.quantity - 1 :  1;
    const productsInBasket = [{id: this.response.id, quantity: qual }]
    this.userService.addProducts({productsInBasket}).subscribe((res) => {}, (error) => console.log(error), ()=> {
      this.quantity = qual
      this.total = this.response.price * this.quantity
      this.emitPrice()
    })
  }

}
