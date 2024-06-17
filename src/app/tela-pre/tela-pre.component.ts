import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Navio, Tile, Mina } from '../navio';
import { finalize, pipe, tap } from 'rxjs';
import { GiraImgs } from '../gira-imgs';
import { BatalhaNavalService } from '../batalha-naval.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-pre',
  templateUrl: './tela-pre.component.html',
  styleUrl: './tela-pre.component.css',

})
export class TelaPreComponent implements OnInit, OnDestroy {
  // canvas!: any;
  // ctx!: any;
  @ViewChild('canvasAux', { static: false }) canvasAux!: ElementRef<HTMLCanvasElement>;
  private girarImgs!: GiraImgs;

  @ViewChild('board', { static: true }) myCanvas!: ElementRef;

  // canvas!: HTMLCanvasElement;
  // ctx!: CanvasRenderingContext2D;

  nTilesX: any = 10;
  // Número de linhas
  nTilesY: any = 10;

  // Tamanho do navio
  shipSize: any = 3;

  // tamanho Tile
  sizeTiles: any = 50;

  // espaço navios
  sizeSpaceShip: any = 10 * (this.sizeTiles + 1);

  imagens: any = [];
  imagemMina: any;

  update: boolean = true; // if true redraw

  tiles: Tile[] = [];

  // Criando o array de navios
  navios: Navio[] = [];

  navioOver!: Navio | null;
  navioSelecionado!: Navio | null;

  dragok = false;
  x: any;
  y: any;

  xAnterior: any;
  yAnterior: any;

  tabuleiro: any[] = [];
  private webSocket!: WebSocket;
  public messages: any[] = [];
  public message: string = '';

  somMar: any = new Audio();
  somBtn = new Audio();
  somLoadingJogar = new Audio();
  somEntraLoadingPre = new Audio();
  sliderValueSound: any = 50;
  sliderValueMusic: any = 20;

  hour: number = 0;
  minute: number = 0;
  second: number = 0;
  millisecond: number = 0;
  cron!: any;

  openShadow: boolean = false;
  usuarioLogadoId: any;



  constructor(private router: Router, private service: BatalhaNavalService, private renderer: Renderer2) {
    this.somMar.src = "../../assets/audios/somMarPirata.mp3";
    this.somBtn.src = "../../assets/audios/sombtnbatalhar.wav";
    this.somLoadingJogar.src = "../../assets/audios/somSaiLoadingPre.mp3";
    this.somEntraLoadingPre.src = "../../assets/audios/somEntraLoadingPre.mp3"
    this.hasUserSessionId();

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

    this.fnSomMar();
  }

  ngOnInit(): void {

    this.renderer.setStyle(document.body, 'overflow', 'hidden');

    this.navios.push(this.criarNavio(4, 1, 1)); // 1 navio de 4 casas

    this.navios.push(this.criarNavio(3, 6, 1)); // 1 navio de 3 casas
    this.navios.push(this.criarNavio(3, 1, 3)); // 1 navio de 3 casas
    this.navios.push(this.criarNavio(3, 5, 3)); // 1 navio de 3 casas

    this.navios.push(this.criarNavio(2, 1, 5)); // 1 navio de 2 casas
    this.navios.push(this.criarNavio(2, 4, 5)); // 1 navio de 2 casas
    this.navios.push(this.criarNavio(2, 7, 5)); // 1 navio de 2 casas

    this.navios.push(this.criarNavio(1, 1, 7)); // 1 navio de 1 casas
    this.navios.push(this.criarNavio(1, 3, 7)); // 1 navio de 1 casas

    this.navios.push(this.criarMina(5, 7));
    this.navios.push(this.criarMina(7, 7));
    this.navios.push(this.criarMina(9, 7));

    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {

      // carregando a imagem das minas
      let imgMina = new Image();
      imgMina.src = '../../assets/img/mina.png';
      this.imagemMina = imgMina

      this.imagemMina.onload = () => {
        ctx.drawImage(imgMina, 0, 0);
      }


      this.intervalo = setInterval(() => {

        if (this.naviosCarregados) {
          this.fnDraw(ctx);

          //posso tirar o onloading
          (document.querySelector(".fundo-loading") as HTMLElement).style.display = "none";
          clearInterval(this.intervalo)
          this.fnSomMar();
          // this.startCrono();
        }

      }, 1000);
    }
  }

