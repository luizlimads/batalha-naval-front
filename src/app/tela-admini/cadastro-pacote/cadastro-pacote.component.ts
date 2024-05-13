import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BatalhaNavalService } from '../../batalha-naval.service';
import { tap } from 'rxjs';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-cadastro-pacote',
  templateUrl: './cadastro-pacote.component.html',
  styleUrl: './cadastro-pacote.component.css'
})
export class CadastroPacoteComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  tema: FormGroup = this._formBuilder.group({
    nome: ['', Validators.required],
    tipoPagamento: ['', Validators.required],
    valor: ['', Validators.required],
    bloqWithoutImage: ['',  Validators.required]
  });

  avatar: FormGroup = this._formBuilder.group({
    nome: ['', Validators.required],
    bloqWithoutImage: ['',  Validators.required]
  });

  embarcacoes: FormGroup = this._formBuilder.group({
    nome: ['', Validators.required],
    bloqWithoutImage: ['',  Validators.required],
    bloqWithoutImage2: ['',  Validators.required],
    bloqWithoutImage3: ['',  Validators.required],
    bloqWithoutImage4: ['',  Validators.required],
    bloqWithoutImage5: ['',  Validators.required]
  });

  imageUrl: any;
  imageAvatarUrl: any;
  imageUrlBarco1: any;
  imageUrlBarco2: any;
  imageUrlBarco3: any;
  imageUrlBarco4: any;
  barcosFileUrl: any;

  fundoFile: any;
  avatarFile: any;
  barco4File: any;
  barco3File: any;
  barco2File: any;
  barco1File: any;
  barcosFile: any;

  @ViewChild('stepper') private myStepper!: MatStepper;

  constructor(private _formBuilder: FormBuilder, private service: BatalhaNavalService, private _snackBar: MatSnackBar) {}

  post() {
    const formData = new FormData();

    formData.append('imageFundo', this.fundoFile);
    formData.append('nomeTema', this.tema.get('nome')!.value);
    formData.append('tipoPagamento', this.tema.get('tipoPagamento')!.value);
    formData.append('valor', this.tema.get('valor')!.value);

    formData.append('imageAvatar', this.avatarFile);
    formData.append('nomeAvatar', this.avatar.get('nome')!.value);

    formData.append('barco4File', this.barco4File);
    formData.append('barco3File', this.barco3File);
    formData.append('barco2File', this.barco2File);
    formData.append('barco1File', this.barco1File);
    formData.append('barcosFile', this.barcosFile);
    formData.append('nomeEmbarcacoes', this.embarcacoes.get('nome')!.value);

    this.service.postPacote(formData).pipe(
      tap((res:any) => {
        if (res) {
          this.openSnackBar(res.message);

          if (res.created === true) {
            this.limparCampos();
          }
        }
      })
    ).subscribe();
  }

  fnChangeFile(event: any, tipo: any) {
    const file: File = event.target.files[0];

    if (tipo === 'fundo') {
      this.fundoFile = file;
      this.tema.get('bloqWithoutImage')?.clearValidators();
      this.tema.get('bloqWithoutImage')?.updateValueAndValidity();
    }

    if (tipo === 'avatar') {
      this.avatarFile = file;
      this.avatar.get('bloqWithoutImage')?.clearValidators();
      this.avatar.get('bloqWithoutImage')?.updateValueAndValidity();
    } 

    if (tipo === 'barco1') {
      this.barco1File = file;
      this.embarcacoes.get('bloqWithoutImage')?.clearValidators();
      this.embarcacoes.get('bloqWithoutImage')?.updateValueAndValidity();
    } 
    if (tipo === 'barco2') {
      this.barco2File = file;
      this.embarcacoes.get('bloqWithoutImage2')?.clearValidators();
      this.embarcacoes.get('bloqWithoutImage2')?.updateValueAndValidity();
    } 
    if (tipo === 'barco3') {
      this.barco3File = file;
      this.embarcacoes.get('bloqWithoutImage3')?.clearValidators();
      this.embarcacoes.get('bloqWithoutImage3')?.updateValueAndValidity();
    } 
    if (tipo === 'barco4') {
      this.barco4File = file;
      this.embarcacoes.get('bloqWithoutImage4')?.clearValidators();
      this.embarcacoes.get('bloqWithoutImage4')?.updateValueAndValidity();
    }
    if (tipo === 'barcosFile') {
      this.barcosFile = file;
      this.embarcacoes.get('bloqWithoutImage5')?.clearValidators();
      this.embarcacoes.get('bloqWithoutImage5')?.updateValueAndValidity();
    }

    let imgArea = document.querySelector(".img-area") as HTMLElement;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (tipo === 'fundo') this.imageUrl = reader.result;
        if (tipo === 'avatar') this.imageAvatarUrl = reader.result;
        if (tipo === 'barco1') this.imageUrlBarco1 = reader.result;
        if (tipo === 'barco2') this.imageUrlBarco2 = reader.result;
        if (tipo === 'barco3') this.imageUrlBarco3 = reader.result;
        if (tipo === 'barco4') this.imageUrlBarco4 = reader.result;
        if (tipo === 'barcosFile') this.barcosFileUrl = reader.result;

        imgArea.setAttribute("data-img", file.name);
        imgArea.classList.add("active")
      };
    }
  }

  fnSelectImage(tipo: any) {
    let inputFile = 
      tipo === 'avatar' ? document.getElementById("avatarFile") as HTMLElement :
      tipo === 'fundo' ? document.getElementById("fundoFile") as HTMLElement : 
      tipo === 'barco1' ? document.getElementById("barco1") as HTMLElement:
      tipo === 'barco2' ? document.getElementById("barco2") as HTMLElement:
      tipo === 'barco3' ? document.getElementById("barco3") as HTMLElement:
      tipo === 'barco4' ? document.getElementById("barco4") as HTMLElement:
      tipo === 'barcosFile' ? document.getElementById("barcosFile") as HTMLElement: null;

      inputFile!.click()
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 5000
    });
  }

  goBack(tipo: string) {
    if (tipo === 'avatar') {
      this.readFile(this.fundoFile, 'avatar');
    }

    if (tipo === 'embarcacoes') {
      this.readFile(this.avatarFile, 'embarcacoes');
    }

    this.myStepper.previous();
  }

  goForward(tipo: string) {
    if (tipo === 'tema') {
      this.readFile(this.avatarFile, 'tema');
    }

    if (tipo === 'avatar') {
      this.readFile(this.barco1File, 'barco1');
      this.readFile(this.barco2File, 'barco2');
      this.readFile(this.barco3File, 'barco3');
      this.readFile(this.barco4File, 'barco4');
      this.readFile(this.barcosFile, 'barcosFile');
    }

    this.myStepper.next();
  }

  readFile(file: any, type: string) {

    if (file === null || file === '' || file === undefined) {

      if (type === 'barco1') {
        this.imageUrlBarco1 = '';
      }

      if (type === 'barco2') {
        this.imageUrlBarco2 = '';
      }

      if (type === 'barco3') {
        this.imageUrlBarco3 = '';
      }

      if (type === 'barco4') {
        this.imageUrlBarco4 = '';
      }

      if (type === 'barcosFile') {
        this.barcosFileUrl = '';
      }

      if (type === 'tema') {
        this.imageAvatarUrl = '';
      }

      if (type === 'avatar') {
        this.imageUrl = '';
      }

      if (type === 'embarcacoes') {
        this.imageAvatarUrl = '';
      }
      
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {

      if (type === 'barco1') {
        this.imageUrlBarco1 = reader.result;
      }

      if (type === 'barco2') {
        this.imageUrlBarco2 = reader.result;
      }

      if (type === 'barco3') {
        this.imageUrlBarco3 = reader.result;
      }

      if (type === 'barco4') {
        this.imageUrlBarco4 = reader.result;
      }

      if (type === 'barcosFile') {
        this.barcosFileUrl = reader.result;
      }

      if (type === 'tema') {
        this.imageAvatarUrl = reader.result;
      }

      if (type === 'avatar') {
        this.imageUrl = reader.result;
      }

      if (type === 'embarcacoes') {
        this.imageAvatarUrl = reader.result;
      }
    };
  }

  limparCampos() {
    this.avatar.reset();
    this.tema.reset();
    this.embarcacoes.reset();
    
    this.imageUrl = '';
    this.imageAvatarUrl = '';
    this.imageUrlBarco1 = '';
    this.imageUrlBarco2 = '';
    this.imageUrlBarco3 = '';
    this.imageUrlBarco4 = '';
    this.barcosFileUrl = '';

    this.fundoFile = '';
    this.avatarFile = '';
    this.barco4File = '';
    this.barco3File = '';
    this.barco2File = '';
    this.barco1File = '';
    this.barcosFile = '';

    this.myStepper.reset();
  }
}
