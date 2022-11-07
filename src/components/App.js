import React, { useState } from 'react';
import { Route } from "react-router-dom";
import axios from "axios";
import cookie from 'react-cookies';
// css
import '../css/new.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//Header
import Header from './Header/Header';
//Footer
import Footer from './Footer/Footer';
//Main
import Home from './Home';
import Register from './Register/Register';

const App = () => {

    return (
      <div className="App">
        <Header/>

          <Route exact path="/" component={Home}/>
          <Route exact path="/Register" component={Register}/>
        <Footer/>
      </div>
    );

}

export default App;