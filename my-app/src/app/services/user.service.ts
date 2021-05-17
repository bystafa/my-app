import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addProducts(products) {
    return this.http.patch('/api/user/add', products)
  }

  deleteProducts(products) {
    return this.http.patch('/api/user/delete', products)
  }

  getInfo() {
    return this.http.get('/api/user/')
  }

  like(data) {
    return this.http.patch('/api/user/like', data)
  }

  createOrder(data) {
    return this.http.post('/api/order', data)
  }

  getUserOrderById() {
    return this.http.get('/api/order')
  }
}
