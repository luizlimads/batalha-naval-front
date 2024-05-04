import { Component, input } from '@angular/core';


@Component({
  selector: 'app-tela-admin',
  templateUrl: './tela-admin.component.html',
  styleUrl: './tela-admin.component.css',
})
export class TelaAdminComponent {
  open: boolean = true;
  categoriaSelected = false;
  itemSelected = false;
  dataCategorias: any[];
  dataItens: any[];
  imageUrl: string | ArrayBuffer | null = null;



  constructor() {

    this.dataCategorias = [
      { idCatg: 1, titulo: 'Camisas', seletor: 'shirt' },
      { idCatg: 2, titulo: 'Calças', seletor: 'pants' },
      { idCatg: 3, titulo: 'Chapeus', seletor: 'hat' },
      { idCatg: 4, titulo: 'Sapatos', seletor: 'shoes' },
      { idCatg: 5, titulo: 'Monetario', seletor: 'shoes' },
    ];

    this.dataItens = [
      { titulo: 'Chapeu1', categoria: 'hat', imgUrl: "../../assets/imagesAvatar/pirataPrincipalHat.png", data: "2024-05-03" },
      { titulo: 'Chapeu2', categoria: 'hat', imgUrl: "../../assets/imagesAvatar/pirataPrincipalHat2.png" },
      { titulo: 'Camisa1', categoria: 'shirt', imgUrl: "../../assets/imagesAvatar/pirataPrincipalShirt.png" },
      { titulo: 'Camisa2', categoria: 'shirt', imgUrl: "../../assets/imagesAvatar/pirataPrincipalShirt2.png" },
      { titulo: 'Calça1', categoria: 'pants', imgUrl: "../../assets/imagesAvatar/pirataPrincipalPants.png" },
      { titulo: 'Calça2', categoria: 'pants', imgUrl: "../../assets/imagesAvatar/pirataPrincipalPants2.png" },
      { titulo: 'Sapatos1', categoria: 'shoes', imgUrl: "../../assets/imagesAvatar/pirataPrincipalShoes.png" },
      { titulo: 'Sapatos2', categoria: 'shoes', imgUrl: "../../assets/imagesAvatar/pirataPrincipalShoes2.png" },
    ];

  }



  fnOpen() {
    this.open = !this.open;
  }

  fnShow(e: any) {
    // this.activePopUp = namePopup
    console.log(e)

    const main = document.getElementById("main") as HTMLElement;
    const titleMain = document.getElementById("nomeColecao") as HTMLElement;
    const p = document.getElementById("mainP") as HTMLElement;
    const h = document.getElementById("mainH") as HTMLElement;

    main.style.display = "block";
    titleMain.innerHTML = e;
    p.innerHTML = "Adicionar " + e


    if (e.toLowerCase() === "categorias") {
      this.itemSelected = false;
      this.categoriaSelected = true;

      h.innerHTML = e + " - " + this.dataCategorias.length
    } else {
      this.categoriaSelected = false;
      this.itemSelected = true;

      h.innerHTML = e + " - " + this.dataItens.length
    }
  }


  fnOpenModal() {
    if (this.categoriaSelected) {
      let modalCategoria = document.querySelector(".shadow-modal-catg") as HTMLElement;

      modalCategoria.classList.toggle("active")
    } else if (this.itemSelected) {
      let modalItem = document.querySelector(".shadow-modal-item") as HTMLElement;

      modalItem.classList.toggle("active")
    }
  }


  fnApagaCatg(id: any) {
    // idCatg = e.currentTarget.id
    console.log(id);

    (document.querySelector(".shadow-modal-confirm #txtQual") as HTMLInputElement).value = "Categoria";

    (document.querySelector(".shadow-modal-confirm p") as HTMLInputElement).innerHTML = "Deseja realmente excluir essa categoria?";


    this.fnModalConfirm();

  }

  fnModalConfirm() {
    (document.querySelector(".shadow-modal-confirm") as HTMLElement).classList.toggle("active");

  }


  fnSelectImage() {
    let inputFile = document.getElementById("file") as HTMLElement;
    inputFile.click()
  }


  fnChangeFile(event: any) {
    const file: File = event.target.files[0];
    let imgArea = document.querySelector(".img-area") as HTMLElement;


    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
        imgArea.setAttribute("data-img", file.name);
        imgArea.classList.add("active")
      };

    }
  }

}
