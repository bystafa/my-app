import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-rating',
  templateUrl: './user-rating.component.html',
  styleUrls: ['./user-rating.component.scss']
})
export class UserRatingComponent implements OnInit {

  data = [];

  constructor(private userService: UserService, private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.userService.getInfo().subscribe((res:any) => {
      if (res && res.rating.length) {
        res.rating.forEach(el => {
          this.catalogService.getById(el.id).subscribe((data: any) => {
            if (data) {
              data.rating = el.id
              this.data.push(data)
            }
          },
          (error)=> console.log(error))
        })
      }
    }, (error) => console.log(error))
  }

  goToProductPage() {
    
  }

}
