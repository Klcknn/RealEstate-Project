import { useFormik } from "formik";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  InputGroup,
} from "react-bootstrap";
import * as Yup from "yup";
import ButtonLoader from "../../../common/button-loader";
import { Link, useNavigate } from "react-router-dom";
import { isValid, isInValid } from "../../../../helpers/function/forms";
import { forgotPassword } from "../../../../api/auth-service";
import { useToast } from "../../../../store/providers/toast-provider";
import { SiLetsencrypt } from "react-icons/si";
import { HiEnvelope } from "react-icons/hi2";
import { LuMailQuestion } from "react-icons/lu";
import "../../../login-reqister/auth-form.scss";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      await forgotPassword(values);
      navigate("/reset-password");
    } catch (error) {
      showToast({
        severity: "error",
        summary: "Error",
        detail: Object.values(error.response.data)[0],
        life: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Container>
      <div className='auth-form-container'>
        <Row>
          <Col xs={12} lg={7} className='auth-form-main'>
            <div className="form-wrapper">
              <Form
                className="auth-form"
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <div className="forgot-password">
                  <Link className="forget-password-link" to="/reset-password">
                    Already have code
                  </Link>
                </div>
                <InputGroup className="mb-4">
                  <InputGroup.Text className={`${isInValid(formik, "email") ? "invalid" : ""}`}>
                    <HiEnvelope />
                  </InputGroup.Text>
                  <Form.Control
                    className="user-input"
                    type="text"
                    placeholder="Email"
                    {...formik.getFieldProps("email")}
                    isInvalid={isInValid(formik, "email")}
                    isValid={isValid(formik, "email")}
                  />
                  <Form.Control.Feedback type="invalid" className="form-feedback">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </InputGroup>

                <div className="form-submit-button">
                  <Button
                    variant="secondary"
                    type="submit"
                    className="submit-button"
                    disabled={!formik.isValid || loading}
                  >
                    {loading ? <ButtonLoader size={20} /> : <LuMailQuestion size={20} />} SEND RESET
                    CODE
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
          <Col xs={12} lg={5} className='p-0'>
            <div className='auth-form-side'>
              <SiLetsencrypt size={100} />
              <div className='text-center'>
                <p className='m-0'>If you have forgotten your password, you can request a password reset code to regain access to your account by using the registered email address</p>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default LoginForm;
