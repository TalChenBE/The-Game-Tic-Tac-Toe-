// import * as getBord from "./components/Place";
import * as getPlayer from "../App";
import OnePlace from "./OnePlace";
import "./GridGame.css";

// var numClicked = 0;
var initBord = localStorage.getItem("bord");
initBord = JSON.parse(initBord);
const sizeBord = 9;

var emptyBord = [];
for (let i = 0; i < sizeBord; i++) emptyBord[i] = " ";
emptyBord[sizeBord] = "T";

const bord = initBord ?? emptyBord;

class GridGame extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let el = ``;
    let typePlayer = this.getAttribute("name");
    for (let i = 0; i < sizeBord; i++) {
      el += `<place-component id="placeBtn" name=${i} typePlayer=${typePlayer} onClickPlace="check"></place-component>`;
    }
    this.innerHTML += `<div class="body"> ${el} </div>`;
  }
}
window.customElements.define("grid-game", GridGame);

export { sizeBord };
export default GridGame;
