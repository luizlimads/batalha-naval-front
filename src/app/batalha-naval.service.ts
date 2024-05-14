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
}