  intervalo: any;
  fnSomLoadingPre() {
    this.somEntraLoadingPre.load();
    this.somEntraLoadingPre.volume = this.sliderValueMusic / 100;
    this.somEntraLoadingPre.play().catch((error) => {
      // console.log('Error attempting to play the video:', error);
    });
  }

  ngOnDestroy(): void {
    this.renderer.removeStyle(document.body, 'overflow');
    clearInterval(this.intervalo);
    if (this.somMar) {
      this.somMar.pause();
      this.somMar = null!;
    }
  }

  //tinha um async aqui
  ngAfterViewInit() {

    const canvasEl = this.myCanvas.nativeElement;
    this.renderer.listen(canvasEl, 'mousedown', this.myDown.bind(this));
    this.renderer.listen(canvasEl, 'mouseup', this.myUp.bind(this));

    //Para gerar uma imagem
    this.girarImgs = new GiraImgs(this.canvasAux.nativeElement);

    let interval = setInterval(() => {
      if (this.imgNaviosBD.length === 4) {
        this.someFunction();
        clearInterval(interval)
      }
    }, 1000);

  }


  naviosCarregados = false;

  async someFunction() {

    await this.loadImageFromDatabase();

    let tradutor: any = {
      0: '270',
      90: '180',
      180: '90',
      270: '0'
    }

    for (let j = 1; j <= 4; j++) {

      this.imagens[j - 1] = [];
      for (let i = 0; i <= 270; i += 90) {

        var img = new Image();
        img.src = this.oImgNavios[j - 1][i]

        this.imagens[j - 1][tradutor[i]] = img;
      }
    }

    this.imagens.forEach((imgs: any) => {

      imgs.forEach((img: any) => {
        img.onload = () => {
          this.myCanvas.nativeElement.getContext('2d').drawImage(img, 0, 0);
          //this.fnDraw(ctx)
        }
      })

    })

    this.naviosCarregados = true

  }

  hasUserSessionId() {
    this.usuarioLogadoId = sessionStorage.getItem('userId');

    if (this.usuarioLogadoId === null || this.usuarioLogadoId === undefined) {
      this.router.navigate(['login'])
    } else {
      this.getUser(this.usuarioLogadoId);
    }

  }

  userData: any;

  getUser(usuarioLogadoId: any) {
    this.service.getUser(usuarioLogadoId).pipe(
      tap(async (res: any) => {
        this.userData = res
        this.sliderValueMusic = this.userData.volumeMusica;
        this.sliderValueSound = this.userData.volumeSom;
        // console.log(res)
        await this.fnGetUserPacotes();
        // this.fnXP();
      })
    ).subscribe();
  }

  oImgNavios: any[] = [];
  imgNaviosBD: any = [];

  fnGetUserPacotes() {
    this.service.getUserPacotes(this.usuarioLogadoId).pipe(
      tap((res: any) => {
        if (res) {
          for (let pacote of res) {
            if (pacote.temaId === this.userData.idEmbarcacao) {
              this.imgNaviosBD.push(pacote.barco1Base64);
              this.imgNaviosBD.push(pacote.barco2Base64);
              this.imgNaviosBD.push(pacote.barco3Base64);
              this.imgNaviosBD.push(pacote.barco4Base64);
            }

          }

        }

      })
    ).subscribe();
  }

  async loadImageFromDatabase() {
    let i = 0;
    for (let img of this.imgNaviosBD) {
      await this.girarImgs.loadImage(img);
      let imgsgiradas = this.girarImgs.getImgGiradas();
      //imgsgiradas[270] = img;
      this.oImgNavios[i] = (imgsgiradas);
      i++;
    }
  }

  fnSomMar() {
    if (this.somMar) {
      try {
        this.somMar.volume = this.sliderValueMusic / 100;
        this.somMar.loop = true;
        this.somMar.play().catch((error: any) => {
          console.error('Error attempting to play the audio:', error);
        });
      } catch (error) {
        console.error('Error while setting up the audio:', error);
      }
    } else {
      // console.error('somMar is null or undefined');
    }
  }

  fnVoltar(){
    this.router.navigate(['/']);
  }

  fnSomLoadingJogar() {
    this.somLoadingJogar.volume = this.sliderValueMusic / 100;
    this.somLoadingJogar.play().catch((error) => {
      // console.log('Error attempting to play the video:', error);
    });
  }

  pauseAudio() {
    if (!this.somMar.paused) {
      this.somMar.pause();
    } else {
      // console.log('O áudio já está pausado');
    }
  }

