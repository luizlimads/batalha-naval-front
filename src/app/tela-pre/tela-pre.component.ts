import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Navio, Tile } from '../navio';

@Component({
  selector: 'app-tela-pre',
  templateUrl: './tela-pre.component.html',
  styleUrl: './tela-pre.component.css'
})
export class TelaPreComponent {
  // canvas!: any;
  // ctx!: any;
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

  imagens: any = []

  update: boolean = true; // if true redraw

  tiles: Tile[] = [];

  // Criando o array de navios
  navios: Navio[] = [];

  navioOver!: Navio | null;
  navioSelecionado!: Navio | null;

  dragok = false;
  x: any;
  y: any;

  tabuleiro: any[] = [];
  private webSocket!: WebSocket;

  constructor(private renderer: Renderer2) {
    this.webSocket = new WebSocket('ws://localhost:8080/game');
    this.webSocket.onmessage = (event) => {
      console.log(JSON.parse(event.data))
    };
  }

  ngAfterViewInit() {
    const canvasEl = this.myCanvas.nativeElement;

    this.renderer.listen(canvasEl, 'mousedown', this.myDown.bind(this));
    this.renderer.listen(canvasEl, 'mouseup', this.myUp.bind(this));
  }

  ngOnInit(): void {

    this.navios.push(this.criarNavio(4, 1, 1)); // 1 navio de 4 casas

    this.navios.push(this.criarNavio(3, 6, 1)); // 1 navio de 3 casas
    this.navios.push(this.criarNavio(3, 1, 3)); // 1 navio de 3 casas
    this.navios.push(this.criarNavio(3, 5, 3)); // 1 navio de 3 casas

    this.navios.push(this.criarNavio(2, 1, 5)); // 1 navio de 2 casas
    this.navios.push(this.criarNavio(2, 4, 5)); // 1 navio de 2 casas
    this.navios.push(this.criarNavio(2, 7, 5)); // 1 navio de 2 casas

    this.navios.push(this.criarNavio(1, 1, 7)); // 1 navio de 1 casas
    this.navios.push(this.criarNavio(1, 3, 7)); // 1 navio de 1 casas


    // ----------------------------------------------------

    // this.canvas = document.getElementById("board") as HTMLCanvasElement;
    // console.log(this.canvas)
    // if(this.ctx )
    //   this.ctx = this.canvas.getContext("2d");

    // console.log(this.ctx);

    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    const ctx = canvas.getContext('2d');


    if (ctx) {

      for (let i = 0; i <= 270; i += 90) {
        var img = new Image();
        img.src = `../../assets/img/barco${i}.png`
        this.imagens[i] = img
        // console.log(i)
      }

      this.imagens.forEach((img: any) => {
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          //this.fnDraw(ctx)
        }
      });

      //ctx.clearRect(0, 0, 1021, 511);

      this.fnDraw(ctx)
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

            if (!this.isPosicaoDisponivelParaNavio(navio, tile.i, tile.j)) {
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
      console.log(i)


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
    ctx.fillStyle = "#03a5fc";

    // Desenha os tiles do tabuleiro
    for (let i = 0; i < this.nTilesX; i++) {
      for (let j = 0; j < this.nTilesY; j++) {
        let x = (i * (this.sizeTiles + 1)) + 1 + this.sizeSpaceShip;
        let y = (j * (this.sizeTiles + 1)) + 1;

        // console.log(i, j)
        ctx.fillRect(x, y, this.sizeTiles, this.sizeTiles);


      }
    }

    // Desenha os navios
    ctx.fillStyle = "blue";

    this.navios.forEach(navio => {
      let contador = 0

      navio.tiles.forEach(tile => {

        let x = (tile.i * 51) + 1;
        let y = (tile.j * 51) + 1;
        // ctx.fillRect(x, y, 50, 50);

        let img = this.imagens[navio.angulo]

        if (navio.horizontal) {
          ctx.drawImage(img, contador * img.width / navio.tiles.length, 0, img.width / navio.tiles.length, img.height, x, y, this.sizeTiles + 1, this.sizeTiles + 1); // Desenha a imagem do tile no canvas

        }
        else {
          ctx.drawImage(img, 0, contador * img.height / navio.tiles.length, img.width, img.height / navio.tiles.length, x, y, this.sizeTiles + 1, this.sizeTiles + 1); // Desenha a imagem do tile no canvas
        }

        contador += 1
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
  drawSelectedNavioBorder(ctx: CanvasRenderingContext2D, navio: Navio, border = 1, color = "yellow") {
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

        if (!this.isPosicaoDisponivelParaNavio(this.navioSelecionado, tile.i, tile.j)) {
          alert("Não é possível girar o navio aqui!");
          return;
        }

        if (!this.fnEstaNoTabuleiro(tile.i, tile.j)) {
          alert("Não é possível girar o navio aqui!");
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

  fnSalvaPosicao() {
    // Desenha os tiles do tabuleiro
    this.tabuleiro = []
    let existeNavioGaragem = false;

    for (let i = 0; i < this.nTilesX; i++) {
      this.tabuleiro.push([])
      for (let j = 0; j < this.nTilesY; j++) {

        // console.log(i, j)
        this.tabuleiro[i].push(0);

      }
    }

    this.navios.forEach(navio => {

      navio.tiles.forEach(tile => {

        if (tile.i < 10) {
          existeNavioGaragem = true
        }
        else {
          this.tabuleiro[tile.j][tile.i - 10] = 1
        }

      })
    })
    var usuarioLogadoId = sessionStorage.getItem('userId');

    if (existeNavioGaragem) {
      alert("Todos os navios devem estar completamente dentro do tabuleiro!")
    }
    else {
      console.log(this.tabuleiro);

      let messageObject = { 
        usuarioId: usuarioLogadoId,
        tabuleiro: this.tabuleiro,
        navios: this.navios
      }; 

      this.webSocket.send(JSON.stringify(messageObject))
    }

   
    // console.log(this.navios)
  }


  // fnGirar(a: boolean = false) {

  //   console.log(a)
  //   if (this.navioSelecionado) {
  //     this.navioSelecionado.girar(a)
  //   }
  // }


  // document.getElementById("btnOk").addEventListener("click", () {
  //   console.log("ok")
  //   console.log(navios)
  //   console.log("_____________")
  //   // console.log(tiles) PAREI AQUIII
  // })

}
