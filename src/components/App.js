import React, {useEffect} from 'react';
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
import Login from './Login';
import pwdReset from "./pwdReset";

const App = () => {
    useEffect(() => {
        axios.post('/api/login?type=sessionConfirm',{token1 : cookie.load('userId')})
            .then((res) => {
                console.log(res);
                const userId= res.data.token1;
                const password = cookie.load('userPassword');
                if(password){
                    axios.post('/api/login?type=sessionLogin',{email : userId, password : password})
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    })
    const removeCookie = () => {
        cookie.remove('userId',{path:'/'});
        cookie.remove('userPassword',{path:'/'});
    }
    return (
      <div className="App">
        <Header/>

          <Route exact path="/" component={Home}/>
          <Route exact path="/Register" component={Register}/>
          <Route exact path="/Login" component={Login}/>
            <Route exact path="/pwdReset" component={pwdReset}/>
        <Footer/>
      </div>
    );

}

export default App;