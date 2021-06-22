import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { UserService } from 'src/app/services/user.service';
import { CatalogService } from '../.././services/catalog.service'

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  data;
  quantity = 1;
  liked = false;
  bought = false;
  rating = 0;
  productsInBasket = []
  message = 'Оценка пользователей'
  loader = true;


  constructor(private activateRoute: ActivatedRoute, 
              private catalogService: CatalogService, 
              private modalService: NgbModal, 
              private userService: UserService, 
              private route: Router) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((params: ParamMap) => {
      this.catalogService.getById(+params.get('id')).subscribe(res => {
        this.data = res 
        if (this.data) {
          this.userService.getInfo().subscribe((res: any) => {
            this.productsInBasket = res.productsInBasket
            this.quantity = res.productsInBasket[res.productsInBasket.findIndex((elem) => elem.id === this.data.id)] ? res.productsInBasket[res.productsInBasket.findIndex((elem) => elem.id === this.data.id)].quantity : 1
            this.bought = res.productsInBasket.find((elem) => elem.id === this.data.id)
            this.liked = res.likedProducts.find((elem) => elem.id === this.data.id)
            let ind = res.rating.findIndex((elem) => elem.id === this.data.id)
            if (res.rating && ind != -1) {
              this.rating = res.rating[ind].rating
              this.message = 'Ваша оценка'
            } else if (this.data.rating) {
              this.rating = this.data.rating
            }
            this.loader = false;
          })
        }
      })
    })
  }

  gotoBasket() {
    const productsInBasket = [{id: this.data.id, quantity: this.quantity}]
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
      this.userService.like({likedProducts:[{id: this.data.id}]}).subscribe((res)=> {
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

  changeRating() {
    this.catalogService.changeRating(this.data.id, this.rating).subscribe(null,(error)=> console.log(error))
    this.userService.changeRating({id: this.data.id, rating: this.rating}).subscribe(null,(error)=> console.log(error))
    this.message = 'Ваша оценка'
  }
}
