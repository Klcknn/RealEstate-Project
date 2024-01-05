import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { FaSquareArrowUpRight } from "react-icons/fa6";
import "./style.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RegisterNow = () => {
  const { isUserLogin } = useSelector((state) => state.auth);
  const navigate = useNavigate();


  return (
    <>
      <Container className="register-now-container">
        <Row>
          <Col className="register-left-side" lg={8}>
            <h2>Get your dream house</h2>
            <h6 className="my-4">
              Turn your aspirations into reality with 'Prettier Homes' where your perfect home becomes a possibility.
            </h6>
            {!isUserLogin &&
              <Button className="register-button" onClick={() => navigate("/register")} >
                Register Now <FaSquareArrowUpRight size={"30"} />
              </Button>}
          </Col>
          <Col className="register-right-side" lg={4}>
            <Image
              src={`images/content/highlight.png`}
              className="register-img"
              fluid
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default RegisterNow;
