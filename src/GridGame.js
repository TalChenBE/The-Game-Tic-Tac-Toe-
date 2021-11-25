import Place from "./components/Place";
import * as getBord from "./components/Place";

const sizeBord = getBord.sizeBord;
const template = document.createElement("template");
template.innerHTML = `
<style>
 .body {
  margin: auto;
  width: 310px;
  height: 310px;
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 1fr);
  column-gap: 5px;
  row-gap: 5px;
  align-items: start;
  background-color: white;
}
  }
</style> `;

class GridGame extends HTMLElement {
  constructor() {
    super();
    let el = ``;
    for (let i = 0; i < sizeBord; i++) {
      el += `<Place name=${i} player="X"></Place>`;
    }
    template.innerHTML += `<div class=bord> ${el} </div>`;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
window.customElements.define("grid-game", GridGame);

export default GridGame;
