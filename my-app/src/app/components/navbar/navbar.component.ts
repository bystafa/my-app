import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showCatalog = false;
  showBasket = false;

  @Output() catalogDisplay = new EventEmitter();
  @Output() basketDisplay = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  catalogDisplayEvent() {
    this.showCatalog = ! this.showCatalog
    this.catalogDisplay.emit(this.showCatalog)
  }

  basketDisplayEvent() {
    this.showBasket = ! this.showBasket
    this.basketDisplay.emit(this.showBasket)
  }

}
