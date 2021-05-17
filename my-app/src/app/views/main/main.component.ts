import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/services/catalog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  products = []

  constructor(private userService: UserService, private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.userService.getInfo().subscribe((res: any) => {
      res.likedProducts.forEach((elem) => {
        this.catalogService.getById(elem.id).subscribe((data: any) => {
          this.products.push(data)
        },
        (error) => console.log(error))
      })
    },
    (error) => console.log(error))
  }

}
