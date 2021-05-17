import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient) { }

  getAllByCategory(category: string) {
    return this.http.post('/api/products/', {category})
  }

  getAll() {
    return this.http.get('/api/products/')
  }

  getById(id: number) {
    return this.http.get(`/api/products/${id}`)
  }

  createProduct(fd) {
    return this.http.post('/api/products/create', fd)
  }
}
