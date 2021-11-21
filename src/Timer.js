
function Timer(props) {
  var time = new Date().toLocaleTimeString(),
    hour = new Date().getHours(),
    min = new Date().getMinutes(),
    sec = new Date().getSeconds();

  function tick() {
    const element = (
      <div>
        <h2> now it is: {time}. </h2>
        <h2>
          diff: {new Date().getHours() - hour} : {new Date().getMinutes() - min}{" "}
          : {new Date().getSeconds() - sec} .
        </h2>
        <h2>It is {new Date().toLocaleTimeString()}.</h2>
      </div>
    );
    // highlight-next-line
    ReactDOM.render(element, document.getElementById("root"));
  }

  setInterval(tick, 1000);
}