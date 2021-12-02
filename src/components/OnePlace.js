import "./OnePlace.css";
import * as getPlayer from "../App.js";
import * as getSizeBord from "./GridGame";

const template = document.createElement("template");

var typePlayer,
  numClicked = 0,
  index,
  initBord = localStorage.getItem("bord");
initBord = JSON.parse(initBord);
const sizeBord = getSizeBord.sizeBord;

var emptyBord = [];
for (let i = 0; i < sizeBord; i++) emptyBord[i] = " ";
emptyBord[sizeBord] = "T";

const bord = initBord ?? emptyBord;

var index;

const style = `<style>
.place-button {
    color: white;
    font-size: xx-large;
    width: 100px;
    height: 100px;
    background: black;
    border: none;
    font-weight: bold;
  }

  .place-button:hover {
    background-color: rgba(3, 3, 32, 0.884);
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

    template.innerHTML =
      style +
      ` <button id="placeButton" class="place-button" className="lala">
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

export { bord, numClicked, sizeBord, setPlayerTypePlace, index };
export default OnePlace;
