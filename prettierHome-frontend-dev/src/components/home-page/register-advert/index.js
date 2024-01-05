import React from "react";
import { Button, Container, Image } from "react-bootstrap";
import { HiArrowUpRight } from "react-icons/hi2";
import "./style.scss";

const RegisterAdvert = () => {
  return (
    <>
      <Container className="bg-info rounded-4 d-flex main-box">
        <div className="left-side-advert ">
          <h2>Get your dream house</h2>
          <h6 className="m my-4">
            Turn your aspirations into reality with 'Get Your Dream House where
            your <br /> perfect home becomes a possibility.
          </h6>
          <Button className="btn btn-secondary">
            Register Now <HiArrowUpRight size={"30"} />
          </Button>
        </div>

        <Image
          src={`images/highlight.png`}
          className="img-fluid banner-img img d-none d-lg-block"
        />
      </Container>
    </>
  );
};

export default RegisterAdvert;
