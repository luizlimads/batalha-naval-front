import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-tela-partida',
  templateUrl: './tela-partida.component.html',
  styleUrl: './tela-partida.component.css'
})
export class TelaPartidaComponent {
  @ViewChild('myCanvas', { static: true }) myCanvas!: ElementRef;
  @ViewChild('canvasOponente', { static: true }) canvasOponente!: ElementRef;

  private webSocket!: WebSocket;

  nTilesX: any = 10;
  // Número de linhas
  nTilesY: any = 10;

  // Tamanho do navio
  shipSize: any = 3;

  // tamanho Tile
  sizeTiles: any = 50;

  imagens: any = [];


  // espaço navios
  sizeSpaceShip: any = 10 * (this.sizeTiles + 1);
  tabuleiroOp: any[] = [];
  myTabuleiro: any[] = [];

  navios: any[];

  constructor(private renderer: Renderer2) {
    // Crio um webSocket
    // this.webSocket = new WebSocket('ws://localhost:8080/game');

    // Adiciono o evento que vai ficar ouvindo esse webSocket
    // this.webSocket.onmessage = (event) => {
    //   console.log(JSON.parse(event.data))
    // };

    this.navios = [
      {
        "tiles": [
          {
            "i": 11,
            "j": 0,
            "isHead": false,
            "isMid": false,
            "isTail": false
          },
          {
            "i": 12,
            "j": 0,
            "isHead": false,
            "isMid": false,
            "isTail": false
          },
          {
            "i": 13,
            "j": 0,
            "isHead": false,
            "isMid": false,
            "isTail": false
          },
          {
            "i": 14,
            "j": 0,
            "isHead": false,
            "isMid": false,
            "isTail": false
          }
        ],
        "tamanho": 4,
        "cabeca": {
          "i": 11,
          "j": 0,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "meio": {
          "i": 13,
          "j": 0,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "cauda": {
          "i": 14,
          "j": 0,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "selecionado": false,
        "horizontal": true,
        "angulo": 0
      },
      {
        "tiles": [
          {
            "i": 19,
            "j": 0,
            "isHead": false,
            "isMid": false,
            "isTail": false
          },
          {
            "i": 19,
            "j": 1,
            "isHead": false,
            "isMid": false,
            "isTail": false
          },
          {
            "i": 19,
            "j": 2,
            "isHead": false,
            "isMid": false,
            "isTail": false
          }
        ],
        "tamanho": 3,
        "cabeca": {
          "i": 19,
          "j": 0,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "meio": {
          "i": 19,
          "j": 1,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "cauda": {
          "i": 19,
          "j": 2,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "selecionado": false,
        "horizontal": false,
        "angulo": 270
      },
      {
        "tiles": [
          {
            "i": 10,
            "j": 3,
            "isHead": false,
            "isMid": false,
            "isTail": false
          },
          {
            "i": 10,
            "j": 4,
            "isHead": false,
            "isMid": false,
            "isTail": false
          },
          {
            "i": 10,
            "j": 5,
            "isHead": false,
            "isMid": false,
            "isTail": false
          }
        ],
        "tamanho": 3,
        "cabeca": {
          "i": 10,
          "j": 3,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "meio": {
          "i": 10,
          "j": 4,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "cauda": {
          "i": 10,
          "j": 5,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "selecionado": false,
        "horizontal": false,
        "angulo": 270
      },
      {
        "tiles": [
          {
            "i": 16,
            "j": 2,
            "isHead": false,
            "isMid": false,
            "isTail": false
          },
          {
            "i": 16,
            "j": 3,
            "isHead": false,
            "isMid": false,
            "isTail": false
          },
          {
            "i": 16,
            "j": 4,
            "isHead": false,
            "isMid": false,
            "isTail": false
          }
        ],
        "tamanho": 3,
        "cabeca": {
          "i": 16,
          "j": 2,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "meio": {
          "i": 16,
          "j": 3,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "cauda": {
          "i": 16,
          "j": 4,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "selecionado": false,
        "horizontal": false,
        "angulo": 270
      },
      {
        "tiles": [
          {
            "i": 12,
            "j": 5,
            "isHead": false,
            "isMid": false,
            "isTail": false
          },
          {
            "i": 13,
            "j": 5,
            "isHead": false,
            "isMid": false,
            "isTail": false
          }
        ],
        "tamanho": 2,
        "cabeca": {
          "i": 12,
          "j": 5,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "meio": {
          "i": 13,
          "j": 5,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "cauda": {
          "i": 13,
          "j": 5,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "selecionado": false,
        "horizontal": true,
        "angulo": 0
      },
      {
        "tiles": [
          {
            "i": 17,
            "j": 6,
            "isHead": false,
            "isMid": false,
            "isTail": false
          },
          {
            "i": 17,
            "j": 7,
            "isHead": false,
            "isMid": false,
            "isTail": false
          }
        ],
        "tamanho": 2,
        "cabeca": {
          "i": 17,
          "j": 6,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "meio": {
          "i": 17,
          "j": 7,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "cauda": {
          "i": 17,
          "j": 7,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "selecionado": false,
        "horizontal": false,
        "angulo": 90
      },
      {
        "tiles": [
          {
            "i": 10,
            "j": 7,
            "isHead": false,
            "isMid": false,
            "isTail": false
          },
          {
            "i": 10,
            "j": 8,
            "isHead": false,
            "isMid": false,
            "isTail": false
          }
        ],
        "tamanho": 2,
        "cabeca": {
          "i": 10,
          "j": 7,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "meio": {
          "i": 10,
          "j": 8,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "cauda": {
          "i": 10,
          "j": 8,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "selecionado": false,
        "horizontal": false,
        "angulo": 90
      },
      {
        "tiles": [
          {
            "i": 13,
            "j": 3,
            "isHead": false,
            "isMid": false,
            "isTail": false
          }
        ],
        "tamanho": 1,
        "cabeca": {
          "i": 13,
          "j": 3,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "meio": {
          "i": 13,
          "j": 3,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "cauda": {
          "i": 13,
          "j": 3,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "selecionado": false,
        "horizontal": true,
        "angulo": 0
      },
      {
        "tiles": [
          {
            "i": 14,
            "j": 9,
            "isHead": false,
            "isMid": false,
            "isTail": false
          }
        ],
        "tamanho": 1,
        "cabeca": {
          "i": 14,
          "j": 9,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "meio": {
          "i": 14,
          "j": 9,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "cauda": {
          "i": 14,
          "j": 9,
          "isHead": false,
          "isMid": false,
          "isTail": false
        },
        "selecionado": false,
        "horizontal": false,
        "angulo": 270
      }
    ]
  }



  ngOnInit(): void {


    //PREENCHENDO O TABULEIRO DO OPONENTE
    for (let i = 0; i < this.nTilesX; i++) {
      this.tabuleiroOp.push([])
      for (let j = 0; j < this.nTilesY; j++) {
        this.tabuleiroOp[i].push(0);

      }
    }

    //PREENCHENDO O MEU TABULEIRO DO OPONENTE
    for (let i = 0; i < this.nTilesX; i++) {
      this.myTabuleiro.push([])
      for (let j = 0; j < this.nTilesY; j++) {
        this.myTabuleiro[i].push(0);

      }
    }

    //COLOCANDO NAVIOS NO TABULEIRO DO OPONENTE
    this.navios.forEach(navio => {

      navio.tiles.forEach((tile: { i: number; j: number; }) => {
        this.tabuleiroOp[tile.j][tile.i - 10] = 1
      })
    })

    //COLOCANDO NAVIOS NO MEU TABULEIRO DO OPONENTE
    this.navios.forEach(navio => {

      navio.tiles.forEach((tile: { i: number; j: number; }) => {
        this.myTabuleiro[tile.j][tile.i - 10] = 1
      })
    })


    const myCvs: HTMLCanvasElement = this.myCanvas.nativeElement;
    const myCtx = myCvs.getContext('2d');

    const cvsOponente: HTMLCanvasElement = this.canvasOponente.nativeElement;
    const ctxOponente = cvsOponente.getContext('2d');

    if (myCtx) {
      for (let i = 0; i <= 270; i += 90) {
        var img = new Image();
        img.src = `../../assets/img/barco${i}.png`
        this.imagens[i] = img
        // console.log(i)
      }

      this.imagens.forEach((img: any) => {
        img.onload = () => {
          myCtx.drawImage(img, 0, 0);
          //this.fnDraw(ctx)
        }
      });
      //ctx.clearRect(0, 0, 1021, 511);

      this.fnDraw(myCtx);
    }

    if (ctxOponente) {
      this.fnDrawOponente(ctxOponente);

    }
  }

  fnDraw(ctx: CanvasRenderingContext2D) {

    ctx.clearRect(0, 0, 1021, 511);
    ctx.fillStyle = "#03a5fc50";
    ctx.strokeStyle = "#00000050"

    // Desenha os tiles do tabuleiro
    for (let i = 0; i < this.nTilesX; i++) {
      for (let j = 0; j < this.nTilesY; j++) {
        let x = (i * (this.sizeTiles + 1)) + 1;
        let y = (j * (this.sizeTiles + 1)) + 1;

        // console.log(i, j)
        if (this.myTabuleiro[j][i] == 3) {
          ctx.fillStyle = "#00000080";

        }else if(this.myTabuleiro[j][i] == 2){
          ctx.fillStyle = "#ff000080";
        } else {
          ctx.fillStyle = "#03a5fc50";

        }
        ctx.fillRect(x, y, this.sizeTiles, this.sizeTiles);
        ctx.strokeRect(x, y, this.sizeTiles, this.sizeTiles);

      }
    }

    this.navios.forEach(navio => {
      let contador = 0

      navio.tiles.forEach((tile: { i: number; j: number; }) => {

        let x = ((tile.i - 10) * 51) + 1;
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


    });


    requestAnimationFrame(() => {
      this.fnDraw(ctx)
    });

  }


  fnDrawOponente(ctx: CanvasRenderingContext2D) {

    ctx.clearRect(0, 0, 1021, 511);
    ctx.fillStyle = "#FF000050";
    ctx.strokeStyle = "#00000050"

    // Desenha os tiles do tabuleiro
    for (let i = 0; i < this.nTilesX; i++) {
      for (let j = 0; j < this.nTilesY; j++) {
        let x = (i * (this.sizeTiles + 1)) + 1;
        let y = (j * (this.sizeTiles + 1)) + 1;

        // console.log(i, j)

        if (this.tabuleiroOp[j][i] == 3) {
          ctx.fillStyle = "#00000090";
          // ctx.strokeStyle = "#00000050"
        } else if (this.tabuleiroOp[j][i] == 2) {
          ctx.fillStyle = "#ff000090";
          // ctx.strokeStyle = "#00000050"
        } else {
          ctx.fillStyle = "#FF000050";

        }

        ctx.fillRect(x, y, this.sizeTiles, this.sizeTiles);
        ctx.strokeRect(x, y, this.sizeTiles, this.sizeTiles);


      }
    }

    // this.navios.forEach(navio => {
    //   let contador = 0

    //   navio.tiles.forEach((tile: { i: number; j: number; }) => {

    //     let x = ((tile.i-10) * 51) + 1;
    //     let y = (tile.j * 51) + 1;
    //     // ctx.fillRect(x, y, 50, 50);

    //     let img = this.imagens[navio.angulo]

    //     if (navio.horizontal) {
    //       // ctx.fillRect(img, contador * img.width / navio.tiles.length, 0, img.width / navio.tiles.length, img.height, x, y, this.sizeTiles + 1, this.sizeTiles + 1); // Desenha a imagem do tile no canvas
    //       ctx.fillRect(x, y, this.sizeTiles, this.sizeTiles);

    //     }
    //     else {
    //       // ctx.fillRect(img, 0, contador * img.height / navio.tiles.length, img.width, img.height / navio.tiles.length, x, y, this.sizeTiles + 1, this.sizeTiles + 1); // Desenha a imagem do tile no canvas
    //       ctx.fillRect(x, y, this.sizeTiles, this.sizeTiles);

    //     }

    //     contador += 1
    //   });


    // });


    requestAnimationFrame(() => {
      this.fnDrawOponente(ctx)
    });

  }

  fnCanvasOponenteClick(e: any) {


    if (this.isRunning === false) {
      const rect = this.canvasOponente.nativeElement.getBoundingClientRect();

      // Calcula a posição do clique em relação ao canvas
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      // Calcula a posição do clique em relação aos tiles do tabuleiro
      const i = Math.floor((mouseX / 511) * this.nTilesX);
      const j = Math.floor((mouseY / 511) * this.nTilesY);


      /*
      0 -> nunca clicou e não tem navio
      1 -> nunca clicou e tem navio
      2 -> clicou e não tem nada
      3 -> clicou e tem navio
  
      */
      if (this.tabuleiroOp[j][i] == 1) {
        // alert('Você acertou!');
        this.tabuleiroOp[j][i] = 3;

        if (!this.checkForOnes(this.tabuleiroOp)) { //checando se no tabuleiro do oponente ainda tem navio não destruido
          alert("você venceu!")
        }

      }
      else if (this.tabuleiroOp[j][i] == 0) {
        // alert('Você errou!');
        this.tabuleiroOp[j][i] = 2;

        //apos o meu click eu envio uma mensagem para o outro jogador
        this.fnSendMessageWS(); //coloquei aqui pois só passa a vez para o outro jogador, quando eu errar

      }
      else {
        alert("escolha outra posição, essa ja foi escolhida")
      }

    }






  }


  fnSendMessageWS() {
    this.startWebSocket();
    //envio uma mensagem
    let messageObject = {
      usuarioId: "1",//usuarioLogadoId,
      tabuleiro: this.tabuleiroOp,
      navios: this.navios
    };


    //envio uma mensagem
    // this.webSocket.send(JSON.stringify(messageObject))
  }


  isRunning = false; // Variável para controlar o estado dos botões
  private subscription: Subscription | null = null; // Variável para armazenar a assinatura do Observable

  // Método para simular um WebSocket usando um Observable
  simulateWebSocket(): Observable<any> {
    return new Observable<any>(observer => {
      // Configura um timeout que emite uma mensagem após 1 segundo
      const timeoutId = setTimeout(() => {
        const data = { message: 'Hello from simulated WebSocket', timestamp: new Date() };
        // Envia a mensagem para os observadores
        observer.next(data);
        // Completa o Observable após enviar a mensagem
        observer.complete();
      }, 1000);

      // Limpa o timeout quando o Observable for cancelado
      return () => {
        clearTimeout(timeoutId);
      };
    });
  }

  // Método para iniciar o WebSocket simulado
  startWebSocket(): void {
    // Define o estado como "executando" para desabilitar o botão de start
    this.isRunning = true;

    // Cancela a assinatura anterior, se houver
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    // Inicia uma nova assinatura para o Observable do WebSocket simulado
    this.subscription = this.simulateWebSocket().subscribe({
      next: (message) => {
        // Imprime a mensagem recebida no console
        console.log(message);
        this.randomlyPlaceTwo();
      },
      complete: () => {
        // Define o estado como "não executando" para habilitar os botões novamente
        this.isRunning = false;
        console.log("sua vez", this.isRunning)

      }
    });
  }

  // Método para parar o WebSocket simulado
  stopWebSocket(): void {
    // Define o estado como "não executando" para habilitar o botão de start
    this.isRunning = false;

    // Cancela a assinatura atual, se houver
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  //função para alterar o meu tabuleiro 

  randomlyPlaceTwo() {
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);

    if (this.myTabuleiro[row][col] === 2 || this.myTabuleiro[row][col] === 3) { // se for 0 ou 1 e ja foram clicaram, eles são 2 e 3, e se  for 2 e 3 é pq eu ja cliquei, então roda a função de novo
      this.randomlyPlaceTwo(); // Se a posição já foi clicada antes, chama a função novamente
    } else {
      if(this.myTabuleiro[row][col] === 1){ //se for 1 (tem navio) 
        this.myTabuleiro[row][col] = 3; // coloca 3 (significa que o navio foi acertado)
        if (!this.checkForOnes(this.myTabuleiro)) { //checando se no tabuleiro ainda tem navio não destruido
          alert("você perdeu!") //se não houver nenhum navio p/ destrui no seu tabuleiro, vc perdeu

        }else{
          this.fnSendMessageWS(); //se houver navio e foi clicado em cima de um navio (=== 1) o oponente joga dnv
        }
      }else{
        this.myTabuleiro[row][col] = 2; //era 0 e virou 2 (0 não tem nada - 2 clicou no nada)
      }
      
    }
  }

  checkForOnes(tbl: any): boolean {
    for (let i = 0; i < tbl.length; i++) {
      for (let j = 0; j < tbl[i].length; j++) {
        if (tbl[i][j] === 1) {
          return true; // Se encontrar um 1, retorna true
        }
      }
    }
    return false; // Se não encontrar nenhum 1, retorna false
  }

}
