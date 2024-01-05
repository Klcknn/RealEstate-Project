import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import "../../profile/advert-edit-new/advert-common.scss";
import { Toast } from "primereact/toast";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { swalAlert } from "../../../common/swal";
import { useFormik } from "formik";
import {
  deleteUser,
  updateOneUser,
} from "../../../../api/user-service";
import { isValid, isInValid } from "../../../../helpers/function/forms";
import ReactInputMask from "react-input-mask-next";
import ButtonLoader from "../../../common/button-loader";
import "../../admin/admin-user-edit/admin-user-delete-save.scss";
import {config} from "../../../../helpers/config";
import { setListRefreshToken } from "../../../../store/slices/misc-slice";
import { MdSaveAlt } from "react-icons/md";
import { useLocation } from 'react-router-dom';
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { TbFaceIdError } from "react-icons/tb";
import { PiHandPalmDuotone } from 'react-icons/pi';
import { useToast } from '../../../../store/providers/toast-provider';
import { prettyConfirm } from '../../../../helpers/function/toast-confirm';

const AdminUserDeleteAndSave = () => {
  const location = useLocation();
  const id = location.state?.id;
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {listRefreshToken } = useSelector(state => state.misc);
  const { showToast } = useToast();

  const initialValues = {
  firstName:location.state.firstName,
  lastName:location.state.lastName,
  phone:location.state.phone,
  email:location.state.email,
  role:location.state.role
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
    email: Yup.string()
      .email("Invalid email")
      .max(50, "Max 50 characters")
      .required("Email is required"),
    role: Yup.string().required("Role is required"),
  });
  const handleDelete = async (event) => {
    

    prettyConfirm({
      event:event,
      message: 'Are you sure you want to delete the user?',
      icon: <PiHandPalmDuotone size={50} />,
      acceptButtonType: 'danger',
      handleAccept: () => confirmDelete(),
      handleReject: () => {
        showToast({
          severity: 'warn',
          summary: 'Canceled',
          detail: 'User not deleted',
          life: 2000,
          icon: <IoMdCloseCircleOutline   size={50} />,
        });
      },
    });
  };

  

  const confirmDelete = async () => {
    try {
      const data = await deleteUser(id);
      showToast({
        severity: 'success',
        summary: 'User deleted',
        detail: 'User deleted successfully',
        life: 2000,
        icon: <IoMdCheckmarkCircleOutline  size={50} />,
      })
      formik.resetForm();
      navigate("dashboard/users");
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
        icon: <TbFaceIdError  size={50} />,
      });
    }
  };

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const resp = await updateOneUser(id,values);
      await showToast({
        severity: "success",
        summary: "Success!",
        detail: "User type save successfully",
        life: 3000,
      });
      navigate("/dashboard/users");
      dispatch(setListRefreshToken(Math.random()));
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
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
    enableReinitialize: true,
  });

  useEffect(() => {
    
  }, [listRefreshToken]);

  return (
    <Container className="admin-user-edit-container">
      <Form className="admin-user-edit-form" noValidate onSubmit={formik.handleSubmit}>
        <Row>
          
          <Col className="admin-user-edit-input-group-first-row  mb-6">
        <Form.Label className="">First name</Form.Label>
        <InputGroup  controlId="firstName">
          <Form.Control
            className="admin-user-edit-input"
            type="text"
            {...formik.getFieldProps("firstName")}
            isInvalid={isInValid(formik, "firstName")}
            isValid={isValid(formik, "firstName")}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.firstName}
          </Form.Control.Feedback>
        </InputGroup>
        </Col>
        <Col className="admin-user-edit-input-group-first-row  mb-6">
        <Form.Label className="">Last name</Form.Label>
        <InputGroup controlId="lastName">
          <Form.Control
            className="admin-user-edit-input"
            type="text"
            {...formik.getFieldProps("lastName")}
            isInvalid={isInValid(formik, "lastName")}
            isValid={isValid(formik, "lastName")}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.lastName}
          </Form.Control.Feedback>
        </InputGroup>
        </Col>
        </Row>
        <Row>
          <Col className="admin-user-edit-input-group mb-6">
        <Form.Label>Phone</Form.Label>
        <InputGroup  controlId="phone">
          <Form.Control
            className="admin-user-edit-input"
            as={ReactInputMask}
            mask="(999) 999-9999"
            type="text"
            placeholder="Phone (XXX) XXX-XXXX"
         
            {...formik.getFieldProps("phone")}
            isValid={isValid(formik, "phone")}
            isInvalid={isInValid(formik, "phone")}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.phone}
          </Form.Control.Feedback>
        </InputGroup>
        </Col>
        <Col className="admin-user-edit-input-group mb-6">
        <Form.Label>Email</Form.Label>
        <InputGroup  controlId="email">
          <Form.Control
            className="admin-user-edit-input"
            type="text"
            {...formik.getFieldProps("email")}
            isInvalid={isInValid(formik, "email")}
            isValid={isValid(formik, "email")}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </InputGroup>
        </Col>
        <Col className="admin-user-edit-input-group mb-6">
        <Form.Label>Roles</Form.Label>
        <InputGroup  controlId="role">
        
        <Form.Select  className="admin-user-edit-input"
         {...formik.getFieldProps("role")}
         isInvalid={isInValid(formik, "role")}
         isValid={isValid(formik, "role")}>
        {config?.selectRoles.roles.map((role) => (
          <option key={role} value={role} >{role}</option>
        ))}
      </Form.Select>
      </InputGroup>
      </Col>
        </Row>
       <Row className="admin-user-button-row">
        <Button
          variant="primary"
          type="reset"
          onClick={(e) =>{handleDelete(e);
          } }
          className="admin-user-button-delete"
          disabled={!formik.isValid || loading}
        >
          {loading ? <ButtonLoader /> :null} DELETE
        </Button>
        <Button
          variant="primary"
          type="submit"
          className="admin-user-button-save"
          disabled={!formik.isValid || loading}
        >
          {loading ? <ButtonLoader /> : <MdSaveAlt />} SAVE
        </Button>
        </Row>
      </Form>
    </Container>
  );
};

export default AdminUserDeleteAndSave;