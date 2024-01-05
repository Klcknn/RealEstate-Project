import { useFormik } from "formik";
import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { uploadImage } from "../../../../api/image-service";
import * as Yup from "yup";
import AdvertImages from "./advert-images";
import ButtonComponent from "../../../common/button-component";
import { useToast } from "../../../../store/providers/toast-provider";
import { TbUpload } from "react-icons/tb";
import "./advert-edit-image.scss";


const AdvertEditImage = ({ advertId, setDisplay, display }) => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const initialValues = {
    attach: [],
  };

  const validationSchema = Yup.object({
    attach: Yup.array()
      .required("Please upload at least 1 image")
      .min(1, "Please upload at least 1 image")
      .max(
        10 - display.length,
        10 - display.length === 0
          ? "An advert can have a maximum of 10 images"
          : `You can upload at most ${10 - display.length} images`
      )
      .test("is-image", "Please upload only image files", (value) =>
        value.every(
          (file) => file instanceof File && file.type.startsWith("image/")
        )
      )
      .test("file-size", "Each image should be a maximum of 3 MB", (value) => {
        for (let i = 0; i < value.length; i++) {
          if (value[i].size > 3 * 1024 * 1024) {
            return false;
          }
        }
        return true;
      }),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();

      for (const image of values.attach) {
        formData.append("images", image);
      }

      formData.append("advert", advertId);

      const resp = await uploadImage(formData);

      setDisplay((prev) => [...prev, ...resp]);
      showToast({
        severity: "success",
        summary: "Success!",
        detail: "Image uploaded successfully",
        life: 3000,
        icon: "pi pi-check-circle",
      });
    
      formik.resetForm();
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
    <div>
      <Form onSubmit={formik.handleSubmit} noValidate>
        <AdvertImages field={"attach"} formik={formik} />
        <Container className="edit-image-button-container">
          <div className="edit-image-button">
            <ButtonComponent
              formik={formik}
              loading={loading}
              type="submit"
              text="Upload"
              style={{
                width: "110px",
                padding: "10px 15px",
                borderRadius: "10px",
              }}
            >
              <TbUpload />
            </ButtonComponent>
          </div>
        </Container>
      </Form>
    </div>
  );
};

export default AdvertEditImage;
