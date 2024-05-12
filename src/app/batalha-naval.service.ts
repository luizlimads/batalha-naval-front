import { Injectable } from '@angular/core';
import { Environment } from './environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BatalhaNavalService {

  urlBase = Environment.url;

  constructor(private http: HttpClient) { }

  postTeste(formData: any) {
    return this.http.post(`${this.urlBase}/teste`, formData);
  }

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
   // const command = { ...formData, image: file }
    //console.log(command)
    return this.http.post(`${this.urlBase}/itens`, formData);
  }

  getAllItems() {
    return this.http.get(`${this.urlBase}/itens`);
  }

  deleteCategoria(categoriaId: number) {
    return this.http.delete(`${this.urlBase}/itens-categoria/${categoriaId}`);
  }

  getCategoria(categoriaId: number) {
    return this.http.get(`${this.urlBase}/itens-categoria/${categoriaId}`);
  }

  updateCategoria(formData: any) {
    return this.http.put(`${this.urlBase}/itens-categoria`, formData);
  }

  deleteItem(itemId: number) {
    return this.http.delete(`${this.urlBase}/itens/${itemId}`);
  }
  
  getItem(itemId: number) {
    return this.http.get(`${this.urlBase}/itens/${itemId}`);
  }

  updateItem(formData: any) {
    return this.http.put(`${this.urlBase}/itens`, formData);
  }
}
