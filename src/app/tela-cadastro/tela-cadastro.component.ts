import { Element } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tela-cadastro',
  templateUrl: './tela-cadastro.component.html',
  styleUrl: './tela-cadastro.component.css'
})
export class TelaCadastroComponent {

  dica: boolean = false;
  larguraFraca = 0;
  larguraMedia = 0;
  larguraForte = 0; 
  pontos = 0; 
  icon = `<svg xmlns="http://www.w3.org/2000/svg" style="width: 22px; fill: green;" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" /></svg>`

  @ViewChild('eig') oEig!: ElementRef;
  @ViewChild('num') oNum!: ElementRef;
  @ViewChild('min') oMin!: ElementRef;
  @ViewChild('mai') oMai!: ElementRef;
  @ViewChild('esp') oEsp!: ElementRef;

  fnDica() {
    this.dica = !this.dica;
  }

  fnStatusPass(e: any) {
    this.oEig.nativeElement.innerHTML  = "6 caracteres;";
    this.oNum.nativeElement.innerHTML  = "1 número;";
    this.oMin.nativeElement.innerHTML  = "1 letra minúscula;";
    this.oMai.nativeElement.innerHTML  = "1 letra maiúscula;";
    this.oEsp.nativeElement.innerHTML  = "1 caracter especial.";  

    this.pontos = 0;

    const min = /[a-z]/;
    const mai = /[A-Z]/;
    const num = /[0-9]/;
    const esp = /\W|_/;

    if (e.text.length >= 6) {
      this.pontos += 5;
      this.oEig.nativeElement.innerHTML += this.icon;
    }

    if (min.test(e.text)) {
      this.pontos += 5;
      this.oMin.nativeElement.innerHTML += this.icon;
    }

    if (mai.test(e.text)) {
      this.pontos += 5;
      this.oMai.nativeElement.innerHTML += this.icon;

    }

    if (num.test(e.text)) {
      this.pontos += 5;
      this.oNum.nativeElement.innerHTML += this.icon;

    }

    if (esp.test(e.text)) {
      this.pontos += 5;
      this.oEsp.nativeElement.innerHTML += this.icon;
    }


    if (this.pontos == 0) {
      this.larguraFraca = 0;
      this.larguraMedia = 0;
      this.larguraForte = 0;
    }

    if (this.pontos == 5) {
      this.larguraFraca = 20;
      this.larguraMedia = 0;
      this.larguraForte = 0;
    }

    if (this.pontos == 10) {
      this.larguraFraca = 33;
      this.larguraMedia = 7;
      this.larguraForte = 0;
    }

    if (this.pontos == 15) {
      this.larguraFraca = 33;
      this.larguraMedia = 27;
      this.larguraForte = 0;
    }

    if (this.pontos == 20) {
      this.larguraFraca = 33;
      this.larguraMedia = 33;
      this.larguraForte = 14;
    }

    if (this.pontos == 25) {
      this.larguraFraca = 33;
      this.larguraMedia = 33;
      this.larguraForte = 34;
    }
  }

}