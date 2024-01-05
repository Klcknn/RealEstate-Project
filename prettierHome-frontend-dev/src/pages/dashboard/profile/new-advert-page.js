import React, { useState } from "react";
import PageHeader from "../../../components/common/page-header";
import Spacer from "../../../components/common/spacer";
import AdvertCommon from "../../../components/dashboard/profile/advert-edit-new/advert-common";
import AdvertAddress from "../../../components/dashboard/profile/advert-edit-new/advert-address";
import AdvertProperties from "../../../components/dashboard/profile/advert-edit-new/advert-properties";
import AdvertImages from "../../../components/dashboard/profile/advert-edit-new/advert-images";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TbHomePlus } from "react-icons/tb";
import ButtonComponent from "../../../components/common/button-component";
import { saveAdvert } from "../../../api/adverts-service";
import { useToast } from "../../../store/providers/toast-provider";

const NewAdvertPage = () => {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const initialValues = {
    title: "",
    desc: "",
    price: 0.0,
    advertTypeId: 0,
    categoryId: 1,
    countryId: 0,
    cityId: 0,
    districtId: 0,
    location: [],
    propertyValues: [],
    images: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Enter a title")
      .min(5, "Title must be at least 5 characters")
      .max(150, "Title can be at most 150 characters"),
    desc: Yup.string()
      .required("Enter a description")
      .max(300, "Description can be at most 300 characters"),
    price: Yup.number()
      .required("Enter a price")
      .positive("Price must be positive"),
    advertTypeId: Yup.number()
      .required("Select an advertisement type")
      .notOneOf([0], "Select an advert type"),
    categoryId: Yup.number()
      .required("Select a category")
      .notOneOf([0], "Select a category"),
    countryId: Yup.number()
      .required("Select a country")
      .notOneOf([0], "Select a country"),
    cityId: Yup.number()
      .required("Select a city")
      .notOneOf([0], "Select a city"),
    districtId: Yup.number()
      .required("Select a district")
      .notOneOf([0], "Select a district"),
    location: Yup.array()
      .of(Yup.number())
      .required("Location is required")
      .min(2, "Location must have at least 2 coordinates")
      .max(2, "Location can have at most 2 coordinates"),
    images: Yup.array()
      .required("Please upload at least 1 image")
      .min(1, "Please upload at least 1 image")
      .max(10, "You can upload at most 10 images")
      .test("file-size", "Each image should be a maximum of 3 MB", (value) => {
        for (let i = 0; i < value.length; i++) {
          if (value[i].size > 3 * 1024 * 1024) {
            return false;
          }
        }
        return true;
      })
      .of(
        Yup.mixed().test(
          "is-image",
          "Please upload only image files",
          (value) => value instanceof File && value.type.startsWith("image/")
        )
      ),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();

      for (const image of formik.values.images) {
        formData.append("images", image);
      }

      const { images, ...rest } = values;
      const advert = {
        ...rest,
        location: { lat: rest.location[0], lng: rest.location[1] },
      };
      formData.append("advert", JSON.stringify(advert));

      const resp = await saveAdvert(formData);
      showToast({
        severity: 'success',
        summary: 'Advert created',
        detail: 'Advert created successfully',
        life: 2000,

      })
      navigate("/my-adverts");
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
      <Form noValidate onSubmit={formik.handleSubmit}>
        <PageHeader title="NEW ADVERT" />
        <Spacer />
        <AdvertCommon formik={formik} />
        <Spacer height={50} />
        <AdvertAddress formik={formik} />
        <Spacer height={50} />
        <AdvertProperties formik={formik} />
        <Spacer />
        <AdvertImages formik={formik} field="images" />
        <Spacer />

        <Container className="button-component">
          <ButtonComponent
            formik={formik}
            loading={loading}
            type="submit"
            text="Create"
          >
            <TbHomePlus />
          </ButtonComponent>
        </Container>
        <Spacer />
      </Form>
    </>
  );
};

export default NewAdvertPage;
