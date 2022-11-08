import React,{useState,useEffect} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import axios from "axios";
import Swal from "sweetalert2";
import cookie from "react-cookies";
import {useHistory} from "react-router-dom";

const Login = () => {
    const history = useHistory();


    const login = () => {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        axios.post('/api/login?type=signin', {email: email, password: password})
            .then((res) => {
                console.log(res);
                if(res.data=== "fail"){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: '아이디 또는 비밀번호가 틀렸습니다.'
                    })
                }else{
                    const email = res.data.json[0].user_id;
                    const password = res.data.json[0].user_password;
                    const expires = new Date();
                    expires.setMinutes(expires.getMinutes() + 5);
                    axios.post('/api/login?type=session', {email: email, password: password})
                        .then((res) => {
                            cookie.save('userId',res.data.token1,{path:'/',expires});
                            cookie.save('userPassword',password,{path:'/',expires});
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    setTimeout(()=>{
                        history.push('/');
                    },1500);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <div id="register">

            <h1>Login</h1>
            <Form>
                <FormGroup>
                    <Label for="Email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="with a placeholder" />
                </FormGroup>
                <FormGroup>
                    <Label for="Password">Password</Label>
                    <Input type="password" name="password" id="password" placeholder="password placeholder" />
                </FormGroup>
                <Button onClick={login}>로그인</Button>
            </Form>
        </div>
    )
}
export default Login;