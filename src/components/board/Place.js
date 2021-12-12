import "./Place.css";

var numClicked = 0;
var initBord = localStorage.getItem("bord");
initBord = JSON.parse(initBord);
const sizeBord = 9;

var emptyBord = [];
for (let i = 0; i < sizeBord; i++) emptyBord[i] = " ";
emptyBord[sizeBord] = "T";

const bord = initBord ?? emptyBord;

function Place(props) {
  function handleClick() {
    if (bord[props.name] === " ") {
      bord[props.name] = props.player;
      if (bord[sizeBord] === "F") {
        numClicked = 0;
        bord[sizeBord] = "T";
      }
      numClicked++;
    }
  }

  return (
    <button className="place-button" onClick={handleClick}>
      {bord[props.name]}
    </button>
  );
}
export default Place;
