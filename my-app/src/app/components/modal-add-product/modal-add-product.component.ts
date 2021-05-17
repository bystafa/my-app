import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CatalogService } from 'src/app/services/catalog.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modal-add-product',
  templateUrl: './modal-add-product.component.html',
  styleUrls: ['./modal-add-product.component.scss']
})
export class ModalAddProductComponent implements OnInit {

  form: FormGroup
  file: File
  src
  categories = [{text: '3G антенны', value: '3G'}, {text: '4G антенны', value: '4G'}, {text: '5G антенны', value: '5G'}, {text: 'TV антенны', value: 'TV'},{text: 'GMS', value: 'GMS'},
                {text: '3G/4G-WiFi Роутеры', value: 'ROUTERS'}, {text: 'Антенны с боксом (BOX)', value: 'BOX'}, {text: 'Антенны для радиосвязи', value: 'RADIO'}, {text: '3G/4G USB модемы', value: 'USB'},{text: 'WiFi', value: 'WIFI'},
                {text: 'Антенны диапазона 3,5ГГц', value: '3.5GHZ'}, {text: 'Репитеры GSM/3G/4G', value: 'REPEATERS'}, {text: 'Делители мощности', value: 'DIVIDERS'}, {text: 'Мачты, стеновые крепления, аксессуары', value: 'ACCESSORIES'},{text: 'Фильтры, диплексеры', value: 'FILTERS'},
                {text: 'Грозозащита', value: 'PROTECTION'}, {text: 'Кабели, кабельные сборки, адаптеры (пигтейлы)', value: 'CABELS'}, {text: 'ВЧ разъемы, ВЧ переходники', value: 'HF_CONNECTORS'}, {text: 'Инструменты', value: 'INSTRUMENTS'},{text: 'Антенны для прочих диапазонов', value: 'OTHER_DIAPASON'}]

  constructor(private dialog: MatDialogRef<ModalAddProductComponent>, private CatalogService: CatalogService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('',[Validators.required]),
      quantity: new FormControl('', [Validators.required, this.numberValidator]),
      price: new FormControl('', [Validators.required, this.numberValidator]),
      category: new FormControl('', [Validators.required])
    })
  }


  onSubmit(): void {
    if (this.form.valid) {
      let fd = new FormData();
      fd.append('imageSrc',this.file, this.file.name)
      fd.append('name',this.form.value.name)
      fd.append('quantity',this.form.value.quantity)
      fd.append('price',this.form.value.price)
      fd.append('category',this.form.value.category)
      this.CatalogService.createProduct(fd).subscribe(
        () => {},
        (error) => console.log(error),
        () => {
          const modalRef = this.modalService.open(ModalComponent, { centered: true });
          modalRef.componentInstance.text = "Продукт успешно создан";
          modalRef.componentInstance.type = "POSITIVE";
          setTimeout(() => {
            modalRef.close()
          }, 1500)
          this.closeModal()
        }
      )
    }
  }

  closeModal() {
    this.dialog.close()
  }

  numberValidator(control: AbstractControl): {[key: string]: any} | null{
    const isNumber = /^[0-9]+$/.test(control.value)
    return isNumber ? null: {numberValidator: !isNumber}
  }
  onFileSelected(file: File[]) {
    if (file[0]) {
      this.file = file[0]
      const reader = new FileReader()
      reader.readAsDataURL(this.file)

      reader.onload = event => {
        this.src = reader.result
      }
    }
  }   
}
