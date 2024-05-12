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

  ngOnInit(): void {
    this.fnGetTeste();
  }

  constructor(private fb: FormBuilder, private service: BatalhaNavalService) { }

  fnOpenAside() {
    this.openAside = !this.openAside;
  }

  fnShowScreem(e: any) {

    this.optionSelected = e;

    const main = document.getElementById("main") as HTMLElement;
    const titleMain = document.getElementById("nomeColecao") as HTMLElement;
    const p = document.getElementById("mainP") as HTMLElement;
    const h = document.getElementById("mainH") as HTMLElement;

    main.style.display = "block";
    titleMain.innerHTML = e;
    p.innerHTML = "Adicionar " + e;

    h.innerHTML = e;


    if (e.toLowerCase() === "") {
      h.innerHTML = e + " - " + this.dataCategorias.length;
    } else {
      h.innerHTML = e + " - " + this.dataItens.length;
    }
  }


  fnUpdateItem(id: any){

  }
  
  fnDeleteItem(id: any){
    
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


    this.service.postTeste(formData).pipe(
      finalize(() => {
        console.log('sfoi')
      })
    ).subscribe();


    // this.service.getTeste()  

  }
  
}
