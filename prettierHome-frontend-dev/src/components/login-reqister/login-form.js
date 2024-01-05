import { useFormik } from "formik";
import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import * as Yup from "yup";
import { Divider } from 'primereact/divider';
import PasswordInput from "../common/password-input";
import { login } from "../../api/auth-service";
import { AiFillApple, AiFillLock, AiFillUnlock, AiOutlineGoogle } from "react-icons/ai";
import ButtonLoader from "../common/button-loader";
import { Link, useNavigate } from "react-router-dom";
import { isValid, isInValid } from "../../helpers/function/forms";
import { useDispatch, useSelector } from "react-redux";
import { failAttempt, login as loginSuccess, resetFailure } from "../../store/slices/auth-slice";
import { setToLocalStorage } from "../../helpers/function/encrypted-storage";
import "./auth-form.scss";
import { useToast } from "../../store/providers/toast-provider";
import { getFavoriteAdvertIdList } from "../../api/user-service";
import { fetchFavs } from "../../store/slices/fav-slice";
import { sideContent } from "../../helpers/config/side-content";
import ReCAPTCHA from "react-google-recaptcha";
import { HiEnvelope } from "react-icons/hi2";

const recaptchaKey = process.env.REACT_APP_RECAPTCHA_SECRET_KEY;
const MAX_FAILURE = 5;

const LoginForm = () => {
  const { failure } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const initialValues = {
    email: "admin@gmail.com",
    password: "admin123!",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const resp = await login(values);
      const { token } = resp;
      setToLocalStorage("token", token);
      dispatch(loginSuccess(resp));

      try {
        const resp = await getFavoriteAdvertIdList();
        dispatch(fetchFavs(resp));
      } catch (err) {
        console.log(err);
      }

      if (resp.role === "ADMIN" || resp.role === "MANAGER") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
      dispatch(failAttempt());
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


  const handleRecaptcha = () => {
    dispatch(resetFailure());
  }

  return (
    <Container>
      <div className='auth-form-container'>
        <Row>
          <Col xs={12} lg={7} className='auth-form-main'>
            <div className="form-icon-wrapper">
              <AiFillLock size={80} />
              <div className="form-icon-text">
                You can login using your PrettierHomes account
              </div>
            </div>
            <div className="form-wrapper">
              <Form
                className="auth-form"
                noValidate
                onSubmit={formik.handleSubmit}
              >
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

                <div className="forgot-password">
                  <Link className="forget-password-link" to="/forgot-password">
                    Forget Password?
                  </Link>
                </div>

                <PasswordInput
                  formik={formik}
                  field="password"
                />

                <div className="form-submit-button">
                  <div className='recaptcha-wrapper'>
                    <ReCAPTCHA
                      className={(failure >= MAX_FAILURE) ? "" : "d-none"}
                      sitekey={recaptchaKey}
                      onChange={handleRecaptcha}
                      hl='en'
                    />
                  </div>
                  {failure < MAX_FAILURE &&
                    <Button
                      variant="secondary"
                      type="submit"
                      className="submit-button"
                      disabled={!formik.isValid || loading}
                    >
                      {loading ? <ButtonLoader size={20} /> : <AiFillUnlock size={20} />} LOGIN
                    </Button>
                  }
                </div>

                <div className="have-account">
                  <div>
                    If you don't have an account.
                  </div>
                  <Link className="have-account-link" to="/register">Create one!</Link>
                </div>

                <Divider align="center">
                  <span>or</span>
                </Divider>

                <div className="auth-form-oauth">
                  <div className="button-wrapper">
                    <Button
                      className="oauth-button google">
                      <AiOutlineGoogle size={25} />
                    </Button>

                    <Button
                      className="oauth-button apple">
                      <AiFillApple size={25} />
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </Col>
          <Col xs={12} lg={5} className='p-0'>
            <div className='auth-form-side'>
              {
                sideContent.authForm.map((item, index) => (
                  <div className="auth-form-side-item" key={index}>
                    <div className="auth-form-side-item-icon" style={item.iconStyle}>
                      {item.icon}
                    </div>
                    <div className="auth-form-side-item-text">
                      {item.text}
                    </div>
                  </div>
                ))
              }
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default LoginForm;
