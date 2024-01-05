import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./needhelp.scss";
import { RiMailSendLine } from "react-icons/ri";
import { HiOutlinePhone } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const NeedHelp = () => {
  const navigate = useNavigate();

  return (
    <Container className="need-help">
      <Row>
        <Col xs={12} md={7} lg={8} className="need-help-text">
          <h2>Need help? Talk to our expert.</h2>
          <h6>Talk to our experts or Browse through more properties.</h6>
        </Col>
        <Col xs={12} md={5} lg={4} className="need-help-buttons">
          <button className="mail-button" onClick={() => navigate("/contact")}>
            <RiMailSendLine />
            Mail Us
          </button>
          {/* bu kısımda navigate contact sayfasındaki offices idli dive gitmeli */}
          <button className="phone-button" onClick={() => navigate("/contact")}>
            <HiOutlinePhone />
            Contact Us
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default NeedHelp;
