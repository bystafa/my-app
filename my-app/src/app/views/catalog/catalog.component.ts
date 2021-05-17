import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddProductComponent } from 'src/app/components/modal-add-product/modal-add-product.component';
import { CatalogService } from 'src/app/services/catalog.service';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-catalog-page',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogPageComponent implements OnInit {

  subarr = []
  quantity = 0
  title = 'Каталог товаров'
  userType

  constructor(private dialog: MatDialog, private catalogService: CatalogService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userType = localStorage.getItem('userType')
    this.route.queryParams
      .subscribe(params => {
        if (params.type) {
          this.title = params.type
          this.catalogService.getAllByCategory(params.type).subscribe(
            (res: []) => {
              this.transformator(res)
              this.quantity = res.length
            },
            (error) => {
              console.log(error)
            }
          )
        } else {
          this.catalogService.getAll().subscribe(
            (res: []) => {
              this.transformator(res)
              this.quantity = res.length
            },
            (error) => {
              console.log(error)
            } 
          )
        }
      }
    );
  }

  transformator(array: []) {
    this.subarr = []
    for (let i = 0; i <Math.ceil(array.length/3); i++){
      this.subarr[i] = array.slice((i*3), (i*3) + 3);
    }
  }

  openModal() {
    this.dialog.open(ModalAddProductComponent, {
      width: '900px'
    })
  }
}
