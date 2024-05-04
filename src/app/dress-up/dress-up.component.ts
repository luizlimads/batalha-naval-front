import { Component } from '@angular/core';

@Component({
  selector: 'app-dress-up',
  templateUrl: './dress-up.component.html',
  styleUrl: './dress-up.component.css'
})
export class DressUpComponent {
  state = {
    dress: 0,
    hair: 0,
    hat: 0,
    shoes: 0,
    accessory: 0,
    face: 0
  };

  classDress = "";
  classShoes = "";
  classHair = "";
  classHat = "";
  classFace = "";

  constructor() {
    this.nextdress();
    this.nexthair();
    this.nextface();
  }

  //function to change dress
  nextdress() {
    let dress = document.querySelector("#dress");
    //code from the tutorial example:
    //   if (state.dress === 0) {
    //     dress.setAttribute("class", "dress1");
    //     state.dress++;
    //     console.log(state);
    //   } else if (state.dress === 1) {
    //     dress.setAttribute("class", "dress2");
    //     state.dress++;
    //     console.log(state);
    //   } else if (state.dress === 2) {
    //     dress.setAttribute("class", "dress3");
    //     //set back to 0
    //     state.dress = 0;
    //     console.log(state);
    //   }

    //my refactored version with LESS code and MORE scalability:
    if (this.state.dress < 7) {
      this.state.dress++;
      this.classDress = `dress${this.state.dress}`;
    } else if (this.state.dress === 7) {
      this.state.dress = 0;
      this.classDress = `dress${this.state.dress}`;
    }
  }

  nextshoes() {
    let shoes = document.querySelector("#shoes");
    if (this.state.shoes < 3) {
      this.state.shoes++;
      this.classShoes = `shoes${this.state.shoes}`;
    } else if (this.state.shoes === 3) {
      this.state.shoes = 0;
      this.classShoes = `shoes${this.state.shoes}`;
    }
  }
  nexthair() {
    // let hair = document.querySelector("#hair");
    if (this.state.hair < 5) {
      this.state.hair++;
      this.classHair = `hair${this.state.hair}`;
    } else if (this.state.hair === 5) {
      this.state.hair = 0;
      this.classHair = `hair${this.state.hair}`;
    }
  }

  nexthat() {
    // let hat = document.querySelector("#hat");
    if (this.state.hat < 4) {
      this.state.hat++;
      this.classHat = `hat${this.state.hat}`;
    } else if (this.state.hat === 4) {
      this.state.hat = 0;
      this.classHat = `hat${this.state.hat}`;
    }
  }

  nextface() {
    // let face = document.querySelector("#face");
    if (this.state.face < 2) {
      this.state.face++;
      this.classFace = `face${this.state.face}`;
    } else if (this.state.face === 2) {
      this.state.face = 0;
      this.classFace = `face${this.state.face}`;
    }
  }



}
