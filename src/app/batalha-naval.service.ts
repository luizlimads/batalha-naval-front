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

  getUser(userId: any) {
    return this.http.get(`${this.urlBase}/usuarios/${userId}`);
  }

  postPacote(formData: any) {
    return this.http.post(`${this.urlBase}/pacotes`, formData);
  }

  getPacotes() {
    return this.http.get(`${this.urlBase}/pacotes`);
  }

  deleteTema(temaId: number) {
    return this.http.delete(`${this.urlBase}/pacotes/${temaId}`);
  }

  getPacote(temaId: number) {
    return this.http.get(`${this.urlBase}/pacotes/${temaId}`);
  }

  updatePacote(temaId: number, formData: any) {
    return this.http.put(`${this.urlBase}/pacotes/${temaId}`, formData);
  }

  login(formData: any) {
    return this.http.post(`${this.urlBase}/usuarios/login`, formData);
  }

  comprarPacote(compradorId: number, temaId: number) {
    return this.http.post(`${this.urlBase}/pacotes/usuarios/${compradorId}/temas/${temaId}/comprar`, null);
  }

  getUserPacotes(userId: number) {
    return this.http.get(`${this.urlBase}/usuarios/${userId}/pacotes`);
  }

  async getUserPacotesPre(userId: number): Promise<any> {
    return this.http.get(`${this.urlBase}/usuarios/${userId}/pacotes`);
  }

  updateUserTemaId(userId: number, formData: any){
    return this.http.put(`${this.urlBase}/usuarios/${userId}/alterar-ids-pacotes`, formData);
  }
}
