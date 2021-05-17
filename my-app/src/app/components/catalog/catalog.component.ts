import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  @Output() catalogShow = new EventEmitter()

  constructor(private route: Router, private userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  catalogShowEmit(value) {
    this.catalogShow.emit(value)
  }

  link(params) {
    this.userService.getInfo().subscribe(
      () => {},
      (error) => {
        if (error.status === 401) {
          const modalRef = this.modalService.open(ModalComponent, { centered: true });
          modalRef.componentInstance.text = 'Время действия авторизации закончилось. Авторизуйтесь, пожалуйста, заново';
          modalRef.componentInstance.type = 'NEGATIVE';
          setTimeout(() => {
            modalRef.close()
          }, 1500);
          this.route.navigate(['/auth'])
          this.catalogShowEmit(false)
        }
      },
      () => {
        this.route.navigate(['catalog'], {queryParams: params})
        this.catalogShowEmit(false)
      }
    )
  }

}