  myMove(e: any) {
    const rect = this.myCanvas.nativeElement.getBoundingClientRect();
    if (this.dragok) {
      this.x = e.clientX - rect.left;
      this.y = e.clientY - rect.top;

      let i = Math.floor((this.x / 511) * this.nTilesX);
      let j = Math.floor((this.y / 511) * this.nTilesY);

      for (let navio of this.navios) {
        if (navio.selecionado) {
          let k = 0
          let tilesAux = JSON.parse(JSON.stringify(navio.tiles))

          for (let tile of tilesAux) {

            if (navio.horizontal) {
              tile.i = i + k
              tile.j = j

            } else {
              tile.i = i
              tile.j = j + k
            }

            k++

            if (!this.fnEstaNoTabuleiro(tile.i, tile.j)) {
              return;
            }

            if (!this.isPosicaoOutroNavio(navio, tile.i, tile.j)) {
              return; //fazer bordar vermeçha ja que nao é disponivel apra o navio
            }
          }

          for (let t = 0; t < tilesAux.length; t++) {
            navio.tiles[t].i = tilesAux[t].i
            navio.tiles[t].j = tilesAux[t].j
          }

        }
      }
    }
  }

  myDown(e: MouseEvent) {
    const rect = this.myCanvas.nativeElement.getBoundingClientRect();

    // Calcula a posição do clique em relação ao canvas
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    for (let navio of this.navios) {
      if (this.isMouseOverNavio(navio, mouseX, mouseY)) {
        this.x = mouseX;
        this.y = mouseY;
        navio.selecionado = true

        this.navioSelecionado = navio
        this.dragok = true;
        this.renderer.listen(this.myCanvas.nativeElement, 'mousemove', this.myMove.bind(this));
      }
    }

  }

  myUp() {
    for (let navio of this.navios) {
      if (navio.selecionado) {
        navio.selecionado = false
      }
    }
    this.dragok = false;
    this.myCanvas.nativeElement.onmousemove = null;

  }

  // Função para verificar se é possível colocar um navio na posição especificada
  isPosicaoLivre(posicao: any, tamanho = 0) {
    // console.log(posicao)
    // Verifica se não há sobreposição com outros navios
    for (let navio of this.navios) {
      for (let tile of navio.tiles) {
        if (tile.i === posicao.i && tile.j === posicao.j) {
          return false;
        }
      }
    }

    return true;
  }

  fnCanvasMove(e: any) {
    const rect = this.myCanvas.nativeElement.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    for (let navio of this.navios) {
      if (this.isMouseOverNavio(navio, mouseX, mouseY)) {
        if (navio !== this.navioSelecionado) {
          this.navioOver = navio
          //drawSelectedNavioBorder(navio);
        }
        else {
          this.navioOver = null
        }
        return;
      }
    }
  }

  // Função para verificar se o mouse está sobre um navio
  isMouseOverNavio(navio: Navio, mouseX: any, mouseY: any) {

    for (let tile of navio.tiles) {
      let x = (tile.i * 51) + 1;
      let y = (tile.j * 51) + 1;

      if (mouseX >= x && mouseX <= x + 50 && mouseY >= y && mouseY <= y + 50) {
        return true;
      }
    }

    return false;
  }

  fnCanvasClick(e: any) {
    const rect = this.myCanvas.nativeElement.getBoundingClientRect();

    // Calcula a posição do clique em relação ao canvas
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calcula a posição do clique em relação aos tiles do tabuleiro
    const i = Math.floor((mouseX / 511) * this.nTilesX);
    const j = Math.floor((mouseY / 511) * this.nTilesY);

    // Verifica se é possível adicionar o navio na posição clicada
    if (this.isPosicaoLivre({ i, j }, this.shipSize) && this.navios.length < 9) {
      let tiles = [];


      for (let k = 0; k < this.shipSize; k++) {
        tiles.push(new Tile(i + k, j));
      }
      let navio = new Navio(tiles, this.shipSize);
      this.navios.push(navio);

      // Redesenha o tabuleiro com o navio adicionado
      // this.fnDraw();
    }

  }

