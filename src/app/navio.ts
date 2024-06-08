// src/app/models/navio.model.ts

export class Mina {
  i: number;
  j: number;

  constructor(i: number, j: number) {
    this.i = i;
    this.j = j;
  }
}

export class Tile {
  i: number;
  j: number;
  // isHead: boolean;
  // isMid: boolean;
  // isTail: boolean;

  constructor(i: number, j: number) {
    this.i = i;
    this.j = j;
    // this.isHead = false;
    // this.isMid = false;
    // this.isTail = false;
  }
}

export class Navio {
  tiles: Tile[];
  tamanho: number;
  cabeca: Tile;
  meio: Tile;
  cauda: Tile;
  selecionado: boolean;
  horizontal: boolean;
  angulo: number;
  tipo: number; //se tipo 1 é uma mina

  constructor(tiles: Tile[], tamanho: number, tipo: number = 0) {
    this.tiles = tiles;
    this.tamanho = tamanho;
    this.cabeca = tiles[0];
    this.meio = tiles[Math.floor(tamanho / 2)];
    this.cauda = tiles[tamanho - 1];
    this.selecionado = false;
    this.horizontal = true;
    this.angulo = 0;
    this.tipo = tipo;
  }

  // girar(antihorario = false) {
  //   let proximoAngulo = 0;

  //   if (antihorario) {
  //     proximoAngulo = this.angulo + 90;
  //   } else {
  //     proximoAngulo = this.angulo - 90;
  //   }

  //   if (proximoAngulo == 360) {
  //     proximoAngulo = 0;
  //   } else if (proximoAngulo == -90) {
  //     proximoAngulo = 270;
  //   }

  //   let tilesAux = JSON.parse(JSON.stringify(this.tiles));
  //   let tileCenter = tilesAux[0];
  //   if (antihorario) tileCenter = tilesAux[tilesAux.length - 1];

  //   let k = 0;
  //   let passo = 1;

  //   if ([0, 90].indexOf(proximoAngulo) > -1) {
  //     if (!antihorario) tileCenter = tilesAux[tilesAux.length - 1];
  //     else tileCenter = tilesAux[0];
  //   }

  //   if ([180, 90].indexOf(proximoAngulo) > -1) {
  //     k = tilesAux.length - 1;
  //     passo = -1;
  //   }

  //   for (let tile of tilesAux) {
  //     if (this.horizontal) {
  //       tile.i = tileCenter.i;
  //       tile.j = tile.j + k * passo;
  //     } else {
  //       tile.i = tile.i + k * passo;
  //       tile.j = tileCenter.j;
  //     }
  //     k += passo;

  //     if (!isPosicaoDisponivelParaNavio(this, tile.i, tile.j)) {
  //       alert("Não é possível girar o navio aqui!");
  //       return;
  //     }

  //     if (!fnEstaNoTabuleiro(tile.i, tile.j)) {
  //       alert("Não é possível girar o navio aqui!");
  //       return;
  //     }
  //   }

  //   for (let i = 0; i < tilesAux.length; i++) {
  //     this.tiles[i].i = tilesAux[i].i;
  //     this.tiles[i].j = tilesAux[i].j;
  //   }

  //   this.horizontal = !this.horizontal;
  //   this.angulo = proximoAngulo;
  // }
}

// Mock functions for position validation (you need to implement them)
// function isPosicaoDisponivelParaNavio(navio: Navio, i: number, j: number): boolean {
//   // Implementar validação de posição disponível para o navio
//   return true;
// }

// function fnEstaNoTabuleiro(i: number, j: number): boolean {
//   // Implementar validação se a posição está no tabuleiro
//   return true;
// }

