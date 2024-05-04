import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-dress-up-avatar',
  templateUrl: './dress-up-avatar.component.html',
  styleUrl: './dress-up-avatar.component.css'
})
export class DressUpAvatarComponent {

  @ViewChild('canvasElement', { static: false }) canvasElement!: ElementRef;
  context!: CanvasRenderingContext2D;
  

  // context!: CanvasRenderingContext2D;

  state = {
    dress: 0,
    hair: 0,
    hat: 0,
    shoes: 0,
    accessory: 0,
    face: 0,
    shirt: 0,
    pants: 0
  };

  classDress = "";
  classShoes = "";
  classHair = "";
  classHat = "";
  classFace = "";
  classPants = "";
  classShirt = "";

  constructor() {
    // this.nextdress();
    // this.nexthair();
    // this.nextface();
  }


  ngAfterViewInit(): void {
    const canvas = this.canvasElement.nativeElement as HTMLCanvasElement;
    this.context = canvas.getContext('2d') as CanvasRenderingContext2D;


    const imgInit = new Image();
    imgInit.src = "../../assets/imagesAvatar/pirataPrincipalPelado.png";



    // console.log(img1.src)
    imgInit.onload = () => {
      // Dimensões desejadas para a nova imagem

      this.context.drawImage(imgInit, 0, 0);
    }
  }


  



  //function to change dress
  nextdress() {
    //my refactored version with LESS code and MORE scalability:
    if (this.state.dress < 2) {
      this.state.dress++;
      this.classDress = `dress${this.state.dress}`;
    } else if (this.state.dress === 1) {
      this.state.dress = 0;
      this.classDress = `dress${this.state.dress}`;
    }
  }

  nextShoes() {
    // let shoes = document.querySelector("#shoes");
    if (this.state.shoes < 2) {
      this.state.shoes++;
      this.classShoes = `shoes${this.state.shoes}`;
    } else if (this.state.shoes === 2) {
      this.state.shoes = 0;
      this.classShoes = `shoes${this.state.shoes}`;
    }

    // this.render();
  }
  nextShirt() {
    // let hair = document.querySelector("#hair");
    if (this.state.shirt < 2) {
      this.state.shirt++;
      this.classShirt = `shirt${this.state.shirt}`;
    } else if (this.state.shirt === 2) {
      this.state.shirt = 0;
      this.classShirt = `shirt${this.state.shirt}`;
    }

    // this.render();

  }

  nextHat() {
    // let hat = document.querySelector("#hat");
    if (this.state.hat < 2) {
      this.state.hat++;
      this.classHat = `hat${this.state.hat}`;
    } else if (this.state.hat === 2) {
      this.state.hat = 0;
      this.classHat = `hat${this.state.hat}`;
    }
    // this.render();

  }

  nextPants() {
    // let face = document.querySelector("#face");
    if (this.state.pants < 2) {
      this.state.pants++;
      this.classPants = `pants${this.state.pants}`;
    } else if (this.state.pants === 2) {
      this.state.pants = 0;
      this.classPants = `pants${this.state.pants}`;
    }

    console.log("CHAMEI", this.state.pants)

    // this.render();
  }


  // ngAfterViewInit(): void {
  render() {
    // Limpar o canvas
    this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);


    // const canvas = this.canvasElement.nativeElement;
    // const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    // Renderiza o avatar com as roupas selecionadas
    const avatarElement = document.getElementById('avatar') as HTMLElement;
    const avatarStyle = window.getComputedStyle(avatarElement);

    const hatElement = document.getElementById('hat') as HTMLElement;
    const hatStyle = window.getComputedStyle(hatElement);

    const shirtElement = document.getElementById('shirt') as HTMLElement;
    const shirtStyle = window.getComputedStyle(shirtElement);

    const pantsElement = document.getElementById('pants') as HTMLElement;
    const pantsStyle = window.getComputedStyle(pantsElement);

    const shoesElement = document.getElementById('shoes') as HTMLElement;
    const shoesStyle = window.getComputedStyle(shoesElement);

    // Desenhar a primeira imagem
    const img1 = new Image();
    img1.src = avatarStyle.backgroundImage.replace('url("', '').replace('")', '');
    // console.log(img1.src)
    img1.onload = () => {
      this.context.drawImage(img1, 0, 0);

      // Desenhar a segunda imagem em cima da primeira
      const img2 = new Image();
      img2.src = hatStyle.backgroundImage.replace('url("', '').replace('")', '');
      img2.onload = () => {
        this.context.drawImage(img2, 0, 0);
      }

      // Desenhar a segunda imagem em cima da primeira
      const img3 = new Image();
      img3.src = shirtStyle.backgroundImage.replace('url("', '').replace('")', '');
      img3.onload = () => {
        this.context.drawImage(img3, 0, 0);
      }

      // Desenhar a segunda imagem em cima da primeira
      const img4 = new Image();
      img4.src = pantsStyle.backgroundImage.replace('url("', '').replace('")', '');
      img4.onload = () => {
        this.context.drawImage(img4, 0, 0);
      }

      // Desenhar a segunda imagem em cima da primeira
      const img5 = new Image();
      img5.src = shoesStyle.backgroundImage.replace('url("', '').replace('")', '');
      img5.onload = () => {
        this.context.drawImage(img5, 0, 0);
      }

    }

    // this.salvarImagem()
  }

  salvarImagem(): void {
    // this.render()
    const canvas = this.canvasElement.nativeElement as HTMLCanvasElement;

    const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'imagem.png';
    link.click();
  }


}
