import{React, useState } from "react";
import {  Col, Container, Form, Row } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isValid, isInValid } from "../../../../helpers/function/forms";
import "../reports/admin-adverts-report.scss";
import { TfiPrinter } from "react-icons/tfi";
import { getProperties } from "../../../../api/report-service";
import { useToast } from "../../../../store/providers/toast-provider";
import { IoMdCheckmarkCircleOutline} from "react-icons/io";
import { TbFaceIdError } from "react-icons/tb";

const AdminMostPopularProperties = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const initialValues = {
    amount:"" ,
    
  };

  const validationSchema = Yup.object({
    amount: Yup.number()
      .typeError("Only numbers are allowed") // Tip hatası durumunda özel hata mesajı
      .required("Amount is required"),
  });


    
  const loadData = async (amount) => {
    setLoading(true);
    try {
      const resp = await getProperties(amount);
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
  const handleIconClick = () => {
    
   const  amount= formik.values.amount;
    loadData(amount);
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
        <Row className="admin-report-title-row"><span className="admin-report-title">Most Popular Properties</span></Row>
    <Row className="admin-report-form-row">
      <Col className="admin-report-form-col">
          <Form.Group className="form-group" controlId="amount">
            <Form.Control
              type="text"
              plaseholder="Amount"
              {...formik.getFieldProps("amount")}
              isInvalid={isInValid(formik, "amount")}
              isValid={isValid(formik, "amount")}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.amount}
            </Form.Control.Feedback>
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

export default AdminMostPopularProperties;
