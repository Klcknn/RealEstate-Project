import React from "react";
import { Row, Col, Container, Form} from "react-bootstrap";
import InputText from "../../../common/input-text";
import './category-new.scss';
import FaPicker from "./faPicker";

const AdminCategoryNewCommon = ({ formik }) => {

  return (
    <Container className="category-new">
      <Row>
        <InputText
          formik={formik}
          label="Title"
          type="text"
          field="title"
          placeholder={"title"}
        />
      </Row>
      <Row className=" row-cols-1 row-cols-lg-3 ">
      <Col className="text-center">
          <InputText
            formik={formik}
            label="seq"
            type={"number"}
            field="seq"
            placeholder={"sequence"}
          />
        </Col>
      <Col className="d-flex flex-column justify-content-center align-items-center mb-5">

          <label className="form-label mb-3">Select icon</label>
          <FaPicker
          formik={formik}
          />

        </Col>
     
        <Col className="check-switch">
          <Form.Label> Active</Form.Label>
          <Form.Check
            className="custom-switch"
            type="switch"
            id="custom-switch"
            checked={formik.values.active}
            value={formik.values.active ? 'true' : 'false'}  // Set a non-null value
            {...formik.getFieldProps("active")}
          />
        </Col>
      {/*
        <Col className="d-flex justify-content-between align-items-center">
            <InputSwitch
              checked={formik.values.active}  // Formunuzun kontrol ettiği durumu kullan
              onChange={(e) => formik.setFieldValue("active", e.value)}  // formik ile değeri güncelle
            />
        </Col>
      */}
      </Row>
    </Container>
  );
};

export default AdminCategoryNewCommon;