  fnDraw(ctx: CanvasRenderingContext2D) {

    ctx.clearRect(0, 0, 1021, 511);
    // ctx.fillStyle = "#03a5fc";
    ctx.fillStyle = "#03a5fc50";
    ctx.strokeStyle = "#00000050"

    // Desenha os tiles do tabuleiro
    for (let i = 0; i < this.nTilesX; i++) {
      for (let j = 0; j < this.nTilesY; j++) {
        let x = (i * (this.sizeTiles + 1)) + 1 + this.sizeSpaceShip;
        let y = (j * (this.sizeTiles + 1)) + 1;

        // console.log(i, j)
        ctx.fillRect(x, y, this.sizeTiles, this.sizeTiles);
        ctx.strokeRect(x, y, this.sizeTiles, this.sizeTiles);


      }
    }


    //desenha as minas

    // this.minas.forEach(mina => {
    //   // console.log(mina)
    //   let x = (mina.i * 51) + 1;
    //   let y = (mina.j * 51) + 1;

    //   let img = this.imagensMina[1];

    //   ctx.drawImage(img, x, y, this.sizeTiles + 1, this.sizeTiles + 1); // Desenha a imagem do tile no canvas


    // })

    // Desenha os navios
    ctx.fillStyle = "blue";

    this.navios.forEach(navio => {
      let contador = 0
      let posicaoOk = true

      navio.tiles.forEach(tile => {

        if (!this.isPosicaoDisponivelParaNavio(navio, tile.i, tile.j)) {
          posicaoOk = false
        }

        let x = (tile.i * 51) + 1;
        let y = (tile.j * 51) + 1;
        // ctx.fillRect(x, y, 50, 50);

        if (navio.tipo === 1) { //é uma mina

          ctx.drawImage(this.imagemMina, x, y, this.sizeTiles + 1, this.sizeTiles + 1); // Desenha a imagem do tile no canvas

        } else {

          let img = this.imagens[navio.tamanho - 1][navio.angulo.toString()]

          if (navio.horizontal) {
            ctx.drawImage(img, contador * img.width / navio.tiles.length, 0, img.width / navio.tiles.length, img.height, x, y, this.sizeTiles + 1, this.sizeTiles + 1); // Desenha a imagem do tile no canvas

          }
          else {
            ctx.drawImage(img, 0, contador * img.height / navio.tiles.length, img.width, img.height / navio.tiles.length, x, y, this.sizeTiles + 1, this.sizeTiles + 1); // Desenha a imagem do tile no canvas
          }

          contador += 1
        }


      });

      if (this.navioSelecionado != null) {
        if (this.saoNaviosIguais(this.navioSelecionado, navio)) {
          this.drawSelectedNavioBorder(ctx, navio, 3)
        }
      }

      if (this.navioOver != null) {
        if (this.saoNaviosIguais(this.navioOver, navio)) {
          this.drawSelectedNavioBorder(ctx, navio, 2)
        }
      }

      if (!posicaoOk) {
        this.drawSelectedNavioBorder(ctx, navio, 3, 'red')
      }


    });

    requestAnimationFrame(() => {
      this.fnDraw(ctx)
    });

  }

  isPosicaoDisponivelParaNavio(navio: Navio, i: any, j: any) {

    for (let outroNavio of this.navios) {
      if (outroNavio !== navio) {
        for (let tile of outroNavio.tiles) {
          if (i <= tile.i + 1 && i >= tile.i - 1 && j >= tile.j - 1 && j <= tile.j + 1) {
            return false;
          }
        }
      }
    }
    return true;

  }

  isPosicaoOutroNavio(navio: Navio, i: any, j: any) {

    for (let outroNavio of this.navios) {
      if (outroNavio !== navio) {
        for (let tile of outroNavio.tiles) {
          if (i == tile.i && j == tile.j) {
            return false;
          }
        }
      }
    }
    return true;

  }

  fnEstaNoTabuleiro(i: any, j: any) {
    if (i > 19 || i < 0 || j > 9 || j < 0)
      return false
    return true
  }

  criarNavio(tamanho: any, pX: any, pY: any) {
    // console.log(tamanho, pX, pY)
    let tiles = [];
    for (let i = pX; i < tamanho + pX; i++) {
      tiles.push(new Tile(i, pY)); // Adicionando tiles na mesma linha para simplificar
    }
    return new Navio(tiles, tamanho);
  }

  criarMina(pX: any, pY: any) {

    let tile = [new Tile(pX, pY)]; //como o Objeto navio espera receber um arr de tiles, eu fiz isso [new tile]
    return new Navio(tile, 1, 1);
  }

  // Função para verificar se dois navios são iguais
  saoNaviosIguais(navio1: Navio, navio2: Navio) {
    // Verifica se os navios têm o mesmo número de tiles
    if (navio1.tiles.length !== navio2.tiles.length) {
      return false;
    }

    // Verifica se todos os tiles dos dois navios são iguais
    for (let i = 0; i < navio1.tiles.length; i++) {
      if (navio1.tiles[i].i !== navio2.tiles[i].i || navio1.tiles[i].j !== navio2.tiles[i].j) {
        return false;
      }
    }

    return true;
  }

