import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  selector: 'app-search-line',
  templateUrl: './search-line.component.html',
  styleUrls: ['./search-line.component.scss']
})
export class SearchLineComponent implements OnInit {

  searchLine = ''
  placeholder = "Найти на сайте ..."
  searchData = []
  loader = true

  constructor(private service: CatalogService, private route: Router) { }

  ngOnInit(): void {
  }

  init() {
    this.searchData = []
    this.loader = true
  }
  
  fetchResults() {
    if (this.searchLine.length > 2) {
      this.service.getByString(this.searchLine).subscribe((res: any) => {
        if (res) {
          this.searchData = res
          this.loader = false
        }
        else {
          this.init()
        }
      })
    } else {
      this.init()
    }
  }

  link(id?) {
    this.searchLine = ''
    this.init()
    this.route.navigate(['/catalog/' + id])
  }
}
