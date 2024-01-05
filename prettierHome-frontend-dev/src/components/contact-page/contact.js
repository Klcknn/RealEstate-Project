import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Map from "./map";
import ContactForm from "./contact-form";
import Spacer from "../common/spacer";
import Offices from "./offices";
import "./contact.scss";

const Contact = () => {
  return (
    <>
      <Container className="contact-container">
        <div className="map-wrapper">
          <Map />
        </div>
        <Row className="">
          <Col xs={12} md={7} lg={6}>
            <ContactForm />
          </Col>
          <Col xs={12} md={5} lg={6}>
            <div className="contact-form-text">
              <h4>We'd Love To Hear From You.</h4>
              <p >
                We are here to answer any question you may have. As a partner of corporates, Prettier Homes has more than 1,000 offices of all sizes and all potential of session.</p>
            </div>
          </Col>
        </Row>
        <Spacer />
      </Container>
      <Offices/>
    </>
  );
};

export default Contact;
