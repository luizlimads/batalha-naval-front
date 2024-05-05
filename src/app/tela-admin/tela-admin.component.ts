import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BatalhaNavalService } from '../batalha-naval.service';
import { finalize, pipe, tap } from 'rxjs';


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
  categoriaDeleteId: any;
  itemDeleteId: any;
  deletedType: any = '';

  formCategoria: FormGroup = this.fb.group({
    id: [],
    titulo: [''],
    categoria: ['0']
  });

  formItem: FormGroup = this.fb.group({
    //imageUrl: ['']
    nome: [''],
    descricao: [''],
    valor: [''],
    ativo: [false],
    categoriaId: ['0'],
    tipoPagamento: ['0']
  });

  constructor(private fb: FormBuilder, private service: BatalhaNavalService) { }

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

  fnCloseModalCatg() {
    this.resetFormCatg();
    this.fnOpenModal();
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

    console.log(id)

    this.deletedType = "catg";

    this.categoriaDeleteId = id;

    (document.querySelector(".shadow-modal-confirm #txtQual") as HTMLInputElement).value = "Categoria";

    (document.querySelector(".shadow-modal-confirm p") as HTMLInputElement).innerHTML = "Deseja realmente excluir essa categoria?";


    this.fnModalConfirm();
  }

  fnApagaItem(id: any) {
    this.deletedType = "item";

    this.itemDeleteId = id;

    (document.querySelector(".shadow-modal-confirm #txtQual") as HTMLInputElement).value = "Item";

    (document.querySelector(".shadow-modal-confirm p") as HTMLInputElement).innerHTML = "Deseja realmente excluir esse item?";


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
    if (!this.formCategoria.dirty || this.formCategoria.value.categoria === '0') {
      this.fnMsg("Por favor, preencha todos os campos obrigatórios antes de prosseguir.")
    } else {

      var id = this.formCategoria.get('id')?.value;
      console.log(id)
      if (id !== null && id !== undefined && id !== '') {
        this.service.updateCategoria(this.formCategoria.value).pipe(
          finalize(() => this.getAllCategorias())
        ).subscribe();
      } else {
        this.service.postCategoria(this.formCategoria.value).pipe(
          finalize(() => this.getAllCategorias())
        ).subscribe();
      }

      let result = true;

      if (result) {
        this.fnMsg("Categoria inserida com sucesso", "success"); //mostrando msg para o user
        this.resetFormCatg(); //limpando os campos
        (document.querySelector(".shadow-modal-catg") as HTMLElement).classList.remove("active"); //fechando o mdodal

        this.getAllCategorias(); //atualizando na tela a nova categoria inserida
      } else {
        this.fnMsg("Erro ao tentar inserir a categoria");

      }
    }
  }

  getAllCategorias() {
    this.service.getAllCategorias().pipe(
      tap((res: any) => {
        this.dataCategorias = res
      }),
      finalize(() => {
        (document.getElementById("mainH") as HTMLElement).innerHTML = "Categorias - " + this.dataCategorias.length;

      })
    ).subscribe();


  }

  postItem() {

    if (!this.formItem.dirty || this.formItem.value.categoriaId === '0' || this.formItem.value.tipoPagamento === '0') {
      this.fnMsg("Por favor, preencha todos os campos obrigatórios antes de prosseguir.")
    } else {
      this.service.postItem(this.formItem.value).pipe(
        finalize(() => {
          this.getAllItems();
          this.fnResultItem(true);
        })
      ).subscribe();

    }

  }

  fnResultItem(result: boolean) {
    if (result) {
      this.fnMsg("Item inserido com sucesso", "success"); //mostra msg para o user
      this.resetFormItem(); //limpa os campos
      (document.querySelector(".shadow-modal-item") as HTMLElement).classList.remove("active"); //fecha o modal 
    } else {
      this.fnMsg("Erro ao tentar inserir o item");
    }
  }

  getAllItems() {

    this.service.getAllItems().pipe(
      tap((res: any) => {
        this.dataItens = res

      }),
      finalize(() => {
        (document.getElementById("mainH") as HTMLElement).innerHTML = "Itens - " + this.dataItens.length;

      })
    ).subscribe();


  }


  fnMsg(msg: any, tipoMsg = "error") {
    let msgAviso = document.getElementById("msgAviso") as HTMLElement;

    msgAviso.innerHTML = msg;

    if (tipoMsg == "success") {
      msgAviso.classList.remove("error");
      msgAviso.classList.add("success");

      setTimeout(function () {
        msgAviso.classList.remove("success");
      }, 5000); // A mensagem de erro desaparecerá após 5 segundos (5000 milissegundos)

    } else {
      msgAviso.classList.remove("success");
      msgAviso.classList.add("error");

      setTimeout(function () {
        msgAviso.classList.remove("error");
      }, 5000); // A mensagem de erro desaparecerá após 5 segundos (5000 milissegundos)

    }
  }

  resetFormItem() {
    this.formItem.reset({
      categoriaId: '0',
      tipoPagamento: '0'
    });
  }

  resetFormCatg() {
    this.formCategoria.reset({
      categoria: '0'
    });
  }

  delete() {

    console.log("entrei1", this.deletedType)
    if (this.deletedType === "item") {
      console.log("entrei2")

      this.service.deleteItem(this.itemDeleteId).pipe(
        finalize(() => {
          this.getAllItems();
          this.fnModalConfirm();
        })
      ).subscribe();

    }

    if (this.deletedType === "catg") {
      console.log("entrei3")

      this.service.deleteCategoria(this.categoriaDeleteId).pipe(
        finalize(() => {
          this.getAllCategorias();
          this.fnModalConfirm();
        })
      ).subscribe();
    }

  }

  openUpdateCategoria(categoriaId: number) {
    this.service.getCategoria(categoriaId).pipe(
      tap((res: any) => {

        if (res) {
          this.formCategoria.patchValue({
            titulo: res.titulo,
            categoria: res.categoria,
            id: res.id
          })
          this.fnOpenModal();
        }
      })
    ).subscribe();
  }
}