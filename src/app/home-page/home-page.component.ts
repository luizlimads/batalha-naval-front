import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild, ViewRef } from '@angular/core';
import { BatalhaNavalService } from '../batalha-naval.service';
import { finalize, pipe, tap } from 'rxjs';
import { Router } from '@angular/router';
import { style } from '@angular/animations';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, OnDestroy {
  dataCategorias: any[] = [];
  dataItens: any[] = [];
  userData: any = null;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  open: boolean = false;
  // popupShop: boolean = false;
  // selectGuia: boolean = 

  sliderValueSound: number = 50; // Valor inicial dos sons
  sliderValueMusic: number = 0; // Valor inicial da musica

  compraAtual: any; //vai dizer se estou comprando moeda ou diamantes, é um objeto que tem valor e o preco

  somMenu = new Audio();
  somBtn = new Audio();
  somHomePage = new Audio();
  somHomePopup = new Audio();
  somCoin = new Audio();
  somEntraLoadingPre = new Audio();

  clotheSelected: any;
  activeTab: string = 'pacotes'; // A guia ativa do shop
  activeTabInvent: string = 'todos'; // guia ativa do inventario
  activeTabConf: string = 'perfil';
  activePopUp: string = '';

  guiasInvent: any[];


  usuarioLogadoId: any;

  itensCoins: any[];
  itensDiamonds: any[];
  itensPacotes: any[] = [];
  meusPacotes: any[] = [];

  larguraFraca = 0;
  larguraMedia = 0;
  larguraForte = 0;
  pontos = 0;
  icon = `<svg xmlns="http://www.w3.org/2000/svg" style="width: 22px; fill: green;" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" /></svg>`

  constructor(private service: BatalhaNavalService, private router: Router, private renderer: Renderer2) {
    this.somBtn.src = "../../assets/audios/sombtnbatalhar.wav";
    this.somHomePage.src = "../../assets/audios/SomHomePage.mp3";
    this.somHomePopup.src = "../../assets/audios/openpopup.mp3";
    this.somMenu.src = "../../assets/audios/somselecao.wav";
    this.somCoin.src = "../../assets/audios/somMoeda.mp3";
    this.somEntraLoadingPre.src = "../../assets/audios/somEntraLoadingPre.mp3"

    this.itensCoins = [
      { titulo: '1.000 Moedas', img: '../../assets/images/img-home-page/pctC1.png', preco: '100', valor: '1000' },
      { titulo: '5.000 Moedas', img: '../../assets/images/img-home-page/pctC2.png', preco: '200', valor: '5000' },
      { titulo: '10.000 Moedas', img: '../../assets/images/img-home-page/pctC3.png', preco: '400', valor: '10000' }
    ];
    this.itensDiamonds = [
      { titulo: '100 Diamantes', img: '../../assets/images/img-home-page/pctD1.png', preco: '1000', valor: '100' },
      { titulo: '500 Diamantes', img: '../../assets/images/img-home-page/pctD2.png', preco: '5000', valor: '500' },
      { titulo: '1.000 Diamantes', img: '../../assets/images/img-home-page/pctD3.png', preco: '10000', valor: '1000' }
    ];


    this.guiasInvent = [
      { titulo: 'Avatar', seletor: '1' },
      { titulo: 'Tema', seletor: '2' },
      { titulo: 'Embarcações', seletor: '3' },
    ];

    this.hasUserSessionId();
  }

  ngOnInit(): void {
    this.fnMusicHomePage();
    this.activeTab = 'moedas';
    this.activeTabInvent = 'todos';

    this.getPacotes();
  }

  ngOnDestroy() {
    // destroy audio here
    if (this.somHomePage) {
      this.somHomePage.pause();
      this.somHomePage = null!;
    }

  }

  ngAfterViewInit() {
    this.cancelClick = this.renderer.listen(document, 'click', this.FirstClick.bind(this));
  }

  private cancelClick!: Function;
  @ViewChild('audioPlayer', { static: false }) audioPlayerRef!: ElementRef;
  FirstClick() {
    this.cancelClick(); //tira o evento click do document
    this.fnRemoveAudioEmbed();
  }

  //função que remove a musica do fundo que ta no embed, criei separado pois vou chamar novamente quando user sair dessa tela
  fnRemoveAudioEmbed() {
    //remove a tag de audio embed e chama a função de audio homePage
    if (this.audioPlayerRef && this.audioPlayerRef.nativeElement) {
      const audioPlayer = this.audioPlayerRef.nativeElement;
      // Remove o ouvinte de evento após o primeiro movimento do mouse
      this.renderer.removeChild(audioPlayer.parentNode, audioPlayer);
      this.fnMusicHomePage();

      // Reproduz a música apenas após o primeiro movimento do mouse
    } else {
      console.error('audioPlayerRef or nativeElement is undefined');
    }

  }


  fnSomBtn() {
    this.somBtn.load();
    this.somBtn.volume = this.sliderValueSound / 100;
    this.somBtn.play().catch((error) => {
      // console.log('Error attempting to play the video:', error);
    });
  }

  fnSomCoin() {
    this.somCoin.load();
    this.somCoin.volume = this.sliderValueSound / 100;
    this.somCoin.play().catch((error) => {
      // console.log('Error attempting to play the video:', error);
    });
  }

  fnSomMenu() {
    this.somMenu.load();
    this.somMenu.volume = this.sliderValueSound / 100;
    this.somMenu.play().catch((error) => {
      // console.log('Error attempting to play the video:', error);
    }); // Inicia a reprodução do novo arquivo
  }

  fnSomHomePopup() {
    this.somHomePopup.load();
    this.somHomePopup.volume = this.sliderValueSound / 100;
    this.somHomePopup.play().catch((error) => {
      // console.log('Error attempting to play the video:', error);
    });
  }

  fnMusicHomePage() {
    // this.somHomePage.load();
    // this.somHomePage.volume = this.sliderValueMusic / 100;
    // this.somHomePage.play().catch((error) => {
    //   console.log('Error attempting to play the video:', error);
    // });

    if (this.somHomePage) {
      try {
        this.somHomePage.load();
        this.somHomePage.volume = this.sliderValueMusic / 100;
        this.somHomePage.play().catch((error) => {
          // console.error('Error attempting to play the audio:', error);
        });
      } catch (error) {
        console.error('Error while setting up the audio:', error);
      }
    } else {
      // console.error('somHomePage is null or undefined');
    }

  }

  fnSomLoadingPre() {
    this.somEntraLoadingPre.load();
    this.somEntraLoadingPre.volume = this.sliderValueSound / 100;
    this.somEntraLoadingPre.play().catch((error) => {
      // console.log('Error attempting to play the video:', error);
    });
  }

  fnConfirmOpenModalConfirm(preco: any, valor: any, type: any, tituloPacote = '', idPacote: any = null) {

    // console.log(preco, type, this.userData.moeda)
    if (type === "Diamante") {
      if (parseFloat(this.userData.diamante) < parseFloat(preco)) {

        this.fnMsg("Saldo insuficiente")
        return;
      }
    } else {
      if (parseFloat(this.userData.moeda) < parseFloat(preco)) {
        this.fnMsg("Saldo insuficiente")
        return;
      }
    }

    if (tituloPacote === '') {
      (document.getElementById("qtdCompraTitulo") as HTMLElement).innerHTML = `Quantidade de ${type === "Diamante" ? 'Moedas' : 'Diamantes'}: `;
      (document.getElementById("qtdCompra") as HTMLElement).innerHTML = this.formatarValor(valor);
    }
    else {
      (document.getElementById("qtdCompraTitulo") as HTMLElement).innerHTML = 'Pacote: ' + tituloPacote;
    }
    (document.getElementById("valorCompra") as HTMLElement).innerHTML = this.formatarValor(preco) + ` (${type}s)`;


    this.fnModalConfirm();

    this.compraAtual = { type: type, valor: valor, preco: preco, pacote: idPacote };

  }


  ActivePctInfo: boolean = false;
  timeoutId: any;
  pacoteSelected: any = {};

  fnInfoPacote(temaId: any) {// parei aqui

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.ActivePctInfo = false;

    this.timeoutId = setTimeout(() => {
      this.ActivePctInfo = true;  // Reabrir a div com novas informações
    }, 400);



    this.pacoteSelected = this.itensPacotes.find((pacote: any) => {
      if (pacote.temaId === temaId) {
        return pacote
      }
    })

    // console.log(this.pacoteSelected)

  }

  fnModalConfirm() {
    (document.querySelector(".shadow-modal-confirm") as HTMLElement).classList.toggle("active");
  }

  fnBuy() {
    if (this.compraAtual) {
      if (this.compraAtual.pacote !== null) {
        this.fnCompraPacote(this.compraAtual.pacote, this.compraAtual.preco, this.compraAtual.type);
        // this.fnBuyPacote(this.compraAtual.preco, this.compraAtual.type)
      } else {
        if (this.compraAtual.type === 'Diamante') {
          this.fnBuyMoeda(this.compraAtual.preco, this.compraAtual.valor);
        } else {
          this.fnBuyDiamante(this.compraAtual.preco, this.compraAtual.valor);
        }
      }
    }
  }

  fnBuyPacote(preco: any, tipoPagamento: any) {

    let valorAtual = 0;
    if (tipoPagamento === "Diamante") {
      valorAtual = this.userData.diamante;
      this.userData.diamante -= parseFloat(preco);

      this.myCalculator("principalDiamondValue", valorAtual, -parseFloat(preco));

      this.fnModalConfirm();

      this.open = false;

    } else if (tipoPagamento === "Moeda") {

      valorAtual = this.userData.moeda;
      this.userData.moeda -= parseFloat(preco);

      this.myCalculator("principalCoinsValue", valorAtual, -parseFloat(preco));

      this.fnModalConfirm();

      this.open = false;


    }
  }


  async fnBuyMoeda(preco: any, valor: any) {
    let valorAtual = this.userData.moeda;
    let valorNovoM = valorAtual + parseInt(valor);
    let valorNovoD = this.userData.diamante - parseInt(preco);

    let resultMoeda = await this.fnUpdateMoeda(valorNovoM);
    if (resultMoeda) {
      let resultDiamante = await this.fnUpdateDiamante(valorNovoD);

      if (resultDiamante) {
        (document.getElementById("principalDiamondValue") as HTMLElement).innerHTML = this.formatarValor(valorNovoD);

        this.myCalculator("principalCoinsValue", valorAtual, parseInt(valor));

        this.userData.diamante = valorNovoD;
        this.userData.moeda = valorNovoM;

        this.fnModalConfirm();

        this.open = false;
      }
    }
  }


  async fnBuyDiamante(preco: any, valor: any) {

    let valorAtual = this.userData.diamante;
    let valorNovoD = valorAtual + parseInt(valor);
    let valorNovoM = this.userData.moeda - parseInt(preco);

    let resultDiamante = await this.fnUpdateDiamante(valorNovoD);
    if (resultDiamante) {
      let resultMoeda = await this.fnUpdateMoeda(valorNovoM);

      if (resultMoeda) {
        (document.getElementById("principalCoinsValue") as HTMLElement).innerHTML = this.formatarValor(valorNovoM);

        this.myCalculator("principalDiamondValue", valorAtual, parseInt(valor));

        this.userData.diamante = valorNovoD;
        this.userData.moeda = valorNovoM;

        this.fnModalConfirm();

        this.open = false;
      }
    }

  }

  async fnUpdateMoeda(valor: any): Promise<boolean> {
    let result = false;
    const formData = new FormData();

    formData.append("valorMoeda", valor.toString());

    try {
      const res: any = await this.service.updateMoeda(this.usuarioLogadoId, formData).toPromise();
      if (res) {
        // this.fnMsg(res.mensagem, 'success')
        // this.open = false;
        result = true;
      } else {
        this.fnMsg(res.mensagem);
        result = false;
      }
    } catch (error) {
      console.error("Erro ao atualizar moeda:", error);
      this.fnMsg("Erro ao atualizar moeda");
      result = false;
    }

    return result;
  }

  async fnUpdateDiamante(valor: any): Promise<boolean> {
    let result = false;

    const formData = new FormData();
    formData.append("valorDiamante", valor.toString());

    try {
      const res: any = await this.service.updateDiamante(this.usuarioLogadoId, formData).toPromise();
      if (res) {
        result = true;
      } else {
        this.fnMsg(res.mensagem);
        result = false;
      }
    } catch (error) {
      console.error("Erro ao atualizar diamante:", error);
      this.fnMsg("Erro ao atualizar diamante");
      result = false;
    }

    return result;
  }



  myCalculator(id: any, start: any, end: any) {
    var duration = 1000;

    this.animateValue(id, start, end + start, duration); // remove .toLocaleString()
  }

  animateValue(id: any, start: any, end: any, duration: any) {
    var range = end - start;
    var current = start;
    var increment = end > start ? 10 : -10;

    var stepTime = Math.abs(Math.floor(duration / range));
    this.fnSomCoin();

    var timer = setInterval(function () {
      if (increment > 0) {
        if (current + increment >= end)
          increment = end - current
      }
      else {
        if (current + increment <= end)
          increment = end - current
      }
      current += increment;

      (document.getElementById(id) as HTMLElement).innerHTML = current.toLocaleString(); // add .toLocaleString() here
      if (current == end) {
        clearInterval(timer);
      }
    }, stepTime);

  }

  fnCompraPacote(temaId: any, temaValor: any, tipoPagamento: any) {

    this.service.comprarPacote(this.usuarioLogadoId, temaId).pipe(
      tap((res: any) => {
        if (res.sucesso) {
          this.fnMsg(res.mensagem, 'success')
          this.fnBuyPacote(temaValor, tipoPagamento);
          this.open = false;
          this.fnGetUserPacotes();
        } else {
          this.fnMsg(res.mensagem)
        }
      })
    ).subscribe()
  }



  imgTemaSelecionado: any = {};
  imgAvatarSelecionado: any = {};
  imgEmbarcacoesSelecionado: any = [];

  fnGetUserPacotes() {
    this.service.getUserPacotes(this.usuarioLogadoId).pipe(
      tap((res: any) => {
        this.meusPacotes = res;

        for (let pacote of this.meusPacotes) {
          if (pacote.temaId === this.userData.idTema)
            this.imgTemaSelecionado = pacote.fundoBase64;
        }

        for (let pacote of this.meusPacotes) {
          if (pacote.temaId === this.userData.idAvatar)
            this.imgAvatarSelecionado = pacote.avatarBase64;
        }

        for (let pacote of this.meusPacotes) {
          if (pacote.temaId === this.userData.idEmbarcacao) {
            this.imgEmbarcacoesSelecionado.push(pacote.barco1Base64);
            this.imgEmbarcacoesSelecionado.push(pacote.barco2Base64);
            this.imgEmbarcacoesSelecionado.push(pacote.barco3Base64);
            this.imgEmbarcacoesSelecionado.push(pacote.barco4Base64);
          }
        }
        // console.log(">>>>>",this.imgEmbarcacoesSelecionado)

      })
    ).subscribe();
  }


  fnCarregar() {
    this.fnSomLoadingPre();
    this.router.navigate(['/pre'])
  }

  hasUserSessionId() {
    this.usuarioLogadoId = sessionStorage.getItem('userId');

    if (this.usuarioLogadoId === null || this.usuarioLogadoId === undefined) {
      this.router.navigate(['login'])
    } else {
      this.getUser(this.usuarioLogadoId);
      this.getAllUsers();
    }

  }

  getUser(usuarioLogadoId: any) {
    this.service.getUser(usuarioLogadoId).pipe(
      tap((res: any) => {
        this.userData = res
        this.sliderValueMusic = this.userData.volumeMusica;
        this.sliderValueSound = this.userData.volumeSom;
        console.log(res)
        this.fnXP();
        this.fnGetUserPacotes();
      })
    ).subscribe();
  }

  updateValueSound(value = -1) {
    let volumeS = document.getElementById("soundVolumeInput") as HTMLInputElement;

    if (value < 0)
      this.sliderValueSound = parseInt(volumeS.value);
    else {
      this.sliderValueSound = value;
      volumeS.value = this.sliderValueSound.toString();
    }
  }

  updateValueMusic(value = -1) {
    let volumeM = document.getElementById("musicVolumeInput") as HTMLInputElement;

    if (value < 0)
      this.sliderValueMusic = parseInt(volumeM.value);
    else {
      this.sliderValueMusic = value;
      volumeM.value = this.sliderValueMusic.toString();
    }

    this.somHomePage.volume = this.sliderValueMusic / 100
  }

  fnSalvaConfSounds() {
    // console.log(this.sliderValueMusic.toString, this.sliderValueSound.toString)

    const formData = new FormData();

    formData.append("volumeSom", this.sliderValueSound.toString());
    formData.append("volumeMusica", this.sliderValueMusic.toString());

    this.service.updateVolumeUser(parseInt(this.userData.id), formData).pipe(
      tap((res: any) => {
        // console.log(res)
        if (res) {
          this.fnMsg("Alterações salvas com sucesso", "success")
          this.open = false;
        }
      })
    ).subscribe();
  }

  fnSelectUseItem(temaId: any, avatarId: any, embarcacaoId: any) {
    const formData = new FormData();

    formData.append("newTemaId", temaId);
    formData.append("newAvatarId", avatarId);
    formData.append("newEmbarcacoesId", embarcacaoId);

    this.service.updateUserTemaId(parseInt(this.usuarioLogadoId), formData).pipe(
      tap((res: any) => {
        // console.log(res)
        if (res) {
          this.getUser(this.usuarioLogadoId);
          this.fnGetUserPacotes();
          this.fnMsg("Item selecionado com sucesso", "success")
          this.open = false;
        }
      })
    ).subscribe();
  }

  fnOpenAlterSenha() {
    scroll(0, 0);
    let name = document.getElementById("nomeUser") as HTMLElement;

    // console.log(name.innerHTML);

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
    let txtNome = document.getElementById("txtName") as HTMLInputElement;

    if (txtNome.value === this.userData.nome && txtNome.value === "") {
      this.fnMsg("Nome inválido.");
    } else {
      const formData = new FormData();

      formData.append("novoNome", txtNome.value);

      this.service.updateNameUser(parseInt(this.userData.id), formData).pipe(
        tap((res: any) => {
          if (res) {
            this.fnMsg("Nome alterado com sucesso", "success")
            this.userData.nome = txtNome.value;
            this.fnFechaAlterNome();
          }
        })
      ).subscribe();
    }

    // faça a alteração nome
  }

  fnAlterSenha() {
    let oldPass = document.getElementById("txtSenhaAntiga") as HTMLInputElement;
    let newPass = document.getElementById("txtSenhaNova") as HTMLInputElement;
    let confirm = document.getElementById("txtComfirm") as HTMLInputElement;
    let passDica = document.querySelector('.pass-dica') as HTMLElement;

    //console.log(oldPass.value, newPass.value)
    if (oldPass.value !== this.userData.senha) {
      this.fnMsg("Senha atual não confere");
    } else if (oldPass.value === "" || newPass.value === "") {
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
      const formData = new FormData();

      formData.append("novaSenha", newPass.value);

      this.service.updateSenhaUser(parseInt(this.userData.id), formData).pipe(
        tap((res: any) => {
          if (res) {
            this.fnMsg("Senha alterada com sucesso", "success")
            this.userData.senha = newPass.value;
            this.open = false;
            this.pontos = 0;
            this.larguraFraca = 0;
            this.larguraMedia = 0;
            this.larguraForte = 0;
            oldPass.value = "";
            newPass.value = "";
            confirm.value = "";
          }
        })
      ).subscribe();

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
    sessionStorage.removeItem("userId");
    this.router.navigate(['/login']);
  }

  getPacotes() {
    this.service.getPacotes().pipe(
      tap((res: any) => {
        this.itensPacotes = res
        console.log(res)
      })
    ).subscribe();
  }

  fnFindImgAvatar(idTema: any) {
    let url = '';

    this.itensPacotes.find(pacote => {
      if (pacote.temaId === idTema) {
        url = pacote.avatarBase64;
      }
    })

    return url;
  }

  listUsers: any;
  getAllUsers() {
    this.service.getAllUsers().pipe(
      tap((res: any) => {
        this.listUsers = res;
        console.log(res);
      })
    ).subscribe();
  }

  openTabConf(tabName: any) {
    this.fnSomBtn();

    this.activeTabConf = tabName;
  }

  openTabInvent(tabName: string) {
    this.fnSomBtn();

    this.activeTabInvent = tabName;
    // Aqui você pode adicionar a lógica para exibir os itens da guia clicada
  }

  openTab(tabName: string) {
    this.fnSomBtn();

    this.activeTab = tabName;
    // Aqui você pode adicionar a lógica para exibir os itens da guia clicada
  }

  fnCloseModal() {
    this.fnSomHomePopup();
    this.open = false;
  }

  fnOpen(namePopup: string, guia: any = null) {
    this.ActivePctInfo = false; //fechar div de info dos pacotes
    this.activeTabConf = 'perfil'; // a guia ativa das confs
    this.activeTab = guia === null ? 'pacotes' : guia; // A guia ativa do shop
    this.activeTabInvent = 'todos'; // guia ativa do inventario
    this.fnSomHomePopup();
    this.open = !this.open;
    this.activePopUp = namePopup
  }

  playSoundSelecao() {
    this.fnSomMenu();
  }

  playSoundBtnBatalha() {
    this.fnSomBtn();
  }

  formatarValor(valor: any): string {
    // console.log('Valor recebido:', valor);
    valor = parseFloat(valor);

    return valor.toLocaleString('pt-BR');
  }

  fnXP() {
    let nVitorias = this.userData.vitorias;
    let nDerrotas = this.userData.derrotas;

    let xp = 100 * nVitorias + 5 * nDerrotas;

    let soma = 0
    let soma_anterior = 0
    let xp_prox = 0
    let nivel = 1

    for (nivel; soma <= xp; ++nivel) {
      xp_prox = nivel * 100
      soma += xp_prox
      soma_anterior = soma - xp_prox
    }
    nivel--

    let relacao = (xp - soma_anterior) / (xp_prox) * 100;

    // console.log(relacao);
    (document.querySelector(".status-xp") as HTMLElement).style.width = `${relacao}%`;
    (document.querySelector(".relacao-xp") as HTMLElement).innerHTML = `${xp - soma_anterior}/${xp_prox}`;
    (document.querySelector(".nivel") as HTMLElement).innerHTML = `${nivel}`;
  }

}
