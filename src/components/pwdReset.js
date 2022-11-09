import React from 'react';
import {useHistory} from "react-router-dom";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import axios from "axios";
import Swal from "sweetalert2";

const PwdReset = () => {
    const history = useHistory();
    const sendMail = () => {

        const email = document.getElementById('email').value;
        axios.post('/api/login?type=pwdReset', {email: email})
            .then((res) => {
               console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return (
        <div id={"register"}>
            <h1>비밀번호 찾기</h1>
            <Form>
                <FormGroup>
                    <Label for="Email">Email</Label>
                    <Input type="email" name="email" id="email" placeholder="with a placeholder" />
                </FormGroup>
                <Button onClick={sendMail}>이메일 전송</Button>
                <Button onClick={()=>history.push('/login')}> 취소</Button>
            </Form>
        </div>
    );
}
export default PwdReset;