import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrl: './ship.component.css'
})
export class ShipComponent {
  @Input() name!: string;
  @Input() size!:number;
  
  index:number=-1;
}
