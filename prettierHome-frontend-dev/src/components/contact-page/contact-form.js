import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { useToast } from '../../store/providers/toast-provider';
import { isInValid, isValid } from '../../helpers/function/forms';
import ReCAPTCHA from 'react-google-recaptcha';
import ButtonComponent from '../common/button-component';
import { RiMailSendLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom';
import { sendMessage } from '../../api/contact-messages';
import { useFormik } from "formik";
import * as Yup from "yup";
import './contact-form.scss';

const recaptchaKey = process.env.REACT_APP_RECAPTCHA_SECRET_KEY;

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [recaptcha, setRecaptcha] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();


  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  }

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required").min(2, "At least 2 characters").max(50, "Max 50 characters"),
    lastName: Yup.string().required("Last name is required").min(2, "At least 2 characters").max(50, "Max 50 characters"),
    email: Yup.string().email("Invalid email").max(50, "Max 50 characters").required("Email is required"),
    message: Yup.string().required("Message is required").min(2, "At least 2 characters").max(250, "Max 250 characters"),
  });

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const resp = await sendMessage(values);
      resetForm();
      showToast({
        severity: 'success',
        summary: 'Success',
        detail: resp,
        icon: <RiMailSendLine size={50} />,
      });
    } catch (error) {
      showToast({
        severity: "error",
        summary: "Error",
        detail: Object.values(error.response.data)[0],
      });
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  })

  const handleRecaptcha = () => {
    setRecaptcha(!recaptcha);
  }

  return (
    <div className="contact-form">
      <Form noValidate onSubmit={formik.handleSubmit} className='form'>
        <h5>Have a question? Get in touch!</h5>

        <Form.Group className="form-input-group" controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text"
            isInvalid={isInValid(formik, "firstName")}
            isValid={isValid(formik, "firstName")}
            {...formik.getFieldProps("firstName")}
          />
          <Form.Control.Feedback type="invalid" className="formik-feedback">
            {formik.errors.firstName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="form-input-group" controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text"
            isInvalid={isInValid(formik, "lastName")}
            isValid={isValid(formik, "lastName")}
            {...formik.getFieldProps("lastName")}
          />
          <Form.Control.Feedback type="invalid" className="formik-feedback">
            {formik.errors.lastName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="form-input-group" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email"
            isInvalid={isInValid(formik, "email")}
            isValid={isValid(formik, "email")}
            {...formik.getFieldProps("email")}
          />
          <Form.Control.Feedback type="invalid" className="formik-feedback">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="form-input-group" controlId="message">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea"
            rows={3}
            placeholder="Type your message here"
            isInvalid={isInValid(formik, "message")}
            isValid={isValid(formik, "message")}
            {...formik.getFieldProps("message")}
          />
          <Form.Control.Feedback type="invalid" className="formik-feedback">
            {formik.errors.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className='recaptcha-wrapper'>
          <ReCAPTCHA
            className={recaptcha ? "d-none" : ""}
            sitekey={recaptchaKey}
            onChange={handleRecaptcha}
            hl='en'
          />
        </div>
        {
          recaptcha
          &&
          <ButtonComponent
            formik={formik}
            loading={loading}
            type="submit"
            text="SEND"
            style={{ borderRadius: "10px", padding: "10px", display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}
          >
            <RiMailSendLine />
          </ButtonComponent>
        }
      </Form>
    </div>
  );
};
export default ContactForm;