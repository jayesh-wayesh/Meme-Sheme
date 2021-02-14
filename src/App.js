import React, {useState,useEffect} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import MemesList from "./components/memes-list.component.js";
import Editmeme from "./components/edit-meme.component.js";
import Creatememe from "./components/create-meme.component.js";
import CreateUser from "./components/create-user.component.js";
import Top from "./components/header.component.js";
import Bottom from "./components/Bottom.component.js";

function App() {

  useEffect(() => {
    const script = document.createElement('script');
  
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
  
    document.body.appendChild(script);
  
    return () => {
      document.body.removeChild(script);
    }
  }, []);

 return (
   <Router>
     <Top/>       
     <div className="container">
        <br/>
        <Route path="/" exact component={MemesList} />
        <Route path="/edit/:id" component={Editmeme} />
        <Route path="/create" component={Creatememe} />
        <Route path="/user" component={CreateUser} />
     </div>
     <Bottom/>       
   </Router>
 );
}
 
export default App;