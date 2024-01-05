import { useFormik } from "formik";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";
import * as Yup from "yup";
import PasswordInput from "../common/password-input";
import ButtonLoader from "../common/button-loader";
import { Link, useNavigate } from "react-router-dom";
import { isValid, isInValid } from "../../helpers/function/forms";
import { register } from "../../api/auth-service";
import ReactInputMask from "react-input-mask-next";
import "./auth-form.scss";
import { HiEnvelope, HiUser, HiPhone } from "react-icons/hi2";
import { PiUserCirclePlusFill } from "react-icons/pi";
import { useToast } from "../../store/providers/toast-provider";
import { sideContent } from "../../helpers/config/side-content";
import PasswordSuggestion from '../common/password-suggestion'

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [focus, setFocus] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const initialValues = {
    firstName: "",
    lastName: "",
    phone: "",
    password: "",
    email: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name is required")
      .min(1, "At least 1 characters")
      .max(50, "Max 50 characters"),
    lastName: Yup.string()
      .required("Last name is required")
      .min(1, "At least 1 characters")
      .max(50, "Max 50 characters"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/\(\d{3}\) \d{3}-\d{4}/g, "Invalid phone number"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "At least 8 characters")
      .max(30, "Max 30 characters")
      .matches(/[a-z]+/g, "One lowercase char")
      .matches(/[A-Z]+/g, "One uppercase char")
      .matches(/[\d+]+/g, "One number")
      .matches(/[!@#$%^&*()_+\-={};':"|,.<>?]+/, "One special character"),
    email: Yup.string()
      .email("Invalid email")
      .max(50, "Max 50 characters")
      .required("Email is required"),
    confirmPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const resp = await register(values);
      resetForm();
      navigate("/login");
    } catch (error) {
      showToast({
        severity: "error",
        summary: "Error",
        detail: Object.values(error.response.data)[0],
        life: 3000,
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
          <Col xs={12} lg={5} className='p-0'>
            {
              focus
                ?
                <PasswordSuggestion formik={formik} field={"password"} />
                :
                <div className='auth-form-side'>
                  <div className="brand-logo">
                    <Image src="/logos/logo-white.png" />
                    <div>
                      Turn Your Dream Home into Reality with PrettierHomes
                    </div>
                  </div>
                  {sideContent.authForm.map((item, index) => (
                    <div className="auth-form-side-item" key={index}>
                      <div className="auth-form-side-item-icon" style={item.iconStyle}>
                        {item.icon}
                      </div>
                      <div className="auth-form-side-item-text">
                        {item.text}
                      </div>
                    </div>
                  ))}
                </div>
            }
          </Col>
          <Col xs={12} lg={7} className='auth-form-main'>
            <div className="form-wrapper">
              <Form
                className="auth-form"
                noValidate
                onSubmit={formik.handleSubmit}
              >
                <InputGroup className="mb-4">
                  <InputGroup.Text className={`${isInValid(formik, "firstName") ? "invalid" : ""}`}>
                    <HiUser />
                  </InputGroup.Text>
                  <Form.Control
                    className="user-input"
                    type="text"
                    placeholder="First Name"
                    {...formik.getFieldProps("firstName")}
                    isInvalid={isInValid(formik, "firstName")}
                    isValid={isValid(formik, "firstName")}
                  />
                  <Form.Control.Feedback type="invalid" className="form-feedback">
                    {formik.errors.firstName}
                  </Form.Control.Feedback>
                </InputGroup>

                <InputGroup className="mb-4">
                  <InputGroup.Text className={`${isInValid(formik, "lastName") ? "invalid" : ""}`}>
                    <HiUser />
                  </InputGroup.Text>
                  <Form.Control
                    className="user-input"
                    type="text"
                    placeholder="Last Name"
                    {...formik.getFieldProps("lastName")}
                    isInvalid={isInValid(formik, "lastName")}
                    isValid={isValid(formik, "lastName")}
                  />
                  <Form.Control.Feedback type="invalid" className="form-feedback">
                    {formik.errors.lastName}
                  </Form.Control.Feedback>
                </InputGroup>

                <InputGroup className="mb-4">
                  <InputGroup.Text className={`${isInValid(formik, "phone") ? "invalid" : ""}`}>
                    <HiPhone />
                  </InputGroup.Text>
                  <Form.Control
                    className="user-input"
                    as={ReactInputMask}
                    mask="(999) 999-9999"
                    type="text"
                    placeholder="(XXX) XXX-XXXX"
                    {...formik.getFieldProps("phone")}
                    isValid={isValid(formik, "phone")}
                    isInvalid={isInValid(formik, "phone")}
                  />
                  <Form.Control.Feedback type="invalid" className="form-feedback">
                    {formik.errors.phone}
                  </Form.Control.Feedback>
                </InputGroup>

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


                <PasswordInput
                  formik={formik}
                  field="password"
                  setFocus={setFocus}
                />

                <PasswordInput
                  placeholder="Confirm Password"
                  formik={formik}
                  field="confirmPassword"
                />


                <div className="form-submit-button">
                  <Button
                    variant="secondary"
                    type="submit"
                    className="submit-button"
                    disabled={!formik.isValid || loading}
                  >
                    {loading ?
                      <ButtonLoader size={20} />
                      :
                      <PiUserCirclePlusFill size={20} />
                    }
                    REGISTER
                  </Button>
                </div>

                <div className="have-account">
                  <div>
                    If you already have an account
                  </div>
                  <Link className="have-account-link" to="/login">Login</Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default RegisterForm;
