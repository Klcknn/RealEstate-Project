import { useEffect, useState } from "react";
import Spacer from "../../../common/spacer";
import { Container, Form } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import ButtonComponent from "../../../common/button-component";
import { useToast } from "../../../../store/providers/toast-provider";
import { useSelector } from "react-redux";
import {  updatePropertyKey } from "../../../../api/property-key-service";
import PropertyKey from "./property-key-new";
import { MdEditNote } from "react-icons/md";
import "./property-key-edit.scss";

const PropertyKeyEditPage = ({ onStateChange }) => {

  const {currentObject } = useSelector(state => state.misc);
  const [loading, setLoading] = useState(false);
  const [flag, setflag] = useState(false);
  const { showToast } = useToast();


  const initialValues = {
    ...currentObject,
    keyType: currentObject.keyType === "TEXT" ? "0" : currentObject.keyType === "BOOLEAN" ? "1" : "2"
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Enter a name")
      .min(2, "Name must be at least 2 characters")
      .max(80, "Name can be at most 80 characters"),
    keyType: Yup.number()
        .required("Enter a property Key"),
    prefix: Yup.string(),
    suffix: Yup.string()
  });

  const handleParentStateChange = () => {
    onStateChange(false);
  };

  const onSubmit = async (values) => {
    
    setLoading(true);
    const payload = {
      ...values
    };

    try {
      await updatePropertyKey(currentObject.id, payload);
      formik.resetForm();
      setflag(false);
      handleParentStateChange() 
      showToast({
        severity: "success",
        summary: "Success!",
        detail: "Property Key updated successfully",
        life: 3000,
      });
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
    setflag(true); // No need to fetch category data, just set the flag to true

    return () => {
      setflag(false);
    }

  }, []);

  return (
    <>
      {flag && (
        <>
          <Form noValidate onSubmit={formik.handleSubmit} className="property-key-edit-form">
            <Spacer minHeight={25} />  
            <PropertyKey formik={formik} />
            <Spacer minHeight={25} />
            <Container className="button-component">
              <ButtonComponent
                formik={formik}
                loading={loading}
                type="submit"
                text="UPDATE"
                style={{ borderRadius: "10px", padding: "10px 55px" }}
              >
                <MdEditNote style={{marginTop:"-2px", fontSize:"1.3rem"}} />
              </ButtonComponent>
            </Container>
          </Form>
        </>
      )}
    </>
  );
};

export default PropertyKeyEditPage;
