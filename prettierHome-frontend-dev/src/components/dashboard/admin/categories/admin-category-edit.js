import React from "react";
import { Row, Col, Container, Form} from "react-bootstrap";
import InputText from "../../../common/input-text";
import './admin-category-edit.scss';
import FaPicker from "./faPicker";
   

const AdminCategoryEditCommon = ({ formik }) => {

  return (
    <Container className="category-common">
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
      <Col>
          <InputText
            formik={formik}
            label="seq"
            type={"number"}
            field="seq"
            placeholder={"sequence"}
          />
        </Col>
      <Col className="iconPiker-col" >

        <label className="form-label mb-3">Select icon</label>
        <FaPicker
            formik={formik}
            defaultValue={formik.values.icon} 
          />
        </Col>
     
        <Col className="check-switch">
          <Form.Label> Active</Form.Label>
          <Form.Check
            className="custom-switch"
            type="switch"
            id="custom-switch"
            checked={formik.values.active}
            {...formik.getFieldProps("active")}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminCategoryEditCommon;