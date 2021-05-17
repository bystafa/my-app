import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { CatalogService } from 'src/app/services/catalog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-basket-page',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketPageComponent implements OnInit {

  products = []
  quantity = []
  length = 0
  price = []
  totalPrice = 0
  phone
  index
  address

  constructor(private userService: UserService, private catalogService: CatalogService, private modalService: NgbModal, private route: Router) { }

  ngOnInit(): void {
    this.userService.getInfo().subscribe((res: any) => {
      res.productsInBasket.forEach((elem) => {
        this.catalogService.getById(elem.id).subscribe((data: any) => {
          this.price.push(data.price * elem.quantity)
          this.products.push(data)
          this.quantity.push(elem.quantity)
        },
        (error) => console.log(error),
        () => this.calcTotalPrice())
      })
      this.length = res.productsInBasket.length
    },
    (error) => {
      if (error.status === 401) {
        const modalRef = this.modalService.open(ModalComponent, { centered: true });
        modalRef.componentInstance.text = 'Время действия авторизации закончилось. Авторизуйтесь, пожалуйста, заново';
        modalRef.componentInstance.type = 'NEGATIVE';
        setTimeout(() => {
          modalRef.close()
        }, 1500);
        this.route.navigate(['/auth'])
      }
    })
  }

  calcTotalPrice() {
    this.totalPrice = this.price.reduce((acc, current) => acc + current)
  }

  createOrder() {
    const arr = []
    this.products.forEach((elem, index) => {
      arr.push({id: elem.id, quantity: this.quantity[index]})
    })
    const order = {
      products: arr,
      phone: this.phone,
      index: this.index,
      address: this.address
    }
    this.userService.createOrder(order).subscribe(
      () => {},
      (error) => console.log(error),
      () => {
        const modalRef = this.modalService.open(ModalComponent, { centered: true });
        modalRef.componentInstance.text = 'Заказ создан';
        modalRef.componentInstance.type = 'POSITIVE';
        setTimeout(() => {
          modalRef.close()
          this.route.navigate(['/catalog'])
        }, 1500);
      }
    )
  }
}
