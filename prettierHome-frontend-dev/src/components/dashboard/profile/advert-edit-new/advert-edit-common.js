import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import InputText from "../../../common/input-text";
import InputTextArea from "../../../common/input-text-area";
import InputSelect from "../../../common/input-select";
import { getAdvertTypes, getCategories } from "../../../../api/adverts-service";
import "./advert-edit-common.scss";
import { Toast } from "primereact/toast";
import { useToast } from "../../../../store/providers/toast-provider";

const AdvertEditCommon = ({ formik }) => {
  const [advertTypes, setAdvertTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const { showToast } = useToast();

  const fetchAdvertTypes = async () => {
    try {
      const data = await getAdvertTypes();
      setAdvertTypes(data);
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
      });
    }
  };

  useEffect(() => {
    fetchAdvertTypes();
    fetchCategories();
  }, []);

  return (
    <Container className="advert-edit-common">
      <h5>Common Information</h5>
      <Row>
        <InputText
          formik={formik}
          label="Title"
          type="text"
          field="title"
          placeholder={"title"}
        />
      </Row>
      <Row>
        <InputTextArea
          formik={formik}
          label="Description"
          field="desc"
          placeholder={"description"}
        />
      </Row>
      <Row className=" row-cols-1 row-cols-md-2 row-cols-lg-4">
        <Col>
          <InputText
            formik={formik}
            label="Price"
            type={"number"}
            field="price"
            placeholder={"price"}
          />
        </Col>
        <Col>
          {advertTypes.length > 0 && (
            <InputSelect
              formik={formik}
              field={"advertTypeId"}
              label={"Advert Type"}
              type={"Advert Type"}
              options={advertTypes}
            />
          )}
        </Col>
        <Col>
          {categories.length > 0 && (
            <InputSelect
              formik={formik}
              field={"categoryId"}
              label={"Category"}
              type={"Category"}
              options={categories}
            />
          )}
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

export default AdvertEditCommon;
