import * as getPlace from "./Place";

const template = document.createElement("template");
template.innerHTML = `
<style>
 .body-reset button{
  border: 20px;
  border-color: white;
  border-radius: 5px;
  padding: 2px 2px;
  width: 50px;
  height: 50px;
  margin-left: 10px;
  font-weight: bold;
  }
</style>
  <div class="body-reset">
    <button id="reset-bord"><slot name="resetGame" /></button>
  <div>
  
`;

const bord = getPlace.bord;

let buttonVal;
class Reset extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  resetBord() {
    console.log(buttonVal);
    localStorage.setItem(
      "bord",
      JSON.stringify([" ", " ", " ", " ", " ", " ", " ", " ", " ", "T"])
    );
    window.location.reload();
  }

  connectedCallback() {
    buttonVal = this.attributes.name.value;
    this.shadowRoot
      .querySelector("#reset-bord")
      .addEventListener("click", () => this.resetBord());
  }
  disconnectedCallback() {
    this.shadowRoot.querySelector("#reset-bord").removeEventListener();
  }
}
window.customElements.define("reset-game", Reset);

export default Reset;
