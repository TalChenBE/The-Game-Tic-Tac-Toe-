import "./Place.css";

var numClicked = 0;
var initBord = localStorage.getItem("bord");
initBord = JSON.parse(initBord);

const bord = initBord ?? [" ", " ", " ", " ", " ", " ", " ", " ", " ", "T"];

function Place(props) {
  function handleClick() {
    if (bord[props.name] === " ") {
      bord[props.name] = props.player;
      if (bord[9] === "F") {
        numClicked = 0;
        bord[9] = "T";
      }
    }
  }

  return (
    <button className="place-button" onClick={handleClick}>
      {bord[props.name]}
    </button>
  );
}
export { bord, numClicked };
export default Place;
