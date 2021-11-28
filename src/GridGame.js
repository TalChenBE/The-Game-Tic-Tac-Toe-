// import Place from "./components/Place";
import * as getBord from "./components/Place";
import * as getPlayer from "./App";
import PlaceWEB from "./OnePlace";
import "./GridGame.css";

// var typePlayer = getPlayer.namePlayer;
// const sizeBord = getBord.sizeBord;
var numClicked = 0;
var initBord = localStorage.getItem("bord");
initBord = JSON.parse(initBord);
const sizeBord = 9;

var emptyBord = [];
for (let i = 0; i < sizeBord; i++) emptyBord[i] = " ";
emptyBord[sizeBord] = "T";

const bord = initBord ?? emptyBord;
var typePlayer = "X";
class GridGame extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    var onClickPlace = this.getAttribute("onClickPlace");
    var gridRef = this.getAttribute("ref");
    let el = ``;
    typePlayer = this.getAttribute("name");
    for (let i = 0; i < sizeBord; i++) {
      el += `<place-component id="placeBtn" name=${i} typePlayer=${typePlayer} onClickPlace="check"></place-component>`;
    }
    this.innerHTML += `<div class="body"> ${el} </div>`;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log("grid - typeplayer change!" + name, oldValue, newValue);
  }
}
window.customElements.define("grid-game", GridGame);

export default GridGame;
