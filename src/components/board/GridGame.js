import "./GridGame.css";

class GridGame extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    let el = ``;
    let typePlayer = this.getAttribute("name");
    let player1 = this.getAttribute("player1"),
      player2 = this.getAttribute("player2");
    const sizeBord = this.getAttribute("sizeBord");
    for (let i = 0; i < sizeBord; i++) {
      el += `<place-component id="placeBtn" name=${i} sizeBord=${sizeBord} typePlayer=${typePlayer} player1=${player1} player2=${player2} onClickPlace="check"></place-component>`;
    }
    this.innerHTML += `<div class="body"> ${el} </div>`;
  }
}
window.customElements.define("grid-game", GridGame);

export default GridGame;
