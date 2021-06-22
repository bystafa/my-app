import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {

  data;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getInfo().subscribe(res => {
      if (res) {
        this.data = res
      }
    })
  }

}
