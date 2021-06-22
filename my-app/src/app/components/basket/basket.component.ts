import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CatalogService } from 'src/app/services/catalog.service';
import { UserService } from 'src/app/services/user.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  products = []
  quantity = []
  length = 0
  price = []
  totalPrice = 0
  loader = true

  @Output() showBasket = new EventEmitter()
  constructor(private userService: UserService, private catalogService: CatalogService, private modalService: NgbModal, private route: Router) { }

  ngOnInit(): void {
    this.userService.getInfo().subscribe((res: any) => {
      if (res.productsInBasket.length > 0) {
        res.productsInBasket.forEach((elem) => {
          this.catalogService.getById(elem.id).subscribe((data: any) => {
            this.price.push(data.price * elem.quantity)
            this.products.push(data)
            this.quantity.push(elem.quantity)
            this.loader = false
          },
          (error) => console.log(error),
          () => this.calcTotalPrice())
        })
        this.length = res.productsInBasket.length
      } else {
        this.loader = false
      }
    },
    (error) => {
      if (error.status === 401) {
        const modalRef = this.modalService.open(ModalComponent, { centered: true });
        if (localStorage.getItem('jwt')) modalRef.componentInstance.text = 'Время действия авторизации закончилось. Авторизуйтесь, пожалуйста, заново';
        else modalRef.componentInstance.text = 'Авторизуйтесь, пожалуйста';
        modalRef.componentInstance.type = 'NEGATIVE';
        setTimeout(() => {
          modalRef.close()
        }, 1500);
        this.showBasketEmit(false)
        this.route.navigate(['/auth'])
      }
    })
  }

  calcTotalPrice() {
    this.totalPrice = this.price.reduce((acc, current) => acc + current)
  }

  showBasketEmit(value) {
    this.showBasket.emit(value)
  }

}
