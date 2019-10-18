import React, { useState } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import Login from "./components/Login";
import "./styles.scss";
import "react-bulma-components/dist/react-bulma-components.min.css";

function App() {
  return (
    <Router>
      <div className="App">
      <nav>
          <NavLink to='/'>Login</NavLink>
          <NavLink to='/bubbles'>See Bubbles</NavLink>
        </nav>
        <Route exact path="/" component={Login} />
        
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
    </Router>
  );
}

export default App;
