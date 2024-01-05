import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./error.scss";

const Error404Page = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title={"NOT FOUND"} />
      <Spacer minHeight={40} />
      <Container className="error-page d-flex justify-content-center align-items-center">
        <Row className="gap-lg-5">
          <Col>
            <Image
              src={"images/error/404.png"}
              alt="Unauthorized"
              width={"400px"}
            />
          </Col>
          <Col className="d-flex align-items-start justify-content-center flex-column text-nowrap">
            <h1 className=" text-primary fw-lighter">
              Oops! It looks like you're lost.
            </h1>
            <h6 className=" mb-5">
              The page you're looking for isn't available. Try to search again
              or use the go to:
            </h6>

            <button
              onClick={() => {
                navigate(-1);
              }}
              className="bg-secondary text-white rounded-3 px-5"
            >
              Go to Home Page
            </button>
          </Col>
        </Row>
      </Container>
      <Spacer minHeight={200} />
    </>
  );
};

export default Error404Page;