  // Função para desenhar a borda do navio selecionado
  drawSelectedNavioBorder(ctx: CanvasRenderingContext2D, navio: Navio, border = 1, color = "#E6CC8A") {
    ctx.strokeStyle = color; // Define a cor da borda para amarelo
    ctx.lineWidth = border; // Define a largura da borda

    let largura = Math.abs(navio.cauda.i - navio.cabeca.i) + 1
    let altura = Math.abs(navio.cauda.j - navio.cabeca.j) + 1
    // navio.tiles.forEach(tile => {
    //     console.log(tile)
    let x = (Math.min(navio.cabeca.i, navio.cauda.i) * 51) + 1;
    let y = (Math.min(navio.cabeca.j, navio.cauda.j) * 51) + 1;
    // console.log(navio)
    ctx.strokeRect(x, y, 51 * largura, 50 * altura); // Desenha a borda ao redor do tile
    // });
  }

  fnGirar(antihorario = false) {
    this.fnSomBtn();
    if (this.navioSelecionado) {
      let proximoAngulo = 0;

      if (antihorario) {
        proximoAngulo = this.navioSelecionado.angulo + 90;
      } else {
        proximoAngulo = this.navioSelecionado.angulo - 90;
      }

      if (proximoAngulo == 360) {
        proximoAngulo = 0;
      } else if (proximoAngulo == -90) {
        proximoAngulo = 270;
      }

      let tilesAux = JSON.parse(JSON.stringify(this.navioSelecionado.tiles));
      let tileCenter = tilesAux[0];
      if (antihorario) tileCenter = tilesAux[tilesAux.length - 1];

      let k = 0;
      let passo = 1;

      if ([0, 90].indexOf(proximoAngulo) > -1) {
        if (!antihorario) tileCenter = tilesAux[tilesAux.length - 1];
        else tileCenter = tilesAux[0];
      }

      if ([180, 90].indexOf(proximoAngulo) > -1) {
        k = tilesAux.length - 1;
        passo = -1;
      }

      for (let tile of tilesAux) {
        if (this.navioSelecionado.horizontal) {
          tile.i = tileCenter.i;
          tile.j = tile.j + k * passo;
        } else {
          tile.i = tile.i + k * passo;
          tile.j = tileCenter.j;
        }
        k += passo;

        if (!this.isPosicaoOutroNavio(this.navioSelecionado, tile.i, tile.j)) {
          // alert("Não é possível girar o navio aqui!");
          this.showNotification('Ops...', 'Não é possível girar o navio aqui!', 'error');

          return;
        }

        if (!this.fnEstaNoTabuleiro(tile.i, tile.j)) {
          // alert("Não é possível girar o navio aqui!");
          this.showNotification('Ops...', 'Não é possível girar o navio aqui!', 'error');

          return;
        }
      }

      for (let i = 0; i < tilesAux.length; i++) {
        this.navioSelecionado.tiles[i].i = tilesAux[i].i;
        this.navioSelecionado.tiles[i].j = tilesAux[i].j;
      }

      this.navioSelecionado.horizontal = !this.navioSelecionado.horizontal;
      this.navioSelecionado.angulo = proximoAngulo;
    }

  }

  fnGeraPosicaoAleatoria() {
    this.fnSomBtn();
    for (let navio of this.navios) {
      let ok = false;
      while (!ok) {
        let i = Math.floor(Math.random() * (21 - 10) + 10)
        let j = Math.floor(Math.random() * 11)
        let h = Math.floor(Math.random() * 2)

        let k = 0
        let tilesAux = JSON.parse(JSON.stringify(navio.tiles))

        ok = true

        for (let tile of tilesAux) {

          if (h == 1) {
            tile.i = i + k
            tile.j = j

          } else {
            tile.i = i
            tile.j = j + k
          }

          k++

          if (!this.fnEstaNoTabuleiro(tile.i, tile.j)) {
            ok = false
          }

          if (!this.isPosicaoDisponivelParaNavio(navio, tile.i, tile.j)) {
            ok = false
          }
        }

        if (ok) {
          for (let t = 0; t < tilesAux.length; t++) {
            navio.tiles[t].i = tilesAux[t].i
            navio.tiles[t].j = tilesAux[t].j
          }
          if (h == 1) {
            navio.angulo = Math.random() > 0.5 ? 0 : 180
            navio.horizontal = true
          }
          else {
            navio.angulo = Math.random() > 0.5 ? 90 : 270
            navio.horizontal = false
          }
        }

      }

    }
  }

