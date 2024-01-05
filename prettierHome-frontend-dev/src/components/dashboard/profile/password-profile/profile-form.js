import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Row,
  InputGroup,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import ButtonLoader from "../../../common/button-loader";
import { isValid, isInValid } from "../../../../helpers/function/forms";
import ReactInputMask from "react-input-mask-next";
import { updateUser } from "../../../../api/auth-service";
import {
  setListRefreshToken,
  setOperation,
} from "../../../../store/slices/misc-slice";
import { useDispatch, useSelector } from "react-redux";
import { HiEnvelope, HiUser, HiPhone } from "react-icons/hi2";
import { login as loginSuccess } from "../../../../store/slices/auth-slice";
import { useToast } from "../../../../store/providers/toast-provider";
import { PiUserCircleGear } from "react-icons/pi";
import { sideContent } from "../../../../helpers/config/side-content";

const ProfileForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { user } = useSelector((state) => state.auth);

  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
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
    email: Yup.string()
      .email("Invalid email")
      .max(50, "Max 50 characters")
      .required("Email is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/\(\d{3}\) \d{3}-\d{4}/g, "Invalid phone number"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const resp = await updateUser(values);
      dispatch(loginSuccess(resp));
      dispatch(setOperation(null));
      dispatch(setListRefreshToken(Math.random()));
      showToast({
        severity: "success",
        summary: "Updated",
        detail: "Profile updated successfully",
        life: 1500,
      });
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
    enableReinitialize: true,
  });

  return (
    <div className='profile-form-container'>
      <Row>
        <Col xs={12} lg={7} className='profile-form-main'>
          <div className="form-wrapper">
            <Form
              className="profile-form"
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

              <InputGroup className="mb-4" >
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
                  {loading ? <ButtonLoader size={20} /> : <PiUserCircleGear size={20} />} UPDATE
                </Button>
              </div>
            </Form>
          </div>
        </Col>
        <Col xs={12} lg={5} className='p-0'>
          <div className='profile-form-side'>
            {
              sideContent.profileForm.map((item, index) => (
                <div className="profile-form-side-item" key={index}>
                  <div className="profile-form-side-item-icon" style={item.iconStyle}>
                    {item.icon}
                  </div>
                  <div className="profile-form-side-item-text">
                    {item.text}
                  </div>
                </div>
              ))
            }
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileForm;
