import React, { useState,useEffect } from 'react';
import {Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,}from "reactstrap";
import cookie from "react-cookies";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart,faUser,faRightToBracket} from '@fortawesome/free-solid-svg-icons';
import {Link,useHistory} from "react-router-dom";

const Header = () => {
    const history = useHistory();
   const [isOpen, setIsOpen] = useState(false);
   const [userInfo,setUserInfo] = useState(false);
   let [isLogin,setLogin] = useState(false);
   const toggle = () => setIsOpen(!isOpen);
   const userInfoToggle = () => setUserInfo(!userInfo);
   const logout = () =>{
       cookie.remove('userId',{path:'/'});
       cookie.remove('userPassword',{path:'/'});
      window.location.href="/";
   }
   useEffect(()=>{
       const userIdCookie = cookie.load('userId');
       const passwordCookie = cookie.load('userPassword');

       if(userIdCookie){
           const expires = new Date();
           expires.setMinutes(expires.getMinutes()+5);
           cookie.save('userId',userIdCookie,{path:'/',expires});
           cookie.save('userPassword',passwordCookie,{path:'/',expires});
           setLogin(isLogin=true);
       }
   })

        return (
            <div>
                <header>
                    <Navbar color="dark">

                    </Navbar>
                <Navbar color="warning" light={true}  expand="md">
                    <NavbarBrand href="/">Home</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/components/">Components</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="">GitHub</NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Option 1
                                    </DropdownItem>
                                    <DropdownItem>
                                        Option 2
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>
                                        Reset
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        <Nav hidden={isLogin}>
                            <Link to={'/Login'}><FontAwesomeIcon className="fa-2x" icon={faRightToBracket}/><br/>로그인</Link>
                        </Nav>
                        <UncontrolledDropdown hidden={!isLogin}>
                            <DropdownToggle nav caret >
                                <FontAwesomeIcon onClick={userInfoToggle} className="fa-2x" icon={faUser}/>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem onClick={logout}>
                                 로그아웃
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to={'/UserInfo'}>회원정보</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Collapse>
                </Navbar>
                </header>
            </div>
        );


}
export default Header;