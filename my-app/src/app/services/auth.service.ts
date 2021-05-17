import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwt = null

  constructor(private http: HttpClient) {}

  setJWT(jwt: string): void {
    this.jwt = jwt
  }

  getJWT(): string {
    return this.jwt
  }

  isAuth(): boolean {
    return !!this.jwt
  }

  logout() {
    this.setJWT(null)
    localStorage.clear()
  }

  login(user: User): Observable<{token: string, userType: string}> {
    return this.http.post<{token: string, userType: string}>('/api/auth/login', user).pipe(tap(
      ({token, userType}) => {
        localStorage.setItem('jwt', token)
        localStorage.setItem('userType', userType)
        this.setJWT(token)
      }
    ))
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('/api/auth/register', user)
  }
}
