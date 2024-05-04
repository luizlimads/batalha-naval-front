import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BatalhaNavalService } from '../batalha-naval.service';
import { tap } from 'rxjs';


@Component({
  selector: 'app-tela-admin',
  templateUrl: './tela-admin.component.html',
  styleUrl: './tela-admin.component.css',
})
export class TelaAdminComponent implements OnInit {
  open: boolean = true;
  categoriaSelected = false;
  itemSelected = false;
  dataCategorias: any[] = [];
  dataItens: any[] = [];
  imageUrl: string | ArrayBuffer | null = null;

  formCategoria: FormGroup = this.fb.group({
    titulo: [''],
    categoria: ['']
  });

  formItem: FormGroup = this.fb.group({
    //imageUrl: ['']
    nome: [''],
    descricao: [''],
    valor: [''],
    ativo: [false],
    categoriaId: [],
    tipoPagamento: ['']
  });

  constructor(private fb: FormBuilder, private service: BatalhaNavalService) {}

  ngOnInit(): void {
    this.getAllCategorias();
    this.getAllItems();
  }

  fnOpen() {
    this.open = !this.open;
  }

  fnShow(e: any) {
    const main = document.getElementById("main") as HTMLElement;
    const titleMain = document.getElementById("nomeColecao") as HTMLElement;
    const p = document.getElementById("mainP") as HTMLElement;
    const h = document.getElementById("mainH") as HTMLElement;

    main.style.display = "block";
    titleMain.innerHTML = e;
    p.innerHTML = "Adicionar " + e


    if (e.toLowerCase() === "categorias") {
      this.itemSelected = false;
      this.categoriaSelected = true;

      h.innerHTML = e + " - " + this.dataCategorias.length
    } else {
      this.categoriaSelected = false;
      this.itemSelected = true;

      h.innerHTML = e + " - " + this.dataItens.length
    }
  }


  fnOpenModal() {
    if (this.categoriaSelected) {
      let modalCategoria = document.querySelector(".shadow-modal-catg") as HTMLElement;

      modalCategoria.classList.toggle("active")
    } else if (this.itemSelected) {
      let modalItem = document.querySelector(".shadow-modal-item") as HTMLElement;

      modalItem.classList.toggle("active")
    }
  }


  fnApagaCatg(id: any) {
    // idCatg = e.currentTarget.id

    (document.querySelector(".shadow-modal-confirm #txtQual") as HTMLInputElement).value = "Categoria";

    (document.querySelector(".shadow-modal-confirm p") as HTMLInputElement).innerHTML = "Deseja realmente excluir essa categoria?";


    this.fnModalConfirm();
  }

  fnModalConfirm() {
    (document.querySelector(".shadow-modal-confirm") as HTMLElement).classList.toggle("active");

  }


  fnSelectImage() {
    let inputFile = document.getElementById("file") as HTMLElement;
    inputFile.click()
  }


  fnChangeFile(event: any) {
    const file: File = event.target.files[0];
    let imgArea = document.querySelector(".img-area") as HTMLElement;

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
        imgArea.setAttribute("data-img", file.name);
        imgArea.classList.add("active")
      };
    }
  }

  postCategoria() {
    //this.service.postCategoria(this.formCategoria.value).subscribe();
  }

  getAllCategorias() {
    //this.service.getAllCategorias().pipe(
     // tap((res:any) => {
   //     this.dataCategorias = res
    //  })
    //).subscribe();
  }

  postItem() {
   // this.service.postItem(this.formItem.value).subscribe();
  }

  getAllItems() {
    //this.service.getAllItems().pipe(
    //  tap((res:any) => {
    //    this.dataItens = res
    //  })
    //).subscribe();
  }
}