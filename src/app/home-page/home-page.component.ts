import { Component, OnInit } from '@angular/core';
import { BatalhaNavalService } from '../batalha-naval.service';
import { finalize, pipe, tap } from 'rxjs';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  dataCategorias: any[] = [];
  dataItens: any[] = [];


  open: boolean = false;
  // popupShop: boolean = false;
  // selectGuia: boolean = 
  alguma: boolean = true;
  somMenu: any = new Audio();
  somBtn: any = new Audio();
  somHomePage: any = new Audio();
  somHomePopup: any = new Audio();
  clotheSelected: any;
  activeTab: string = ''; // A guia ativa do shop
  activeTabInvent: string = 'todos'; // guia ativa do inventario

  activePopUp: string = '';

  guiasInvent: any[];
  // guiasShop: any[];
  itensInvent: any[];
  // itensShop: any[];

  oAvatar: any;



  constructor(private service: BatalhaNavalService) {
    this.somBtn.src = "../../assets/audios/sombtnbatalhar.wav";
    this.somHomePage.src = "../../assets/audios/SomHomePage.mp3";
    this.somHomePopup.src = "../../assets/audios/openpopup.mp3";
    this.somMenu.src = "../../assets/audios/somselecao.wav";

    this.guiasInvent = [
      { titulo: 'Camisas', seletor: 'shirt' },
      { titulo: 'Calças', seletor: 'pants'},
      { titulo: 'Chapeus', seletor: 'hat'},
      { titulo: 'Sapatos', seletor: 'shoes'},
    ];

    this.itensInvent = [
      { titulo: 'Chapeu1', categoria: 'hat', imgUrl: "../../assets/imagesAvatar/pirataPrincipalHat.png" },
      { titulo: 'Chapeu2', categoria: 'hat', imgUrl: "../../assets/imagesAvatar/pirataPrincipalHat2.png" },
      { titulo: 'Camisa1', categoria: 'shirt', imgUrl: "../../assets/imagesAvatar/pirataPrincipalShirt.png" },
      { titulo: 'Camisa2', categoria: 'shirt', imgUrl: "../../assets/imagesAvatar/pirataPrincipalShirt2.png" },
      { titulo: 'Calça1', categoria: 'pants', imgUrl: "../../assets/imagesAvatar/pirataPrincipalPants.png" },
      { titulo: 'Calça2', categoria: 'pants', imgUrl: "../../assets/imagesAvatar/pirataPrincipalPants2.png" },
      { titulo: 'Sapatos1', categoria: 'shoes', imgUrl: "../../assets/imagesAvatar/pirataPrincipalShoes.png" },
      { titulo: 'Sapatos2', categoria: 'shoes', imgUrl: "../../assets/imagesAvatar/pirataPrincipalShoes2.png" },
    ];

    this.oAvatar = {};


    for(let element of this.guiasInvent){
        this.oAvatar[element.seletor] = '';
    }

    console.log(this.oAvatar);



  }


  ngOnInit(): void {
    this.activeTab = 'moedas';
    this.activeTabInvent = 'todos';
    // this.somHomePage.play()
    // this.somHomePage.volume = 0.2;


    this.getAllCategorias();
    this.getAllItems();

    
  }

  getAllCategorias() {
    this.service.getAllCategorias().pipe(
      tap((res: any) => {
        this.dataCategorias = res
      }),
      finalize(() => {
        // (document.getElementById("mainH") as HTMLElement).innerHTML = "Categorias - " + this.dataCategorias.length;
        console.log(this.dataCategorias)

      })
    ).subscribe();


  }

  getAllItems() {

    this.service.getAllItems().pipe(
      tap((res: any) => {
        this.dataItens = res

      }),
      finalize(() => {
        // (document.getElementById("mainH") as HTMLElement).innerHTML = "Itens - " + this.dataItens.length;
        console.log(this.dataItens)
      })
    ).subscribe();


  }


  fnSelectedClothe(item: any){
    console.log(item);

    let element = document.getElementById(item.categoria) as HTMLElement;

    

    if(this.oAvatar[item.categoria] == item.titulo){
      this.oAvatar[item.categoria] = '';
      element.style.backgroundImage = '';
    }
    else{
      this.oAvatar[item.categoria] = item.titulo;
      element.style.backgroundImage = `url(${item.imgUrl})`;
    }

    console.log(element.style.backgroundImage);

    console.log(this.oAvatar)
  
  }

  

  
  openTabInvent(tabName: string) {
    console.log(tabName)
    this.somBtn.play();

    this.activeTabInvent = tabName;
    // Aqui você pode adicionar a lógica para exibir os itens da guia clicada
  }


  openTab(tabName: string) {
    this.somBtn.play();

    this.activeTab = tabName;
    // Aqui você pode adicionar a lógica para exibir os itens da guia clicada
  }

  fnOpen(namePopup: string) {
    this.somHomePopup.play();
    this.open = !this.open;
    this.activePopUp = namePopup
  }

  playSoundSelecao() {
    this.somMenu.play(); // Inicia a reprodução do novo arquivo
  }

  playSoundBtnBatalha() {
    this.somBtn.play();
  }

  formatarValor(valor: number): string {
    return valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    // return valor.toFixed(2).replace('.', ','); // Formata para duas casas decimais e substitui ponto por vírgula
  }
}
