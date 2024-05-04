import { Injectable } from '@angular/core';
import { Environment } from './environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BatalhaNavalService {

  urlBase = Environment.url;

  constructor(private http: HttpClient) { }

  postUser(formData: any) {
    return this.http.post(`${this.urlBase}/usuarios`, formData);
  }

  postCategoria(formData: any) {
    return this.http.post(`${this.urlBase}/itens-categoria`, formData);
  }

  getAllCategorias() {
    return this.http.get(`${this.urlBase}/itens-categoria`);
  }

  postItem(formData: any) {
    return this.http.post(`${this.urlBase}/itens`, formData);
  }

  getAllItems() {
    return this.http.get(`${this.urlBase}/itens`);
  }
}
