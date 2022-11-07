import React from "react";
import {Row,Col} from "reactstrap";
import '../../css/footer.css';

const Footer =() => {
    return (
        // <div id="main-footer" className="text-center p-2">
        // m-auto 왼쪽오른쪽 여백 알아서 맞춰라. m : margin
        <div id="main-footer" className="text-center p-2">
            <footer>
            <Row>
                <Col>
                    <p>
                        Copyright &copy; <span></span>
                    </p>
                </Col>
            </Row>
            </footer>
        </div>
    );
}

export default Footer;