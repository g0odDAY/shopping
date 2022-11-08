import React, {useEffect, useState} from 'react';
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
const App = () => {
    let userId = useState('');
    useEffect(() => {
        axios.post('/api/login?type=sessionConfirm',{token1 : cookie.load('userId')})
            .then((res) => {
                console.log(res);
                userId= res.data.token1;
                let password = cookie.load('userPassword');
                console.log(password);
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
    const noPermission = () => {
        if(window.location.hash !== 'noCookie'){
            removeCookie();
            window.location.href = '/';
        }
    }
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
        <Footer/>
      </div>
    );

}

export default App;