import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit{
  open: boolean = false;
  somMenu: any = new Audio();
  somBtn: any = new Audio();
  somHomePage: any = new Audio();
  somHomePopup: any = new Audio();

  constructor() {
    this.somBtn.src = "../../assets/audios/sombtnbatalhar.wav";
    this.somHomePage.src = "../../assets/audios/SomHomePage.mp3";
    this.somHomePopup.src = "../../assets/audios/openpopup.mp3";
    this.somMenu.src = "../../assets/audios/somselecao.wav";
  }

  ngOnInit() {
    this.somHomePage.play()
    this.somHomePage.volume = 0.2;

  }

  fnOpen() {
    this.somHomePopup.play();
    this.open = !this.open;
  }

  playSoundSelecao() {
    this.somMenu.play(); // Inicia a reprodução do novo arquivo
  }

  playSoundBtnBatalha() {
    this.somBtn.play();
  }
}
