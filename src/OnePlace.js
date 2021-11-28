import "./OnePlace.css";
import * as getPlayer from "./App";

const template = document.createElement("template");

var typePlayer;
// const namePlayer = getPlayer.namePlayer;
var numClicked = 0;
var initBord = localStorage.getItem("bord");
initBord = JSON.parse(initBord);
const sizeBord = 9;

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
    color: transparent;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }

  .place-button:focus {
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  }
</style>`;

class PlaceWEB extends HTMLElement {
  constructor() {
    super();
    index = parseInt(this.getAttribute("name"), 10);
    typePlayer = this.getAttribute("typePlayer");
    var p = bord[index];

    template.innerHTML =
      style +
      ` <button id="placeButton" class="place-button" className="lala">
     ${p}
  </button>
  `;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  placebutton() {
    if (bord[this.getAttribute("name")] === " ") {
      console.log("get: " + this.getAttribute("name"));
      bord[this.getAttribute("name")] = this.getAttribute("typePlayer");
      if (bord[sizeBord] === "F") {
        numClicked = 0;
        bord[sizeBord] = "T";
      }
      numClicked++;
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
window.customElements.define("place-component", PlaceWEB);

export { bord, numClicked, sizeBord };
export default PlaceWEB;
