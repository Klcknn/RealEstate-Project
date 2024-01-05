import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import "./error.scss";
import PageHeader from "../../components/common/page-header";
import Spacer from "../../components/common/spacer";
import { useNavigate } from "react-router-dom";

const Error401Page = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader title={"UNAUTHORIZED"} />
      <Spacer minHeight={40} />
      <Container className="error-page d-flex justify-content-center align-items-center">
        <Row className="gap-lg-5">
          <Col>
            <Image
              src={"images/error/401.png"}
              alt="Unauthorized"
              width={"400px"}
            />
          </Col>
          <Col className="d-flex align-items-start justify-content-center flex-column text-nowrap">
            <h1 className=" text-primary fw-lighter">
              Sorry you are not authorized to access.
            </h1>
            <h6 className=" mb-5">
              Please check your login credentials or contact the administrator
            </h6>
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="bg-secondary text-white rounded-3 px-5"
            >
              LOGOUT
            </button>
          </Col>
        </Row>
      </Container>
      <Spacer minHeight={200} />
    </>
  );
};

export default Error401Page;
