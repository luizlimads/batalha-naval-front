import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BatalhaNavalService } from '../batalha-naval.service';
import { finalize, pipe, tap } from 'rxjs';
import { Router } from '@angular/router';
import { style } from '@angular/animations';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  dataCategorias: any[] = [];
  dataItens: any[] = [];
  userData: any;

  open: boolean = false;
  // popupShop: boolean = false;
  // selectGuia: boolean = 
  alguma: boolean = true;
  somMenu: any = new Audio();
  somBtn: any = new Audio();
  somHomePage: any = new Audio();
  somHomePopup: any = new Audio();
  clotheSelected: any;
  activeTab: string = ''; // A guia ativa do shop
  activeTabInvent: string = 'todos'; // guia ativa do inventario
  activeTabConf: string = 'perfil';
  activePopUp: string = '';

  guiasInvent: any[];
  // guiasShop: any[];
  itensInvent: any[];
  // itensShop: any[];

  oAvatar: any;

  larguraFraca = 0;
  larguraMedia = 0;
  larguraForte = 0;
  pontos = 0;
  icon = `<svg xmlns="http://www.w3.org/2000/svg" style="width: 22px; fill: green;" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" /></svg>`


  constructor(private service: BatalhaNavalService, private router: Router) {
    this.somBtn.src = "../../assets/audios/sombtnbatalhar.wav";
    this.somHomePage.src = "../../assets/audios/SomHomePage.mp3";
    this.somHomePopup.src = "../../assets/audios/openpopup.mp3";
    this.somMenu.src = "../../assets/audios/somselecao.wav";

    this.guiasInvent = [
      { titulo: 'Camisas', seletor: 'shirt' },
      { titulo: 'Calças', seletor: 'pants' },
      { titulo: 'Chapeus', seletor: 'hat' },
      { titulo: 'Sapatos', seletor: 'shoes' },
    ];

    this.itensInvent = [
      { titulo: 'Chapeu1', categoria: 'hat', imgUrl: "../../assets/imagesAvatar/pirataPrincipalHat.png" },
      { titulo: 'Chapeu2', categoria: 'hat', imgUrl: "../../assets/imagesAvatar/pirataPrincipalHat2.png" },
      { titulo: 'Camisa1', categoria: 'shirt', imgUrl: "../../assets/imagesAvatar/pirataPrincipalShirt.png" },
      { titulo: 'Camisa2', categoria: 'shirt', imgUrl: "../../assets/imagesAvatar/pirataPrincipalShirt2.png" },
      { titulo: 'Calça1', categoria: 'pants', imgUrl: "../../assets/imagesAvatar/pirataPrincipalPants.png" },
      { titulo: 'Calça2', categoria: 'pants', imgUrl: "../../assets/imagesAvatar/pirataPrincipalPants2.png" },
      { titulo: 'Sapatos1', categoria: 'shoes', imgUrl: "../../assets/imagesAvatar/pirataPrincipalShoes.png" },
      { titulo: 'Sapatos2', categoria: 'shoes', imgUrl: "../../assets/imagesAvatar/pirataPrincipalShoes2.png" },
    ];

    this.oAvatar = {};


    for (let element of this.guiasInvent) {
      this.oAvatar[element.seletor] = '';
    }

    console.log(this.oAvatar);


    // this.hasUserSessionId();
  }


  ngOnInit(): void {
    this.activeTab = 'moedas';
    this.activeTabInvent = 'todos';
    // this.somHomePage.play()
    // this.somHomePage.volume = 0.2;


    this.getAllCategorias();
    this.getAllItems();
  }

  fnCarregar(){
    this.router.navigate(['carr'])

  }

  hasUserSessionId() {
    var usuarioLogadoId = sessionStorage.getItem('userId');

    if (usuarioLogadoId === null) {
      this.router.navigate(['login'])
    } else {
      this.getUser(usuarioLogadoId);
    }

    //sessionStorage.removeItem("key");
  }

  getUser(usuarioLogadoId: any) {
    this.service.getUser(usuarioLogadoId).pipe(
      tap((res: any) => {
        this.userData = res
      })
    ).subscribe();
  }

  getAllCategorias() {
    // this.service.getAllCategorias().pipe(
    //   tap((res: any) => {
    //     this.dataCategorias = res
    //   }),
    //   finalize(() => {
    //     // (document.getElementById("mainH") as HTMLElement).innerHTML = "Categorias - " + this.dataCategorias.length;
    //     console.log(this.dataCategorias)

    //   })
    // ).subscribe();


  }

  getAllItems() {

    // this.service.getAllItems().pipe(
    //   tap((res: any) => {
    //     this.dataItens = res

    //   }),
    //   finalize(() => {
    //     // (document.getElementById("mainH") as HTMLElement).innerHTML = "Itens - " + this.dataItens.length;
    //     console.log(this.dataItens)
    //   })
    // ).subscribe();


  }


  fnSelectedClothe(item: any) {
    console.log(item);

    let element = document.getElementById(item.categoria) as HTMLElement;



    if (this.oAvatar[item.categoria] == item.titulo) {
      this.oAvatar[item.categoria] = '';
      element.style.backgroundImage = '';
    }
    else {
      this.oAvatar[item.categoria] = item.titulo;
      element.style.backgroundImage = `url(${item.imgUrl})`;
    }

    console.log(element.style.backgroundImage);

    console.log(this.oAvatar)

  }

  fnOpenAlterSenha() {
    scroll(0, 0);
    let name = document.getElementById("nomeUser") as HTMLElement;

    console.log(name.innerHTML);

    (document.getElementById("divName") as HTMLElement).style.display = "none";
    (document.getElementById("divAlter") as HTMLElement).style.display = "flex";
    let txtNome = document.getElementById("txtName") as HTMLInputElement;

    txtNome.value = name.innerHTML;
  }


  fnFechaAlterNome() {
    (document.getElementById("divName") as HTMLElement).style.display = "flex";
    (document.getElementById("divAlter") as HTMLElement).style.display = "none";
  }

  fnSalvaNovoNome() {
    let txtNome = document.getElementById("txtName") as HTMLElement

    // faça a alteração nome
  }

  fnAlterSenha() {
    let oldPass = document.getElementById("txtSenhaAntiga") as HTMLInputElement;
    let newPass = document.getElementById("txtSenhaNova") as HTMLInputElement;
    let confirm = document.getElementById("txtComfirm") as HTMLInputElement;
    let passDica = document.querySelector('.pass-dica') as HTMLElement;

    console.log(oldPass.value, newPass.value)
    if (oldPass.value === "" || newPass.value === "") {
      this.fnMsg("Os campos de senha não podem estar vazios!")
    } else if (confirm.value !== newPass.value) {
      this.fnMsg("Senhas não conferem.")
    } else if (oldPass.value === newPass.value) {
      this.fnMsg("Sua senha nova deve ser diferente da anterior!")
    } else if (this.pontos !== 25) {
      this.fnMsg("Senha nova não é forte o suficiente!")
      this.fnDica()

      passDica.classList.add("treme")
      setTimeout(() => {
        this.fnDica()
        passDica.classList.remove("treme")
      }, 3000);

    } else {
      alert("foi")
      // fnReqSenhaUsuario()
      // SALVA A SENHA
    }
  }

  fnDica() {
    (document.querySelector(".msg-dica") as HTMLElement).classList.toggle("open")
  }

  fnStatusPass(e: any) {

    let valorInput = e.currentTarget.value;

    (document.getElementById("eig") as HTMLElement).innerHTML = "6 caracteres;";
    (document.getElementById("num") as HTMLElement).innerHTML = "1 número;";
    (document.getElementById("min") as HTMLElement).innerHTML = "1 letra minúscula;";
    (document.getElementById("mai") as HTMLElement).innerHTML = "1 letra maiúscula;";
    (document.getElementById("esp") as HTMLElement).innerHTML = "1 caracter especial.";

    this.pontos = 0;

    const min = /[a-z]/;
    const mai = /[A-Z]/;
    const num = /[0-9]/;
    const esp = /\W|_/;

    if (valorInput.length >= 6) {
      this.pontos += 5;
      (document.getElementById("eig") as HTMLElement).innerHTML += this.icon;
    }

    if (min.test(valorInput)) {
      this.pontos += 5;
      (document.getElementById("min") as HTMLElement).innerHTML += this.icon;
    }

    if (mai.test(valorInput)) {
      this.pontos += 5;
      (document.getElementById("mai") as HTMLElement).innerHTML += this.icon;

    }

    if (num.test(valorInput)) {
      this.pontos += 5;
      (document.getElementById("num") as HTMLElement).innerHTML += this.icon;

    }

    if (esp.test(valorInput)) {
      this.pontos += 5;
      (document.getElementById("esp") as HTMLElement).innerHTML += this.icon;
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

    // this.form.patchValue({
    //   senha: e.text
    // })    
  }

  fnMsg(msg: any, clss = "error") {
    let msgErro = document.getElementById("msgAviso") as HTMLElement;

    msgErro.innerHTML = msg

    if (clss == "success") {
      msgErro.classList.remove("error")
      msgErro.classList.add("success")
      setTimeout(function () {
        msgErro.classList.remove("success")
      }, 5000); // A mensagem de erro desaparecerá após 5 segundos (5000 milissegundos)
    } else {
      msgErro.classList.remove("success")
      msgErro.classList.add("error")
      setTimeout(function () {
        msgErro.classList.remove("error")
      }, 5000); // A mensagem de erro desaparecerá após 5 segundos (5000 milissegundos)
    }
  }

  fnLogout() {
    sessionStorage.removeItem("key");
  }



  openTabConf(tabName: any) {
    console.log(tabName)
    this.somBtn.play();

    this.activeTabConf = tabName;
  }

  openTabInvent(tabName: string) {
    console.log(tabName)
    this.somBtn.play();

    this.activeTabInvent = tabName;
    // Aqui você pode adicionar a lógica para exibir os itens da guia clicada
  }


  openTab(tabName: string) {
    this.somBtn.play();

    this.activeTab = tabName;
    // Aqui você pode adicionar a lógica para exibir os itens da guia clicada
  }

  fnOpen(namePopup: string) {
    this.somHomePopup.play();
    this.open = !this.open;
    this.activePopUp = namePopup
  }

  playSoundSelecao() {
    this.somMenu.play(); // Inicia a reprodução do novo arquivo
  }

  playSoundBtnBatalha() {
    this.somBtn.play();
  }

  formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    // return valor.toFixed(2).replace('.', ','); // Formata para duas casas decimais e substitui ponto por vírgula
  }
}
