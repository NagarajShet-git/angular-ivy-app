import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  constructor(private http: HttpClient) {}

  getUsers1() {
    return this.http.get('https://jsonplaceholder.typicode.com/users/1');
  }
  getUsers2() {
    return this.http.get('https://jsonplaceholder.typicode.com/users/4');
  }
  getUsers3() {
    return this.http.get('https://jsonplaceholder.typicode.com/users/3');
  }
}
