import { useEffect, useState } from "react";
import { Switch, withRouter, Route, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Nav from "./components/Navigation/Nav";
import axios from "axios";
import Gift from "./components/Gift/Gift";
import config from "./config";
import Login from "./components/Login/Login";

function App() {
  const [isLogedIn, setIsLogedin] = useState()
  const [list, setList] = useState([]);
  useEffect(() => {
    axios
      .get(`http://${config.API_URL}/gifts-list`)

      .then((result) => {
        setList(result.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const removeGift = (event) => {
    event.preventDefault();
    let _id = event.target.name;

    let value = event.target.children[0].value;
    if (value == 0) {
      axios
        .post(`http://${config.API_URL}/taken`, { _id, taken: false })
        .then((result) => {
          console.log(result.data.taken);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .post(`http://${config.API_URL}/taken`, { _id, taken: true })
        .then((result) => {
          console.log(result.data);
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="App">
      {isLogedIn ? (<>
        <Nav />
        <Switch>
          <Route
            exact
            path="/"
            render={(routeProps) => {
              return <Home list={list} {...routeProps} />;
            }} />
          <Route
            exact
            path="/gift-list"
            render={(routeProps) => {
              return <Gift list={list} removeGift={removeGift} {...routeProps} />;
            }} />
        </Switch>
      </>) : (<Redirect  to='/login' render={(routeProps) => {
        return <Login {...routeProps} setIsLogedin={setIsLogedin} />
      }} />)}
    </div>
  );
}

export default withRouter(App);
