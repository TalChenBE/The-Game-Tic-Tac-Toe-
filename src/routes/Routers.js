import React from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import Start from "../Start";
import App from "../App";

const Routers = () => (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Start</Link>
        </li>
        <li>
          <Link to="/App">App</Link>
        </li>
      </ul>

      <hr />

      <Switch>
        <Route exact path="/">
          <Start />
        </Route>
        <Route path="/App">
          <App />
        </Route>
      </Switch>
    </div>
  </Router>
);

export default Routers;
