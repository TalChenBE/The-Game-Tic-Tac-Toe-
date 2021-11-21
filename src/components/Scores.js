const template = document.createElement("template");
template.innerHTML = `
<style>
.body {
  margin: auto;
  font-family: "Arial", sans-serif;
  max-width: 400px;
  align-items: center;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  column-gap: 5px;
  row-gap: 10px;
  margin-top: 50px;
}
</style>
  <div class="body">

    <h3> Player  ( X ) </h3>
    <h3> TIE </h3>
    <h3> Player  ( O ) </h3>

    <h3><slot name="px" /></h3>
    <h3><slot name="tie" /></h3>
    <h3><slot name="po" /></h3>

</div>
`;

class Scores extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
window.customElements.define("users-scores", Scores);

export default Scores;
