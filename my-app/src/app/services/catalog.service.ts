import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  api = '/api/products/'

  constructor(private http: HttpClient) { }

  getAllByCategory(category: string) {
    return this.http.post(this.api, {category})
  }

  getAll() {
    return this.http.get(this.api)
  }

  getById(id: number) {
    return this.http.get(this.api + id)
  }

  getByString(string: string) {
    return this.http.post(this.api + 'getByString', {string})
  }

  createProduct(fd) {
    return this.http.post(this.api + 'create', fd)
  }

  changeRating(id, rating) {
    return this.http.post(this.api + id, {rating})
  }
}
