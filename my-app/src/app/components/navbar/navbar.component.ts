import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showCatalog = false;
  showBasket = false;
  message = 'Вход';
  showSearchLine = false;

  @Output() catalogDisplay = new EventEmitter();
  @Output() basketDisplay = new EventEmitter();

  constructor(private route: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getInfo().subscribe((res: any) => {if (res) {this.message = res.name || 'Пользователь'; this.showSearchLine = true;}},
    (error) => {console.log(error); this.showSearchLine = false;})
  }

  catalogDisplayEvent() {
    this.showCatalog = ! this.showCatalog
    this.catalogDisplay.emit(this.showCatalog)
  }

  basketDisplayEvent() {
    this.showBasket = ! this.showBasket
    this.basketDisplay.emit(this.showBasket)
  }
  link() {
    this.userService.getInfo().subscribe((res: any) => {
      if (res) {
        this.route.navigate(['/user'])
      }
    },
    (error) => {
      if (error.status === 401) {
        this.route.navigate(['/auth'])
      }
    })
  }
}
