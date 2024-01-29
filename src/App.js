import { Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Details from "./components/Details";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/details/:name">
          <Details />
        </Route>
        <Route path="/weather/:name">
          <WeatherDetails />
        </Route>
      </Switch>
    </>
  );
}

export default App;
