import { Component } from '@angular/core';
import { BatalhaNavalService } from '../batalha-naval.service';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    login: [''],
    senha: ['']
  })

  constructor(private service: BatalhaNavalService, private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    this.hasUserSessionId();
  }

  login() {
    this.service.login(this.form.value).pipe(
      tap((res:any) => {

        this.openSnackBar(res.mensagem);
        
        if(res.sucessoLogin){
          sessionStorage.setItem('userId', res.usuarioId);
          this.router.navigate(['/'])
        }
      })
    ).subscribe();
  }

  fnGetEmail(e: any) {
    this.form.patchValue({
      login: e
    })
  }

  fnGetPassword(e: any)  {
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

}
