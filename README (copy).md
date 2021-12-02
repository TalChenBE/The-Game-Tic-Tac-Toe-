import Place from "./components/Place";
import * as getBord from "./components/Place";
import PlaceWEB from "./OnePlace";
import "./GridGame.css";

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
      el += `<place-component id="placeBtn" name=${i} typePlayer=${typePlayer}></place-component>`;
    }
    template.innerHTML += `<div class=bord> ${el} </div>`;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
window.customElements.define("grid-game", GridGame);

export { GridGame };
export default GridGame;









































  {/* <Place name="0" player={typePlayer} />
        <Place name="1" player={typePlayer} />
        <Place name="2" player={typePlayer} />
        <Place name="3" player={typePlayer} />
        <Place name="4" player={typePlayer} />
        <Place name="5" player={typePlayer} />
        <Place name="6" player={typePlayer} />
        <Place name="7" player={typePlayer} />
        <Place name="8" player={typePlayer} /> */}
        {/* <Place name="9" player={typePlayer} />
        <Place name="10" player={typePlayer} />
        <Place name="11" player={typePlayer} />
        <Place name="12" player={typePlayer} />
        <Place name="13" player={typePlayer} />
        <Place name="14" player={typePlayer} />
        <Place name="15" player={typePlayer} /> */}
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        

