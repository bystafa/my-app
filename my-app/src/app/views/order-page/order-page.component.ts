import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { CatalogService } from 'src/app/services/catalog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  
  data
  products = []
  length = 0
  loader = true

  constructor(private userService: UserService, private modalService: NgbModal, private route: Router, private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.userService.getUserOrderById().subscribe((res: any) => {
      this.data = res
      this.length = this.data.length
      if (res.length > 0) {
        this.data.forEach((item, index) => {
          item.products.forEach((elem, i) => {
            this.catalogService.getById(elem.id).subscribe((data: any) => {
              data.quantity = this.data[index].products[i].quantity
              this.data[index].products[i] = data
              if ((i + 1) === item.products.length && (index + 1) === this.data.length) {
                this.loader = false
                console.log(this.data)
              }
            },
            (error) => console.log(error))
          })
        })
      }
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
}
