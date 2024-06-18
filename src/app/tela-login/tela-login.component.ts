import { Component } from '@angular/core';
import { BatalhaNavalService } from '../batalha-naval.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrl: './tela-login.component.css'
})
export class TelaLoginComponent {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  form: FormGroup = this.fb.group({
    login: ['', Validators.required],
    senha: ['', Validators.required]
  })

  constructor(private service: BatalhaNavalService, private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    this.hasUserSessionId();
  }

  login() {

    if (this.form.valid === false) {
      this.fnMsg("Preencha todos os campos antes de prosseguir!")
    } else {
      this.service.login(this.form.value).pipe(
        tap((res: any) => {

          if (res.sucessoLogin) {
            this.fnMsg(res.mensagem);
            sessionStorage.setItem('userId', res.usuarioId);
            sessionStorage.setItem('nivelAcesso', res.nivelAcesso);

            this.router.navigate(['/'])
          } else {
            this.fnMsg(res.mensagem);
          }
        })
      ).subscribe();
    }

  }

  fnGetEmail(e: any) {
    this.form.patchValue({
      login: e
    })
  }

  fnGetPassword(e: any) {
    this.form.patchValue({
      senha: e
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000
    });
  }

  hasUserSessionId() {
    var usuarioLogadoId = sessionStorage.getItem('userId');

    if (usuarioLogadoId !== null) {
      this.router.navigate(['/'])
    }
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
