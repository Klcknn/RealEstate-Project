import React, { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import { saveAdvertType } from "../../../api/advert-type-service";
import { Container, Form } from "react-bootstrap";
import InputText from "../../../components/common/input-text";
import ButtonComponent from "../../../components/common/button-component";
import Spacer from "../../../components/common/spacer";
import "../../../components/dashboard/admin/advert-types/advert-type.scss";
import { useToast } from "../../../store/providers/toast-provider";
import { MdSaveAlt } from "react-icons/md";

const AdminAdvertTypeNew = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    title: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Enter a title")
      .min(5, "Title must be at least 5 characters")
      .max(150, "Title can be at most 150 characters"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const resp = await saveAdvertType(values);
      await showToast({
        severity: "success",
        summary: "Success!",
        detail: "Advert type created successfully",
        life: 3000,
      });
      navigate("/dashboard/advert-types");
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
  });

  return (
    <>
      <Spacer />
      <Container className="advert-types-new">
        <Form noValidate onSubmit={formik.handleSubmit}>
          <InputText
            formik={formik}
            label="Title"
            field="title"
            type={"text"}
          />
          <div className="advert-types-new-button">
            <ButtonComponent
              formik={formik}
              loading={loading}
              type="submit"
              text="CREATE"
              style={{ borderRadius: "10px", padding: "10px 55px" }}
            >
              <MdSaveAlt className="fs-4" />
            </ButtonComponent>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AdminAdvertTypeNew;
