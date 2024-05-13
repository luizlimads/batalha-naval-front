import { Component, OnInit } from '@angular/core';
import { BatalhaNavalService } from '../batalha-naval.service';
import { finalize, pipe, tap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-tela-admini',
  templateUrl: './tela-admini.component.html',
  styleUrl: './tela-admini.component.css'
})
export class TelaAdminiComponent implements OnInit {
  openAside: boolean = true;
  optionSelected: any = "";
  dataCategorias: any[] = [];
  dataItens: any[] = [];
  res: any = '';

  constructor(private fb: FormBuilder, private service: BatalhaNavalService) { }

  ngOnInit(): void {
    this.getPacotes();
  }

  getPacotes() {
    this.service.getPacotes().pipe(
      tap((res:any) => {
        this.dataItens = res
      })
    ).subscribe();
  }

  fnOpenAside() {
    this.openAside = !this.openAside;
  }

  fnShowScreem(e: any) {

    this.optionSelected = e;

    const main = document.getElementById("main") as HTMLElement;
    const mainContent = document.querySelector(".main-content") as HTMLElement;
    const cadastroContent = document.querySelector(".cadastro") as HTMLElement;

    const titleMain = document.getElementById("nomeColecao") as HTMLElement;
    const h = document.getElementById("mainH") as HTMLElement;

    main.style.display = "block";
    titleMain.innerHTML = e;

    h.innerHTML = e;
    console.log(e.toLowerCase())
    if (e.toLowerCase() === "pacotes") {
      mainContent.style.display = "flex";
      cadastroContent.style.display = "none";
      h.innerHTML = e + " - " + this.dataItens.length;
    } else {
      mainContent.style.display = "none";
      cadastroContent.style.display = "block";
      h.innerHTML = e + " - " + this.dataItens.length;
    }
  }

  fnUpdateItem(id: any){

  }
  
  fnDeleteItem(id: any){
    this.service.deleteTema(id).pipe(
      finalize(() => this.getPacotes())
    ).subscribe();
  }

  fnOpenUpdateCategoria(id: any){

  }

  fnDeleteCatg(id: any){

  }

  form: FormGroup = this.fb.group({
   // id: [],
    nome: ['teste'],
    descricao: ['teste'],
   // valor: ['0'],
    ativo: [true],
    tipoPagamento: ['0']
  });

  fnGetTeste() {
    // this.service.getTeste().pipe(
    //   tap((res: any) => {
    //     this.res = res;
    //   }),
    //   finalize(() => {
    //     //  faça algo ao finalizar a requisição
    //     console.log(this.res);
    //   })
    // ).subscribe();

    const formData = new FormData();

      // console.log(this.file)
      // formData.append('image', this.file);
      formData.append('descricao', this.form.get('descricao')!.value);
      // formData.append('valor', this.formItem.get('valor')!.value);
      formData.append('nome', this.form.get('nome')!.value);
      formData.append('ativo', this.form.get('ativo')!.value);
      // formData.append('categoriaId', this.formItem.get('categoriaId')!.value);
      formData.append('tipoPagamento', this.form.get('tipoPagamento')!.value);
    // this.service.getTeste()  

  }
  
  formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  }
}
