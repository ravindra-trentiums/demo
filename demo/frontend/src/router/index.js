import React from "react";
import Signup from "../views/signup";
import Secret from "../views/secret";
import Login from "../views/login";
import ProtectedRoute from './privateRoute';
import { Link, Route, Switch } from "react-router-dom";
import EditUser from "../views/editUser";

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

export default function App() {
  return (
    <div>
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Signup">Signup</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
        </ul>
      </nav>

      { /* Route components are rendered if the path prop matches the current URL */}
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/Signup"><Signup /></Route>
        <Route exact path="/Login"><Login /></Route>
        <ProtectedRoute exact path="/secret" component={Secret} />
        <ProtectedRoute exact path="/editUser" component={EditUser} />
      </Switch>
    </div>
  );
}
