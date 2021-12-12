const template = document.createElement("template");
template.innerHTML = `
<style>
 .body button{
 		border: 20px;
     border-color: white;
     border-radius: 5px;
 		 padding: 2px 2px;
     width: 70px;
     height: 50px; 
     margin-right: 10px;    
     font-weight: bold;
     background-color: #000428;
     border: thick double rgba(255, 255, 255, 0.4);
  }
</style>
  <div class="body">
    <button id="grid-bord"><slot name="compButton" /></button>
  </div>
`;

class ButtonCom extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
window.customElements.define("button-component", ButtonCom);

export default ButtonCom;
