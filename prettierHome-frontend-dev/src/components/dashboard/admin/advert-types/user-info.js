import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import moment from "moment";
const UserInfo = ({ resp, favCount, tourRequestCount }) => {
  const formatDate = (date) => {
    return moment(date).format("MM/DD/YYYY");
  };
  return (
    <Container className="admin-user-info">
      <Row className="row-cols-xs-1 row-cols-sm-1 row-cols-lg-3 row">
        <Col>{resp.user.firstName + " " + resp.user.lastName}</Col>
        <Col>view: {resp.viewCount}</Col>
        <Col>Create Date: {formatDate(resp.createdAt)}</Col>
        <Col>{resp.user.email}</Col>
        <Col> Favorities:{favCount} </Col>
        <Col>Update Date: {formatDate(resp.updatedAt)}</Col>
        <Col>{resp.user.phone}</Col>
        <Col>Tour Requests:{tourRequestCount}</Col>
        <Col>Built In: {resp.builtIn ? "true" : "false"}</Col>
      </Row>
    </Container>
  );
};

export default UserInfo;
