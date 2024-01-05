import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import "./about.scss";
import { GiTreehouse } from "react-icons/gi";
import { HiMiniHomeModern } from "react-icons/hi2";

const About = () => {
  return (
    <>
      <Container className="about-container">
        <Row className="about-wrapper">
          <Col xs={12} lg={5} className="about-left-side">
            <Image
              src="./images/content/about.png"
            ></Image>
          </Col>
          <Col xs={12} lg={7} className="about-right-side">
            <h3>We're on a Mission to Change.<br />View of Real Estate Field.</h3>
            <p>
              At the heart of our vision lies a resolute commitment to transform
              the landscape of the real estate industry. We're not just a
              company; we're on a mission to change the very essence of how real
              estate is perceived and experienced. Our journey is defined by
              innovation, transparency, and a relentless pursuit of excellence.
              With a bold and forward-thinking approach, we seek to
              revolutionize the traditional norms of the real estate field,
              making it more accessible, efficient, and customer-centric. Our
              aspiration is to shape a future where buying, selling, or
              investing in real estate is a seamless and empowering experience
              for all. Join us on this transformative journey as we rewrite the
              narrative of real estate.
            </p>
            <div className="text-icons">
              <div className="icon-group">
                <span className="circle first">
                  <HiMiniHomeModern />
                </span>
                <p>Modern Architect</p>
              </div>
              <div className="icon-group">
                <span className="circle second">
                  <GiTreehouse />
                </span>
                <p> Green Building</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default About;
