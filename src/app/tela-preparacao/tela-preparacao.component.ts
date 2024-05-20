import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

export interface IBox {
  selected?: boolean;
  ships?: number;
}
@Component({
  selector: 'app-tela-preparacao',
  templateUrl: './tela-preparacao.component.html',
  styleUrl: './tela-preparacao.component.css'
})
export class TelaPreparacaoComponent {
  public board: Array<Array<IBox>> = [
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  ];



  constructor() { }
  @ViewChild('cdkBoard', { read: ElementRef, static: false }) boardElement!: ElementRef;
  public index: number = -1;
  public ships = [
    { name: "Submarin", size: 1 },
    { name: "frigate", size: 2 },
    { name: "destroyer", size: 3 },
    { name: "cruiser", size: 4 }
  ];

  public shipsInBoard: any[] = [];
  position: any
  drop(event: CdkDragDrop<any[]>) {
    event.previousContainer.data[event.previousIndex].top = this.position ? this.position.y - this.boardElement.nativeElement.getBoundingClientRect().y : 0
    event.previousContainer.data[event.previousIndex].left = this.position ? this.position.x - this.boardElement.nativeElement.getBoundingClientRect().x : 0
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  tst(){

    const btt = document.querySelectorAll(".bt-cell") as NodeListOf<HTMLElement>;

    btt.forEach(bt => {

      console.log(bt)
      this.position = bt.getBoundingClientRect();
    })

  }
}
