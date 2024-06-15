import { Element } from '@angular/compiler';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BatalhaNavalService } from '../batalha-naval.service';
import { finalize, tap } from 'rxjs';
import { Router } from '@angular/router';

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
  password: string | null = null;
  resetForm = false;
  icon = `<svg xmlns="http://www.w3.org/2000/svg" style="width: 22px; fill: green;" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" /></svg>`

  @ViewChild('eig') oEig!: ElementRef;
  @ViewChild('num') oNum!: ElementRef;
  @ViewChild('min') oMin!: ElementRef;
  @ViewChild('mai') oMai!: ElementRef;
  @ViewChild('esp') oEsp!: ElementRef;

  form: FormGroup = this.fb.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    senha: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private service: BatalhaNavalService, private router: Router) {
    this.hasUserSessionId();
  }  

  onKeydown(event: any) {
    console.log(event);
  }

  hasUserSessionId() {
    var usuarioLogadoId = sessionStorage.getItem('userId');

    if (usuarioLogadoId !== null) {
      this.router.navigate(['/']);
    } 
  }

  fnDica() {
    this.dica = !this.dica;
  }

  fnGetName(e: any) {
    this.form.patchValue({
      nome: e
    })
  }

  fnGetEmail(e: any) {
    this.form.patchValue({
      email: e
    })
  }

  fnGetPassword(e: any)  {
    this.password = e;
  }

  sendFormData() {
    // comentar essa linha para n dar erro ao fazer req

    if(this.fnValidate()) {
      //---------------------
      //---------------------
     this.service.postUser(this.form.value).pipe(
      tap((res: any)=>{
        //colocar popup de cadastrado
        this.fnMsg("Usuario cadastrado com sucesso!", "success");
        sessionStorage.setItem('userId', res.id);
        this.router.navigate(['/']);
        
      }),
       finalize(() => {
        this.resetForms();
       })
       
      ).subscribe();
    }
  }

  resetForms() {
    this.form.reset();
    this.password = null;
    this.resetForm = true;
    this.pontos = 0;
  }

  fnValidate() {
    let passDica = document.querySelector('.pass-dica') as HTMLElement;

    if (this.form.invalid || this.password === null) {
      this.fnMsg('Por favor, preencha todos os campos obrigatórios antes de prosseguir.');
      return false;
    }

    if (this.pontos < 25) {
      this.fnMsg('Senha não é forte o suficiente!')
      this.fnDica()

      passDica.classList.add("treme")
      setTimeout(() => {
        this.fnDica()
        passDica.classList.remove("treme")
      }, 3000);
      return false;
    }

    if (this.password !== this.form.get('senha')?.value) {
      this.fnMsg('Senhas não conferem.')
      return false;
    }

    return true;
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

    this.form.patchValue({
      senha: e.text
    })    
  }


  fnMsg(msg: any, clss = "error") {
    let msgErro = document.getElementById("msgAviso") as HTMLElement;

    msgErro.innerHTML = msg

    if (clss == "success") {
      msgErro.classList.remove("error")
      msgErro.classList.add("success")
      setTimeout(function () {
        msgErro.classList.remove("success")
      }, 4000); // A mensagem de erro desaparecerá após 5 segundos (5000 milissegundos)
    } else {
      msgErro.classList.remove("success")
      msgErro.classList.add("error")
      setTimeout(function () {
        msgErro.classList.remove("error")
      }, 4000); // A mensagem de erro desaparecerá após 5 segundos (5000 milissegundos)
    }
  }
}
