const template = document.createElement("template");
template.innerHTML = `
<style>
 .body button{
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
  <div class="body">
    <button id="grid-bord"><slot name="saveGame" /></button>
  </div>
`;

class ButtonCom extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector("#grid-bord")
      .addEventListener("click", () => this.saveBord());
  }
  disconnectedCallback() {
    this.shadowRoot.querySelector("#grid-bord").removeEventListener();
  }
}
window.customElements.define("Button-Component", ButtonCom);

export default ButtonCom;
