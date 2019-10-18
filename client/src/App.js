import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage";
import "./styles.scss";
import styled from "styled-components";
import "react-bulma-components/dist/react-bulma-components.min.css";
import withAuthCheck from "./utils/withAuthCheck";

function App() {
  return (
    <Router>
      <div className="App">
      <FancyNav>
          <NavLink to='/'>Login</NavLink>
          <NavLink to='/bubbles'>See Bubbles</NavLink>
        </FancyNav>
        <Route exact path="/" component={Login} />

         <Route path = '/bubbles' render = {props => withAuthCheck(BubblePage, props)} />
        
        {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      </div>
    </Router>
  );
}
const FancyNav = styled.nav`
  display: flex;
  flex-direction: column;
  /* border: .1rem solid; */
  /* justify-content: center; */

  a {
    font-size: 1.7rem;
    margin-top: 4rem;
  }
`
export default App;
