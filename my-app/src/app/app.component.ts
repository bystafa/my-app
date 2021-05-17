import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  catalogDisplay = false;
  basketDisplay = false;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    const potentialToken = localStorage.getItem('jwt')
    if (potentialToken !== null) {
      this.auth.setJWT(potentialToken)
    }
  }

  catalogDisplayEvent(e) {
    this.catalogDisplay = e;
    this.basketDisplay = false;
  }

  basketDisplayEvent(e) {
    this.catalogDisplay = false;
    this.basketDisplay = e;
  }
}
