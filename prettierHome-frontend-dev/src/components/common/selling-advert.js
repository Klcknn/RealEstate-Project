import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import "./selling-advert.scss";
import { GoShieldLock } from "react-icons/go";
import { FaHouseSignal } from "react-icons/fa6";
import { PiTreeFill } from "react-icons/pi";

const SellingAdvert = () => {

  return (
    <Container className="selling-advert-container">
      <Row>
        <Col className="selling-left-side order-lg-1 order-2" lg={6}>
          <Row>
            <div className="left-side-caption">
              <h2>
                Let’s Find The Right <br /> Selling Option For You
              </h2>
            </div>
          </Row>
          <Row>
            <div className="selling-option">
              <span className="circle">
                <FaHouseSignal />
              </span>
              <div className="option-text">
                <h5>Tech-Driven Marketing</h5>
                <span>
                  Real estate is embracing technology with virtual tours,
                  3D models, and blockchain transactions.
                </span>
              </div>
            </div>
          </Row>
          <Row>
            <div className="selling-option">
              <span className="circle">
                <PiTreeFill />
              </span>
              <div className="option-text">
                <h5>Sustainability Matters</h5>
                <span>
                  Green building practices and eco-friendly features are
                  gaining popularity for environmentally conscious buyers.
                </span>
              </div>
            </div>
          </Row>
          <Row>
            <div className="selling-option">
              <span className="circle">
                <GoShieldLock />
              </span>
              <div className="option-text">
                <h5>Remote Work Impact</h5>
                <span>
                  Changing work patterns are reshaping housing preferences,
                  favoring suburban and urban mixed use developments.
                </span>
              </div>
            </div>
          </Row>
        </Col>
        <Col className="selling-right-side order-lg-2 order-1" lg={6}>
          <Image src={`/images/content/adverthome2.jpg`} />
        </Col>
      </Row>
    </Container>
  );
};

export default SellingAdvert;
