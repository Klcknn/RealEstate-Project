import React from "react";
import { Container, Row, Col, Image, Nav, Button } from "react-bootstrap";
import { config } from "../../helpers/config";
import { Link } from "react-router-dom";
import { FaAppStore, FaGooglePlay } from "react-icons/fa";
import "./footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row className="d-flex justify-content-between">
          <Col lg={5} className="text-center text-lg-start mb-4 mb-lg-0">
            <Image
              src={`/logos/logo-white.png`}
              className="img-fluid"
              alt={config.project.name}
            ></Image>
            <p className="mt-3">{config.project.description} </p>
            <div className="d-flex justify-content-center justify-content-lg-start gap-3 mt-4 mb-5 ">
              <Button variant="success" size="md" className="rounded-3 px-3">
                App Store <FaAppStore size={25} className="m ms-2" />
              </Button>
              <Button variant="success" size="md" className="rounded-3 px-3">
                Google Play
                <FaGooglePlay size={25} className="m ms-2" />
              </Button>
            </div>
          </Col>
          <Col md={6} lg={3} className="text-center text-lg-start mb-4 mb-lg-0">
            <h3>Quick Links</h3>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/ad/search">Properties</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>
          </Col>
          <Col md={6} lg={4} className="text-center text-lg-start">
            <h3>Contact</h3>
            <Nav className="flex-column">
              <Nav.Link href={config.contact.center.mapURL} target="_blank">
                {config.contact.center.address}
              </Nav.Link>
              <Nav.Link href={`tel:${config.contact.center.phone}`}>
                {config.contact.center.phone}
              </Nav.Link>
              <Nav.Link href={`mailto:${config.contact.center.email}`}>
                {config.contact.center.email}
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
        <p className="copyright">&copy; {currentYear} PrettierHomes. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
