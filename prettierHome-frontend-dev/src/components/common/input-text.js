import React from "react";
import { Form } from "react-bootstrap";
import "./input-style.scss";
import { isInValid, isValid } from "../../helpers/function/forms";

const InputText = ({
  formik,
  label,
  type,
  field,
  placeholder,
  handleChange,
  handleValue,
  handleDisable,
  feedback=true
}) => {
  return (
    <Form.Group className="form-text-input-class" controlId={field}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        name={field}
        value={handleValue === undefined ? formik.values[field] : handleValue}
        onBlur={formik.handleBlur}
        onChange={handleChange || formik.handleChange}
        isInvalid={feedback && isInValid(formik, field)}
        isValid={ feedback && isValid(formik, field)}
        disabled={handleDisable}
      />
      <Form.Control.Feedback type="invalid" className="formik-feedback">
        {formik.errors[field]}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default InputText;
