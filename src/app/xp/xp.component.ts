import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GiraImgs } from '../gira-imgs';

@Component({
  selector: 'app-xp',
  templateUrl: './xp.component.html',
  styleUrl: './xp.component.css'
})
export class XpComponent implements AfterViewInit {

  // @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  // rotatedImages: string[] = [];

  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  private girarImgs!: GiraImgs;

  constructor() {
  }

  ngAfterViewInit() {
    this.girarImgs = new GiraImgs(this.canvas.nativeElement);
  }

  

  loadImageFromDatabase() {
    const base64Image = 'data:image/png;base64,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'; // Substitua pelo Base64 da imagem do banco de dados
    this.girarImgs.loadImage(base64Image);
  }

  printRotatedImages() {
    console.log(this.girarImgs.getImgGiradas());
  }
  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = (e: any) => {
  //     const img = new Image();
  //     img.onload = () => {
  //       const canvas = this.canvas.nativeElement;
  //       const ctx = canvas.getContext('2d');
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       ctx!.drawImage(img, 0, 0);
  //       this.saveRotatedImages();
  //     };
  //     img.src = e.target.result;
  //   };
  //   reader.readAsDataURL(file);
  // }

  // rotateAndSave(degrees: number) {
  //   const canvas = this.canvas.nativeElement;
  //   const width = canvas.width;
  //   const height = canvas.height;
  //   const rotatedCanvas = document.createElement('canvas');
  //   const rotatedCtx = rotatedCanvas.getContext('2d');

  //   if (degrees === 90 || degrees === 270) {
  //     rotatedCanvas.width = height;
  //     rotatedCanvas.height = width;
  //   } else {
  //     rotatedCanvas.width = width;
  //     rotatedCanvas.height = height;
  //   }

  //   rotatedCtx!.translate(rotatedCanvas.width / 2, rotatedCanvas.height / 2);
  //   rotatedCtx!.rotate(degrees * Math.PI / 180);
  //   rotatedCtx!.drawImage(canvas, -width / 2, -height / 2);

  //   const imgSrc = rotatedCanvas.toDataURL();
  //   this.rotatedImages.push(imgSrc);
  // }

  // saveRotatedImages() {
  //   this.rotatedImages = []; // Clear previous images
  //   // this.rotateAndSave(0);
  //   this.rotateAndSave(90);
  //   this.rotateAndSave(180);
  //   this.rotateAndSave(270);
  // }

  // // Método para acessar as imagens rotacionadas
  // getRotatedImage(degrees: number): string {
  //   const index = degrees / 90;
  //   return this.rotatedImages[index];
  // }

  // print(){
    
  //   console.log(this.rotatedImages)
  // }

  // onFileSelected(event: any) {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = (e: any) => {
  //     const img = new Image();
  //     img.onload = () => {
  //       const canvas = this.canvas.nativeElement;
  //       const ctx = canvas.getContext('2d');
  //       canvas.width = img.width;
  //       canvas.height = img.height;
  //       ctx?.drawImage(img, 0, 0);
  //       this.saveRotatedImages();
  //     };
  //     img.src = e.target.result;
  //   };
  //   reader.readAsDataURL(file);
  // }

  // rotateAndSave(degrees: number) {
  //   const canvas = this.canvas.nativeElement;
  //   const width = canvas.width;
  //   const height = canvas.height;
  //   const rotatedCanvas = document.createElement('canvas');
  //   const rotatedCtx = rotatedCanvas.getContext('2d');

  //   if (degrees === 90 || degrees === 270) {
  //     rotatedCanvas.width = height;
  //     rotatedCanvas.height = width;
  //   } else {
  //     rotatedCanvas.width = width;
  //     rotatedCanvas.height = height;
  //   }

  //   rotatedCtx?.translate(rotatedCanvas.width / 2, rotatedCanvas.height / 2);
  //   rotatedCtx?.rotate(degrees * Math.PI / 180);
  //   rotatedCtx?.drawImage(canvas, -width / 2, -height / 2);

  //   const img = new Image();
  //   img.src = rotatedCanvas.toDataURL();
  //   img.alt = `Rotated ${degrees} degrees`;

  //   const link = document.createElement('a');
  //   link.href = img.src;
  //   link.download = `image_${degrees}_degrees.png`;
  //   link.appendChild(img);
  //   this.imagesDiv.appendChild(link);
  // }

  // saveRotatedImages() {
  //   this.imagesDiv.innerHTML = ''; 
  //   this.rotateAndSave(0);
  //   this.rotateAndSave(90);
  //   this.rotateAndSave(180);
  //   this.rotateAndSave(270);
  // }

  levels: number[] = [
    0, 10, 30, 90, 270, 510, 830, 1090, 1570, 2000,
    4000, 7000, 9999, 15000, 20000, 50000
  ];
  maximo: boolean = false;
  level: number = 0;
  exp: number = 0;
  xpGanha: number = 0;
  expTotal: number = 0;
  levelUp: number = 0;

  calcularXP() {
    if (this.maximo) {
      alert('Seu Level já está no máximo.');
      return;
    }

    let xp = this.xpGanha;
    this.expTotal += xp;

    this.levelUp = 0;

    while (xp > 0) {
      if ((this.exp + xp) >= this.levels[this.level]) {
        this.level++;
        this.levelUp++;
        xp -= (this.levels[this.level] - this.exp);
        this.exp = 0;

        if (this.levels[this.level] === undefined) {
          alert('Parabéns! Você atingiu o nível máximo.');
          this.maximo = true;
          xp = 0;
        }
      } else {
        this.exp += xp;
        xp = 0;
      }
    }
  }
}
