import React,{useState,useEffect,useRef} from 'react';
import {Button, Card, CardBody, Col, Collapse, Form, FormGroup, FormText, Input, Label} from "reactstrap";
import axios from 'axios';
import '../../css/register.css';
import Swal from 'sweetalert2';
import $ from 'jquery';
import {decode} from "jsonwebtoken";
const Register = () => {
    let [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    let [isValid,setValid] = useState(false);
    let [isInvalid,setInvalid] = useState(false);
    let [isPassword,setPassword] = useState(false);
    let [isPasswordInvalid,setPasswordInvalid] = useState(false);

    let [isCheck,setCheck] = useState(false);
    let [isCheckInvalid,setCheckInvalid] = useState(false);
    let [code,setCode] = useState(0);
    let [isOpen, setIsOpen] = useState(false);

    const pattern1 = /[0-9]/; // 숫자
    const pattern2 = /[a-zA-Z]/; // 문자
    const pattern3 = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
    useEffect(() => {
        const countdown = setInterval(() => {
            if (parseInt(seconds) > 0) {
                setSeconds(parseInt(seconds) - 1);
            }
            if (parseInt(seconds) === 0) {
                if (parseInt(minutes) === 0) {
                    clearInterval(countdown);
                } else {
                    setMinutes(parseInt(minutes) - 1);
                    setSeconds(59);
                }
            }
        }, 100);
        return () => clearInterval(countdown);
    }, [minutes, seconds]);

    // useEffect(() => {
    //    if(minutes === 0 && seconds === 0 && cnt===1){
    //        Swal.fire({
    //             icon: 'error',
    //             title: '인증시간이 만료되었습니다.',
    //             text: '다시 인증해주세요.',
    //             confirmButtonText: '확인'
    //        })
    //
    //    }
    // });
    const toggle = () => setIsOpen(!isOpen);
    const dupliCheck = (e) => {
        e.preventDefault();
        let email = document.getElementById('email');
        if(email.value === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '이메일을 입력해주세요!',
            })
            setValid(isValid= false);
            setInvalid(isInvalid=true);
            return false;
        }
            axios.post('/api/register?type=dupliCheck', {email: email.value})
                .then((res) => {
                    if(res.data.json[0].num === 1){
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: '이미 사용중인 이메일입니다!',
                        })
                        setValid(isValid= false);
                        setInvalid(isInvalid=true);
                    }else{
                        Swal.fire({
                            icon: 'success',
                            title: '사용가능한 이메일입니다!',
                            showConfirmButton: true,
                        })
                        setInvalid(isInvalid= false);
                        setValid(isValid= true);
                    }
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: '이메일 중복체크 실패!'+err,
                    })
                });

    };
    const passwordValidate = (e) => {
        console.log(e.target.value);
        if(!pattern1.test(e.target.value) || !pattern2.test(e.target.value) || !pattern3.test(e.target.value) || e.target.value.length < 8 || e.target.value.length > 20){
            setPassword(isPassword= false);
            setPasswordInvalid(isPasswordInvalid = true);
        }else{
            setPasswordInvalid(isPasswordInvalid = false);
            setPassword(isPassword= true);
        }
    }
    const passwordCheck = (e) => {
        const password = document.getElementById('password');
        setCheckInvalid(isCheckInvalid = true);
        if(password.value === e.target.value){
            setCheckInvalid(isCheckInvalid = false);
            setCheck(isCheck = true);
        }
    }
    const numberValidate = (e) => {
        const numRegexp = /\D/g;
        e.target.value = e.target.value.replace(numRegexp, '');
    }
    const sendSms = (e) => {
        const phoneNumber = document.getElementById('phoneNumber');
        const randomCode = Math.floor(Math.random() * 1000000);
        if(phoneNumber.value === ''){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '휴대폰 번호를 입력해주세요!',
            })
            return false;
        }
        console.log(randomCode);
        setCode(code = randomCode);
        setMinutes(minutes = 1);
        toggle();
        axios.post('/api/sms', {phone: phoneNumber.value.substring(1), randomCode: randomCode})
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const codeValidate = (e) => {
        const smsCode = document.getElementById('smsCode');
        console.log("code",code);
        console.log("smsCode",smsCode.value);
        if(code == smsCode.value){
            Swal.fire({
                icon: 'success',
                title: '인증되었습니다!',
                showConfirmButton: true,
            })
            setIsOpen(isOpen = false);
        }
    }
    const signUp = async (type,e) => {
        let frm = $('form[name=frm]').serialize();
        frm = decodeURIComponent(frm);
        console.log(frm);
        let jsonForm = JSON.stringify(frm).replace(/"/gi,'');
        console.log(jsonForm);
        jsonForm ="{\""+jsonForm.replace(/&/g,'\",\"').replace(/=/gi,'\":"')+"\"}";
        console.log(jsonForm);
        try{
            const response = await fetch('/api/register?type='+type, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonForm,
            });
            const body = await response.json();
            if(body.result === 'succ'){
                Swal.fire({
                    icon: 'success',
                    title: '회원가입이 완료되었습니다!',
                    showConfirmButton: true,
                });
                this.props.history.push('/');
            }
        }catch(e){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '회원가입 실패!'+e,

            });
        }
    }
    return(
        <div id="register">
            <Form id="frm" name='frm' method="post">
                <FormGroup row>
                    <Label for="exampleEmail" sm={2}>
                        이메일
                    </Label>
                    <Col sm={8}>
                        <Input id="email" invalid={isInvalid} valid={isValid}  name="email" placeholder="이메일을 입력하세요." required={true} type="email"/>
                    </Col>
                    <Button color="primary" onClick={e=>dupliCheck(e)}>중복 체크</Button>
                </FormGroup>
                <FormGroup row>
                    <Label for="examplePassword" sm={2}>
                        비밀번호
                    </Label>
                    <Col sm={10}>
                        <Input id="password" name="password" invalid={isPasswordInvalid} valid={isPassword} onKeyUp={e=>passwordValidate(e)} required={true} placeholder="8~16자 영문 대 소 문자 숫자" minLength={8} maxLength={16} type="password"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="password" sm={2}>
                        비밀번호 확인
                    </Label>
                    <Col sm={10}>
                        <Input id="passwordCheck" name="passwordCheck" invalid={isCheckInvalid} valid={isCheck} placeholder="비밀번호 확인" minLength={8} required={true} maxLength={16} onKeyUp={e=>passwordCheck(e)} type="password"/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="phoneNumber" sm={2}>
                        휴대폰 번호
                    </Label>
                    <Col sm={8}>
                        <Input id="phoneNumber" name="phoneNumber" placeholder="'-' 빼고 입력."  onInput={e=>numberValidate(e)} required={true} maxLength={11} type="text"/>
                    </Col>
                    <Button color="primary" onClick={e=>sendSms(e)}>인증 요청</Button>
                </FormGroup>
                <Collapse isOpen={isOpen}>
                <FormGroup row>
                    <Label sm={2}>
                        인증번호
                    </Label>
                    <Col sm={5}>
                        <Input id="smsCode" name="smsCode" placeholder="인증번호를 입력하세요."  type="text"/>
                    </Col>
                    <Button color="primary" onClick={e=>codeValidate(e)}>인증</Button>
                    <Label>{minutes}분{seconds < 10 ? `0${seconds}` : seconds}초</Label>
                </FormGroup>
                </Collapse>

                <FormGroup row>
                    <Label for="exampleFile" sm={2}>
                        생년월일
                    </Label>
                    <Col sm={10}>
                        <Input id="birthDate" name="birthDay" required={true} type="date"/>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Button onClick={e=>signUp('signup',e)}>
                        회원가입
                    </Button>
                </FormGroup>
            </Form>
        </div>
    )
}
export default Register;