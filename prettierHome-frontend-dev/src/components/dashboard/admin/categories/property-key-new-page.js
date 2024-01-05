import React, { useState } from "react";
import Spacer from "../../../common/spacer";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TbFaceIdError } from "react-icons/tb";
import ButtonComponent from "../../../common/button-component";
import { useToast } from "../../../../store/providers/toast-provider";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { savePropertyKey } from "../../../../api/property-key-service";
import { useDispatch, useSelector } from "react-redux";
import PropertyKey from "./property-key-new";
import { setListRefreshToken } from "../../../../store/slices/misc-slice";
import { MdSaveAlt } from "react-icons/md";
import './property-key-new.scss';

const PropertyKeyNewPage = ({ onStateChange }) => {

  const {currentRecord } = useSelector(state => state.misc);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDone, setIsDone] = useState(false);
  
  const isDoneControl = () => {
    setIsDone(true)
  }

  const initialValues = {
    name: "",
    keyType: 10,
    prefix: "",
    suffix: ""
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Enter a name")
      .min(2, "Name must be at least 2 characters")
      .max(80, "Name can be at most 80 characters"),
    keyType: Yup.number()
        .required("Select a property Key type"),
    prefix: Yup.string(),
    suffix: Yup.string()
  });

  const handleParentStateChange = () => {
    onStateChange(true);
  };

  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {

      const { ...rest } = values;

      const propertyKey = {
        ...rest
      };

      await savePropertyKey(currentRecord.id, propertyKey);
      dispatch(setListRefreshToken(Math.random()))
      resetForm();
      handleParentStateChange()
      showToast({
        severity: "success",
          summary: "Saved!",
          detail: "Property Key is saved successfully",
          life: 2000,
          icon: <IoMdCheckmarkCircleOutline  size={50} />
      })

    } catch (err) {
      showToast({
        severity: "error",
        summary: "Error",
        detail: Object.values(err.response.data)[0],
        life: 2000,
        icon: <TbFaceIdError size={50} />,
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
    <>
      <Form noValidate onSubmit={formik.handleSubmit} className="property-key-new-form">
        <Spacer minHeight={25} />
        <PropertyKey formik={formik} />
        <Spacer minHeight={25} />
        <Container className="button-component">
          <ButtonComponent
            formik={formik}
            loading={loading}
            type="submit"
            text="CREATE"
            style={{borderRadius:"10px", padding:"10px 55px"}}
          >
            <MdSaveAlt style={{marginTop:"-3px", fontSize:"1.1rem"}} />
          </ButtonComponent>
          <Button style={{borderRadius:"10px", padding:"10px 30px", marginLeft:"10px"}} onClick={()=>isDoneControl()}>DONE</Button>
          {isDone && navigate("/dashboard/categories")}
        </Container>
      </Form>
    </>
  );
};

export default PropertyKeyNewPage;
