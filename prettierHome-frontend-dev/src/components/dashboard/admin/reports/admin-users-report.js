import{React, useRef, useState } from "react";
import {  Col, Container, Form, Row } from "react-bootstrap";
import { Toast } from "primereact/toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isValid, isInValid } from "../../../../helpers/function/forms";
import "../reports/admin-adverts-report.scss";
import { TfiPrinter } from "react-icons/tfi";
import { getUsers } from "../../../../api/report-service";
import { config } from "../../../../helpers/config";
import { useToast } from "../../../../store/providers/toast-provider";
import { IoMdCheckmarkCircleOutline} from "react-icons/io";
import { TbFaceIdError } from "react-icons/tb";


const AdminUsersReport = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();



  const initialValues = {
    role:"" ,
  };

  const validationSchema = Yup.object({
    role: Yup.string().required("Role is required"),
  });

  const loadData = async (role) => {
    setLoading(true);
    try {
      const resp = await getUsers(role);
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
    
   const  role= formik.values.role;
    loadData(role);
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
        <Row className="admin-report-title-row"><span className="admin-report-title">Users</span></Row>
    <Row className="admin-report-form-row">
      <Col className="admin-report-form-col">
    <Form.Group className="form-group" controlId="role">
            <Form.Select
              className="form-group"
              {...formik.getFieldProps("role")}
              isInvalid={isInValid(formik, "role")}
              isValid={isValid(formik, "role")}
            >
               <option value="" disabled hidden>
                    Role
                  </option>
              {config?.selectRoles.roles.map((role) => (
                <option key={role} value={role}>
                  {role}
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

export default AdminUsersReport;
