import * as getPlace from "./Place";

const template = document.createElement("template");
template.innerHTML = `
<style>
 .body-save button{
 		border: 20px;
     border-color: white;
     border-radius: 5px;
 		 padding: 2px 2px;
     width: 50px;
     height: 50px; 
     margin-right: 10px;    
     font-weight: bold;
  }
</style>
  <div class="body-save">
    <button id="save-bord"><slot name="saveGame" /></button>
  </div>
`;

let buttonVal;
class ButtonCom extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  saveBord() {
    const bord = getPlace.bord;
    console.log(buttonVal);
    localStorage.setItem("bord", JSON.stringify(bord));
  }

  connectedCallback() {
    buttonVal = this.attributes.name.value;
    this.shadowRoot
      .querySelector("#save-bord")
      .addEventListener("click", () => this.saveBord());
  }
  disconnectedCallback() {
    this.shadowRoot.querySelector("#save-bord").removeEventListener();
  }
}
window.customElements.define("ButtonCom-game", ButtonCom);

export default ButtonCom;
