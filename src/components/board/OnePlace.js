import "./OnePlace.css";
import * as getSizeBord from "./GridGame";

const template = document.createElement("template");

var typePlayer,
  numClicked = 0,
  index,
  initBord = localStorage.getItem("bord");
initBord = JSON.parse(initBord);
let sizeBord = 9;

var emptyBord = [];
for (let i = 0; i < sizeBord; i++) emptyBord[i] = " ";
emptyBord[sizeBord] = "T";

const bord = initBord ?? emptyBord;
var index, player1, player2, nextPlayer;

const style = `<style>
.place-button {
    color: white;
    font-size: xx-large;
    width: 100px;
    height: 100px;
    background: rgba(0, 0, 0, 0.644);
    border: none;
    font-weight: bold;
  }

  .place-button:hover {
    background-color: rgba(12, 12, 129, 0.384);
    font-style: italic;
    
  }

  .place-button:focus {
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
</style>`;

function setPlayerTypePlace(player) {
  typePlayer = player;
}

class OnePlace extends HTMLElement {
  constructor() {
    super();
    index = parseInt(this.getAttribute("name"), 10);
    typePlayer = this.getAttribute("typePlayer");
    player1 = this.getAttribute("player1");
    player2 = this.getAttribute("player2");
    sizeBord = this.getAttribute("sizeBord");
    template.innerHTML =
      style +
      ` <button id="placeButton" class="place-button">
          ${bord[index]}
        </button>
      `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  placebutton() {
    index = this.getAttribute("name");
    if (bord[index] === " ") {
      bord[index] = typePlayer;
      if (typePlayer === player1) nextPlayer = player2;
      else nextPlayer = player1;
      if (numClicked === sizeBord - 1) {
        setTimeout(() => {
          bord[sizeBord] = "T";
        }, 1000);
      }
      numClicked++;

      const btn = this.shadowRoot.getElementById("placeButton");
      btn.innerText = bord[index];
    }
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("#placeButton")
      .addEventListener("click", () => this.placebutton());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector("#place-button").removeEventListener();
  }
}
window.customElements.define("place-component", OnePlace);

export { bord, numClicked, setPlayerTypePlace, nextPlayer, sizeBord };
export default OnePlace;