  fnSalvaPosicao() {
    this.fnSomBtn();

    this.tabuleiro = []
    let existeNavioGaragem = false;
    let posicaoOk = true;

    for (let i = 0; i < this.nTilesX; i++) {
      this.tabuleiro.push([])
      for (let j = 0; j < this.nTilesY; j++) {

        // console.log(i, j)
        this.tabuleiro[i].push(0);

      }
    }

    this.navios.forEach(navio => {

      navio.tiles.forEach(tile => {

        if (!this.isPosicaoDisponivelParaNavio(navio, tile.i, tile.j)) {
          posicaoOk = false
        }

        if (tile.i < 10) {
          existeNavioGaragem = true
        }
        else {
          if (navio.tipo === 0)
            this.tabuleiro[tile.j][tile.i - 10] = 1
          else
            this.tabuleiro[tile.j][tile.i - 10] = 5
        }

      })
    })
    var usuarioLogadoId = sessionStorage.getItem('userId');

    if (existeNavioGaragem) {
      // alert("Todos os navios devem estar completamente dentro do tabuleiro!");
      this.showNotification('Ops...', 'Todos os navios devem estar completamente dentro do tabuleiro!', 'error');

    }
    else if (!posicaoOk) {
      // alert("Os navios não podem se encostar!");
      this.showNotification('Ops...', 'Os navios não podem se encostar!', 'error');
    }
    else {

      this.pauseAudio();
      this.fnSomLoadingJogar();
      // console.log(this.tabuleiro);
      this.fnJogar();

      sessionStorage.setItem('meusNavios', JSON.stringify(this.navios));
      sessionStorage.setItem('tabuleiro', JSON.stringify(this.tabuleiro));
      sessionStorage.setItem('imgsNavios', JSON.stringify(this.oImgNavios))

      setTimeout(() => {
        this.somLoadingJogar.pause();
        this.fnSomLoadingPre()
        this.router.navigate(['/partida']);
      }, 2000);

    }

  }

  fnSomBtn() {
    this.somBtn.volume = this.sliderValueSound / 100;;
    this.somBtn.load();
    this.somBtn.play().catch((error) => {
      // console.log('Error attempting to play the video:', error);
    });
  }

  fnJogar() {
    this.openShadow = true;
  }

  fnAlert() {
    (document.querySelector(".notification") as HTMLElement).style.opacity = "1";
  }

  showError() {
    this.showNotification('Ops...', 'Há navios proximos!', 'error');
  }

  private container!: HTMLElement | null;

  showNotification(title: string, msg: string, type: string) {
    // Remove any existing notification
    // console.log(this.navios);
    this.removeNotification();

    this.container = this.renderer.createElement('div');
    this.renderer.addClass(this.container, 'f-notification');
    this.renderer.addClass(this.container, `f-notification-${type}`);
    this.renderer.addClass(this.container, 'f-show');

    const closeButton = this.renderer.createElement('div');
    this.renderer.addClass(closeButton, 'f-close');
    this.renderer.listen(closeButton, 'click', () => {
      this.removeNotification();
    });

    this.renderer.appendChild(closeButton, this.renderer.createText('×'));
    this.renderer.appendChild(this.container, closeButton);

    const titleElement = this.renderer.createElement('h3');
    this.renderer.addClass(titleElement, 'f-notification-title');

    this.renderer.appendChild(titleElement, this.renderer.createText(title));
    this.renderer.appendChild(this.container, titleElement);

    const msgElement = this.renderer.createElement('p');
    this.renderer.addClass(msgElement, 'alert-content');

    this.renderer.appendChild(msgElement, this.renderer.createText(msg));
    this.renderer.appendChild(this.container, msgElement);

    this.renderer.appendChild(document.body, this.container);

    setTimeout(() => {
      this.removeNotification();
    }, 4000);
  }

  removeNotification() {
    if (this.container) {
      this.renderer.removeClass(this.container, 'f-show');
      this.renderer.addClass(this.container, 'f-hide');
      setTimeout(() => {
        if (this.container && this.container.parentNode) {
          this.renderer.removeChild(document.body, this.container);
          this.container = null;
        }
      }, 500);
    }
  }

}
