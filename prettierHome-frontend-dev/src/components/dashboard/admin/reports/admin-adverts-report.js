import React, { useEffect, useState } from "react";
import {  Col, Container, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isValid, isInValid } from "../../../../helpers/function/forms";
import { config } from "../../../../helpers/config";
import { getAllAdvertsReport } from "../../../../api/report-service";
import "../reports/admin-adverts-report.scss";
import { TfiPrinter } from "react-icons/tfi";
import { useToast } from "../../../../store/providers/toast-provider";
import { IoMdCheckmarkCircleOutline} from "react-icons/io";
import { TbFaceIdError } from "react-icons/tb";
import { getAdvertTypes, getCategories } from "../../../../api/adverts-service";

const AdminAdvertsReport = () => {
  const [loading, setLoading] = useState(false);
  const [advertTypes, setAdvertTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const { showToast } = useToast();

  const initialValues = {
    startDate: "",
    endDate: "",
    category: "",
    type: "",
    status: "",
  };

  const validationSchema = Yup.object({
    startDate: Yup.date().required("Tour date is required"),
    endDate: Yup.date().required("Tour date is required"),
    category: Yup.number().required("Category is required"),
    type: Yup.number().required("Type is required"),
    status: Yup.number().required("Status is required"),
  });

  const loadData = async (values) => {
    setLoading(true);
    try {
      const resp = await getAllAdvertsReport(values);
      showToast({
        severity: 'success',
        summary: 'success',
        detail: 'report printer successfully',
        life: 3000,
        icon: <IoMdCheckmarkCircleOutline  size={50} />,
      })
    } catch (err) {
      const errMsg = err?.response?.data?.message;
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
        icon: <TbFaceIdError  size={50} />,
      });
    } finally {
      setLoading(false);
    }
  };

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

  const handleIconClick = () => {
    const formData = {
      startDate: formik.values.startDate,
      endDate: formik.values.endDate,
      category: formik.values.category,
      type: formik.values.type,
      status: formik.values.status,
    };
    loadData(formData);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
  });

  return (
    <Container className="admin-report-container">
      <Row className="admin-report-form-row">
        <Col xs={12} sm={10} md={10} lg={11} className="admin-report-form-col">
          <Form className="admin-report-form" noValidate>
            <Row className="admin-report-title-row">
              <span className="admin-report-title">Adverts</span>
            </Row>
            <Row className="admin-report-form-row">
              <Col className="admin-report-form-col">
              <Form.Group className="form-group" controlId="startDate">
                <Form.Control
                  type="date"
                  plaseholder=""
                  {...formik.getFieldProps("startDate")}
                  isInvalid={isInValid(formik, "startDate")}
                  isValid={isValid(formik, "startDate")}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.startDate}
                </Form.Control.Feedback>
              </Form.Group>
              </Col>
              <Col className="admin-report-form-col">
              <Form.Group className="form-group" controlId="endDate">
                <Form.Control
                  type="date"
                  plaseholder=""
                  {...formik.getFieldProps("endDate")}
                  isInvalid={isInValid(formik, "endDate")}
                  isValid={isValid(formik, "endDate")}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.endDate}
                </Form.Control.Feedback>
              </Form.Group>
              </Col>
              <Col className="admin-report-form-col">
              <Form.Group className="form-group" controlId="category">
                <Form.Select
                 
                  {...formik.getFieldProps("category")}
                  isInvalid={isInValid(formik, "category")}
                  isValid={isValid(formik, "category")}
                >
                   <option value="" disabled hidden>
                   Category
                  </option>
                  {categories.map((category, index) => (
                    <option key={category} value={index + 1}>
                      {category.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              </Col>
              <Col className="admin-report-form-col">
              <Form.Group className="form-group" controlId="type">
                <Form.Select
                 
                  {...formik.getFieldProps("type")}
                  isInvalid={isInValid(formik, "type")}
                  isValid={isValid(formik, "type")}
                >
                  <option value="" disabled hidden>
                    Type
                  </option>
                  {advertTypes.map((type, index) => (
                    <option key={type} value={index + 1}>
                      {type.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              </Col>
              <Col className="admin-report-form-col">
              <Form.Group className="form-group" controlId="status">
                <Form.Select
                
                  {...formik.getFieldProps("status")}
                  isInvalid={isInValid(formik, "status")}
                  isValid={isValid(formik, "status")}
                >
                  <option value="" disabled hidden>
                    Status
                  </option>
                  {config?.advertsStatus.status.map((status, index) => (
                    <option key={status} value={index}>
                      {status}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col
          xs={12}
          sm={2}
          md={2}
          lg={1}
          className="admin-report-form-icon-col"
        >
          <TfiPrinter onClick={handleIconClick} />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminAdvertsReport;