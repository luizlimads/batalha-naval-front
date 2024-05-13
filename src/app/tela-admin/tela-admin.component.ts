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
  file: any;

  formCategoria: FormGroup = this.fb.group({
    id: [],
    titulo: [''],
    categoria: ['0']
  });

  formItem: FormGroup = this.fb.group({
    id: [],
    nome: [''],
    descricao: [''],
    valor: ['0'],
    ativo: [true],
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

  fnCloseModalItem() {
    this.resetFormItem();
    this.fnOpenModal();
  }

  fnOpenModal(trocaTexto = true) {
    if (this.categoriaSelected) {
      let modalCategoria = document.querySelector(".shadow-modal-catg") as HTMLElement;

      modalCategoria.classList.toggle("active")


      if (trocaTexto) {
        (document.querySelector(".modal-catg-form h1") as HTMLElement).innerHTML = "Vamos criar uma <br />Categoria?";
        (document.getElementById("btnAddCatg") as HTMLElement).innerHTML = "Criar";

      }
    } else if (this.itemSelected) {
      let modalItem = document.querySelector(".shadow-modal-item") as HTMLElement;

      modalItem.classList.toggle("active")

      if (trocaTexto) {
        (document.querySelector(".modal-item-form h1") as HTMLElement).innerHTML = "Crie o seu novo Item";
        (document.getElementById("btnAddItem") as HTMLElement).innerHTML = "Criar";
      }
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
    this.file = file;

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

      // if (id !== null && id !== undefined && id !== '') {
      //   this.service.updateCategoria(this.formCategoria.value).pipe(
      //     finalize(() => this.getAllCategorias())
      //   ).subscribe();
      // } else {
      //   this.service.postCategoria(this.formCategoria.value).pipe(
      //     finalize(() => this.getAllCategorias())
      //   ).subscribe();
      // }

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
    // this.service.getAllCategorias().pipe(
    //   tap((res: any) => {
    //     this.dataCategorias = res
    //   }),
    //   finalize(() => {
    //     (document.getElementById("mainH") as HTMLElement).innerHTML = "Categorias - " + this.dataCategorias.length;

    //   })
    // ).subscribe();


  }

  postItem() {
    console.log(this.formItem.value, !this.formItem.dirty);
    console.log(this.formItem.value.categoriaId, this.formItem.value.tipoPagamento)
    console.log("image", this.file)

    if (this?.file === undefined || !this.formItem.dirty || this.formItem.value.categoriaId === '0' || this.formItem.value.tipoPagamento === '0') {
      this.fnMsg("Por favor, preencha todos os campos obrigatórios antes de prosseguir.")
    } else {

      const formData = new FormData();

      console.log(this.file)
      formData.append('image', this.file);
      formData.append('descricao', this.formItem.get('descricao')!.value);
      formData.append('valor', this.formItem.get('valor')!.value);
      formData.append('nome', this.formItem.get('nome')!.value);
      formData.append('ativo', this.formItem.get('ativo')!.value);
      formData.append('categoriaId', this.formItem.get('categoriaId')!.value);
      formData.append('tipoPagamento', this.formItem.get('tipoPagamento')!.value);

      var id = this.formItem.get('id')?.value;


      // if (id !== null && id !== undefined && id !== '') {
      //   formData.append('id', this.formItem.get('id')!.value)
      //   this.service.updateItem(formData).pipe(
      //     finalize(() => { this.getAllItems(); this.fnResultItem(true, true); })
      //   ).subscribe();
      // } else {
      //   this.service.postItem(formData).pipe(
      //     finalize(() => { this.getAllItems(); this.fnResultItem(true); })
      //   ).subscribe();
      // }

    }

  }

  fnResultItem(result: boolean, update = false) {
    if (result) {

      if (update)
        this.fnMsg("Item atualizado com sucesso", "success"); //mostra msg para o user
      else
        this.fnMsg("Item inserido com sucesso", "success"); //mostra msg para o user

      this.resetFormItem(); //limpa os campos
      (document.querySelector(".shadow-modal-item") as HTMLElement).classList.remove("active"); //fecha o modal 
    } else {
      this.fnMsg("Erro ao tentar inserir o item");
    }
  }

  getAllItems() {

    // this.service.getAllItems().pipe(
    //   tap((res: any) => {
    //     this.dataItens = res

    //   }),
    //   finalize(() => {
    //     (document.getElementById("mainH") as HTMLElement).innerHTML = "Itens - " + this.dataItens.length;
    //     console.log(this.dataItens)
    //   })
    // ).subscribe();


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
      tipoPagamento: '0',
      ativo: true
    });

    this.imageUrl = "";
    (document.querySelector(".img-area") as HTMLElement).setAttribute("data-img", "");
    (document.querySelector(".img-area") as HTMLElement).classList.remove("active");

  }

  resetFormCatg() {
    this.formCategoria.reset({
      categoria: '0'
    });
  }

  delete() {

    // if (this.deletedType === "item") {

    //   this.service.deleteItem(this.itemDeleteId).pipe(
    //     finalize(() => {
    //       this.getAllItems();
    //       this.fnModalConfirm();
    //     })
    //   ).subscribe();

    // }

    // if (this.deletedType === "catg") {

    //   this.service.deleteCategoria(this.categoriaDeleteId).pipe(
    //     finalize(() => {
    //       this.getAllCategorias();
    //       this.fnModalConfirm();
    //     })
    //   ).subscribe();
    // }

  }

  openUpdateCategoria(categoriaId: number) {
    // this.service.getCategoria(categoriaId).pipe(
    //   tap((res: any) => {
    //     if (res) {
    //       this.formCategoria.patchValue({
    //         titulo: res.titulo,
    //         categoria: res.categoria,
    //         id: res.id
    //       });



    //     }
    //   }),
    //   finalize(() => {
    //     (document.querySelector(".modal-catg-form h1") as HTMLElement).innerHTML = "Alterar categoria";
    //     (document.getElementById("btnAddCatg") as HTMLElement).innerHTML = "Alterar";

    //     this.fnOpenModal(false);
    //   })
    // ).subscribe();
  }

  openUpdateItem(itemId: number) {
    // this.service.getItem(itemId).pipe(
    //   tap((res: any) => {
    //     this.formItem.patchValue({
    //       id: res.id,
    //       nome: res.nome,
    //       descricao: res.descricao,
    //       valor: res.valor,
    //       ativo: res.ativo,
    //       categoriaId: res.categoriaId,
    //       tipoPagamento: res.tipoPagamento
    //     });
    //     this.imageUrl = 'data:image/jpg;base64,' + res.imageData;
    //     const imageBlob = this.dataURItoBlob(res.imageData);

    //     this.file = new File([imageBlob], 'img.png', { type: 'image/png' });


    //   }),
    //   finalize(() => {

    //     (document.querySelector(".img-area") as HTMLElement).setAttribute("data-img", "img.png");
    //     (document.querySelector(".img-area") as HTMLElement).classList.add("active");

    //     (document.querySelector(".modal-item-form h1") as HTMLElement).innerHTML = "Alterar item";
    //     (document.getElementById("btnAddItem") as HTMLElement).innerHTML = "Alterar";

    //     this.fnOpenModal(false);
    //   })
    // ).subscribe();
  }

  dataURItoBlob(dataURI: any) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
  }


  fnOpenDescItem(e: any) {
    (document.querySelector(".task-body-descricao") as HTMLElement).classList.toggle("open")
    console.log(e.currentTarget.parentNode.parentNode)

    let divBodyContent = e.currentTarget.parentNode.parentNode.parentNode;


    console.log(divBodyContent.querySelector(".task-body-descricao"))

    
    let desc = divBodyContent.querySelector(".task-body-descricao").classList.toggle("open")


  }

  formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    // return valor.toFixed(2).replace('.', ','); // Formata para duas casas decimais e substitui ponto por vírgula
  }

}