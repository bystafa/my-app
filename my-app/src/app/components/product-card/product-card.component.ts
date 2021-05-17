import { error } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/interfaces';
import { UserService } from 'src/app/services/user.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input() response: Product
  quantity = 1
  bought = false
  liked = false
  productsInBasket = []

  constructor(private modalService: NgbModal, private userService: UserService, private route: Router) { }

  ngOnInit(): void {
    this.userService.getInfo().subscribe((res: any) => {
      this.productsInBasket = res.productsInBasket
      this.quantity = res.productsInBasket[res.productsInBasket.findIndex((elem) => elem.id === this.response.id)] ? res.productsInBasket[res.productsInBasket.findIndex((elem) => elem.id === this.response.id)].quantity : 1
      this.bought = res.productsInBasket.find((elem) => elem.id === this.response.id)
      this.liked = res.likedProducts.find((elem) => elem.id === this.response.id)
    })
  }

  gotoBasket() {
    const productsInBasket = [{id: this.response.id, quantity: this.quantity}]
    if (localStorage.getItem('jwt')) {
      if (!this.bought) {
        this.userService.addProducts({productsInBasket}).subscribe(
          (res) => {
            this.bought = !this.bought
            this.openModal('Товар успешно добавлен в корзину', 'POSITIVE')
          },
          (error) => {
            if (error.status === 401) {
              this.openModal('Время действия авторизации закончилось. Авторизуйтесь, пожалуйста, заново', 'NEGATIVE')
            }
          }
        )
      } else {
        this.userService.deleteProducts({productsInBasket}).subscribe(
          (res) => {
            this.bought = !this.bought
            this.openModal('Товар убран из корзины', 'POSITIVE')
          },
          (error) => {
            if (error.status === 401) {
              this.openModal('Время действия авторизации закончилось. Авторизуйтесь, пожалуйста, заново', 'NEGATIVE')
            }
          }
        )
      }
    } else {
      this.openModal('Нужно авторизоваться', 'NEGATIVE')
      this.route.navigate(['/auth'])
    }
  }

  like() {
    if (localStorage.getItem('jwt')) {
      this.userService.like({likedProducts:[{id: this.response.id}]}).subscribe((res)=> {
        console.log(res)
        this.liked = !this.liked
      },
      (error) => console.log(error))
    }
  }

  openModal(text, type) {
    const modalRef = this.modalService.open(ModalComponent, { centered: true });
    modalRef.componentInstance.text = text;
    modalRef.componentInstance.type = type;
    setTimeout(() => {
      modalRef.close()
      if (type === 'NEGATIVE') this.route.navigate(['/auth'])
    }, 1500);
  }
}
