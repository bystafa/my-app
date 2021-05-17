import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-line',
  templateUrl: './search-line.component.html',
  styleUrls: ['./search-line.component.scss']
})
export class SearchLineComponent implements OnInit {

  placeholder = "Найти на сайте ..."

  constructor() { }

  ngOnInit(): void {
  }

}
