import React,{useState,useEffect} from "react";
import {Link} from "react-router-dom";
import Loading from "./Loading/Loading";
import {Button, Input, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import DaumPostcode from "react-daum-postcode";
const Home = () =>{

        const [modal, setModal] = useState(false);
        const [isLoading,setLoading] = useState(false);

        useEffect(()=>{
            setLoading(true);
          setTimeout(()=>{setLoading(false);},1500)
        },[]);

        const toggle = () => setModal(!modal);
        const handleComplete = (data) => {
            console.log(data);
            let fullAddress = data.address;
            let extraAddress = '';
            if (data.addressType === 'R') {
                if (data.bname !== '') {
                    extraAddress += data.bname;
                }
                if (data.buildingName !== '') {
                    extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
                }
                fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
            }
            toggle();
            document.getElementById('address').value = fullAddress;
            console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        }
        return(
            <div>
                <h1>Home</h1>
                {isLoading && <Loading/>}
                <Input id="address" placeholder="주소를 입력창"></Input>
                    <Button color="danger" onClick={toggle}>주소 찾기</Button>
                    <Modal isOpen={modal} toggle={toggle} >
                        <ModalHeader toggle={toggle}>주소 찾기</ModalHeader>
                            <ModalBody>
                                    <DaumPostcode onComplete={handleComplete}/>
                            </ModalBody>
                            <ModalFooter>
                                    <Button color="secondary" onClick={toggle}>닫기</Button>
                            </ModalFooter>
                    </Modal>
            </div>

        )
}
export default Home;