import React, { useRef, useState } from "react";
import {  Col, Container, Form, Row } from "react-bootstrap";
import { Toast } from "primereact/toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isValid, isInValid } from "../../../../helpers/function/forms";
import { config } from "../../../../helpers/config";

import "../reports/admin-adverts-report.scss";
import { TfiPrinter } from "react-icons/tfi";
import { getTourRequests } from "../../../../api/report-service";
import { useToast } from "../../../../store/providers/toast-provider";
import { IoMdCheckmarkCircleOutline} from "react-icons/io";
import { TbFaceIdError } from "react-icons/tb";


const AdminTourRequestsReport = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();



  const initialValues = {
    startDate:"" ,
    endDate: "",
    status: "",
  };

  const validationSchema = Yup.object({
    startDate: Yup.date().required("Tour date is required"),
    endDate: Yup.date().required("Tour date is required"),
    status: Yup.number().required("Status is required"),
  });


    
  const loadData = async (values) => {
    setLoading(true);
    try {
      const resp = await getTourRequests(values);
      showToast({
        severity: 'success',
        summary: 'success',
        detail: 'report printer successfully',
        life: 3000,
        icon: <IoMdCheckmarkCircleOutline  size={50} />,
      })
    } catch (err) {
      const errMsg =err?.response?.data?.message;
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
  const handleIconClick = () => {
    const formData = {
      startDate: formik.values.startDate,
      endDate: formik.values.endDate,
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
      <Form className="admin-report-form" noValidate >
        <Row className="admin-report-title-row"><span className="admin-report-title">Tour Requests</span></Row>
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
          <Col  className="admin-report-form-col">
          <Form.Group className="form-group" controlId="status">
            <Form.Select
              className="form-group"
              {...formik.getFieldProps("status")}
              isInvalid={isInValid(formik, "status")}
              isValid={isValid(formik, "status")}
            >
               <option value="" disabled hidden>
                    Status
                  </option>
              {config?.tourRequestStatus.status.map((status,index) => (
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
      <Col xs={12} sm={2} md={2} lg={1} className="admin-report-form-icon-col"><TfiPrinter onClick={handleIconClick} /></Col>
      </Row>
    </Container>
  );
};

export default AdminTourRequestsReport;
