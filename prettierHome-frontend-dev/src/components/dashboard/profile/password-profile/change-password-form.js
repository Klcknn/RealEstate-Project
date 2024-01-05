import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import PasswordInput from "../../../common/password-input";
import { changePassword } from "../../../../api/auth-service";
import ButtonLoader from "../../../common/button-loader";
import { useDispatch } from "react-redux";
import { setListRefreshToken, setOperation } from "../../../../store/slices/misc-slice";
import { useNavigate } from 'react-router-dom';
import { useToast } from "../../../../store/providers/toast-provider";
import { MdOutlineSyncLock } from "react-icons/md";
import { HiKey, HiLockClosed, HiArrowPathRoundedSquare } from "react-icons/hi2";
import PasswordSuggestion from "../../../common/password-suggestion";

const ChangePasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const initialValues = {
    currentPassword: "",
    newPassword: "",
    repeatNewPassword: ""
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string()
      .required("New password is required")
      .matches(/[a-z]+/g, "One lowercase char")
      .matches(/[A-Z]+/g, "One uppercase char")
      .matches(/[\d+]+/g, "One number")
      .matches(/[!@#$%^&*()_+\-={};':"|,.<>?]+/, "One special character")
      .min(8, "At least 8 characters")
      .max(30, "Max 30 characters"),
    repeatNewPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("newPassword")], "Passwords must match"),
  });

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const resp = await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      resetForm();
      dispatch(setOperation(null));
      dispatch(setListRefreshToken(Math.random()));
      navigate("/login");
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
    <div className='profile-form-container'>
      <Row>
        <Col xs={12} lg={5} className='p-0'>
          <PasswordSuggestion formik={formik} field={"newPassword"}/>
        </Col>
        <Col xs={12} lg={7} className='profile-form-main'>
          <div className="form-wrapper">
            <Form
              className="profile-form"
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <PasswordInput
                placeholder="Current Password"
                formik={formik}
                field="currentPassword"
              >
                <HiKey />
              </PasswordInput>
              <PasswordInput
                placeholder="New Password"
                formik={formik}
                field="newPassword"
              >
                <HiLockClosed />
              </PasswordInput>
              <PasswordInput
                placeholder="Confirm Password"
                formik={formik}
                field="repeatNewPassword"
              >
                <HiArrowPathRoundedSquare />
              </PasswordInput>
              <div className='form-submit-button'>
                <Button
                  variant="secondary"
                  type="submit"
                  className="submit-button"
                  disabled={!(formik.isValid) || loading}>
                  {loading ? <ButtonLoader size={20} /> : <MdOutlineSyncLock size={20} />} CHANGE
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ChangePasswordForm;
