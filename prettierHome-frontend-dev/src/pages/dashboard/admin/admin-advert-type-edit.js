import React, { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import {
  deleteAdvertType,
  getAdvertTypeById,
  updateAdvertType,
} from "../../../api/advert-type-service";
import { Button, Container, Form } from "react-bootstrap";
import InputText from "../../../components/common/input-text";
import ButtonComponent from "../../../components/common/button-component";
import Spacer from "../../../components/common/spacer";
import { useSelector } from "react-redux";
import { useToast } from "../../../store/providers/toast-provider";
import { MdEditNote } from "react-icons/md";

const AdminAdvertTypeEdit = () => {
  const [flag, setflag] = useState(false);
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const { currentRecord } = useSelector((state) => state.misc);
  const navigate = useNavigate();

  const fetchAdvertType = async () => {
    try {
      const resp = await getAdvertTypeById(currentRecord.id);
      formik.setValues(resp);
      setflag(true);
    } catch (error) {}
  };

  useEffect(() => {
    if (currentRecord) {
      fetchAdvertType();
    } else {
      navigate("/dashboard/advert-types");
    }
  }, []);

  const deleteType = async () => {
    try {
      await deleteAdvertType(currentRecord.id);
      await showToast({
        severity: "success",
        summary: "Success!",
        detail: "Advert type deleted successfully",
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
    }
  };
  const initialValues = null;

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Enter a title")
      .min(5, "Title must be at least 5 characters")
      .max(150, "Title can be at most 150 characters"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await updateAdvertType(values.id, values);
      await showToast({
        severity: "success",
        summary: "Success!",
        detail: "Advert type updated successfully",
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
    enableReinitialize: true,
  });
  return (
    <>
      {flag && (
        <>
          <Spacer />
          <Container className="advert-types-edit">
            <Form noValidate onSubmit={formik.handleSubmit}>
              <InputText
                formik={formik}
                label="Title"
                field="title"
                type={"text"}
              />
              <div className="advert-types-edit-btn-group">
                <Button
                  className="delete-btn"
                  onClick={() => {
                    deleteType();
                  }}
                >
                  DELETE
                </Button>

                <ButtonComponent
                  className="submit-btn"
                  formik={formik}
                  loading={loading}
                  type="submit"
                  text="UPDATE"
                >
                  <MdEditNote className="fs-4" />
                </ButtonComponent>
              </div>
            </Form>
          </Container>
        </>
      )}
    </>
  );
};

export default AdminAdvertTypeEdit;
