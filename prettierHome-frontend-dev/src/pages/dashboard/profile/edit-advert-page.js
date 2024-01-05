import { useEffect, useState } from "react";
import { getAdvertById, updateAdvertByCustomer } from "../../../api/adverts-service";
import PageHeader from "../../../components/common/page-header";
import Spacer from "../../../components/common/spacer";
import AdvertAddress from "../../../components/dashboard/profile/advert-edit-new/advert-address";
import AdvertProperties from "../../../components/dashboard/profile/advert-edit-new/advert-properties";
import { Container, Form } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { TbHomeCog } from "react-icons/tb";
import ButtonComponent from "../../../components/common/button-component";
import AdvertEditCommon from "../../../components/dashboard/profile/advert-edit-new/advert-edit-common";
import DisplayImages from "../../../components/dashboard/profile/advert-edit-new/display-images";
import AdvertEditImage from "../../../components/dashboard/profile/advert-edit-new/advert-edit-image";
import AdvertEditTour from "../../../components/dashboard/profile/advert-edit-new/advert-edit-tour";
import { useToast } from "../../../store/providers/toast-provider";
import { useSelector } from "react-redux";

const EditAdvertPage = () => {
  const {currentRecord } = useSelector(state => state.misc);
  const [loading, setLoading] = useState(false);
  const [flag, setflag] = useState(false);
  const [display, setDisplay] = useState([]);
  const { showToast } = useToast();

  const fetchAdvert = async (id) => {
    try {
      const resp = await getAdvertById(id);

      const mappedAdvert = editAdvert(resp);
      formik.setValues(mappedAdvert);
      setDisplay([...resp.images]);
      setflag(true);
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
  const editAdvert = (advert) => {
    return {
      active: advert.active,
      advertTypeId: advert.advertType.id,
      categoryId: advert.category.id,
      propertyValues: advert.categoryPropertyValue.map((item) => item.value),
      countryId: advert.country.id,
      cityId: advert.city.id,
      districtId: advert.district.id,
      title: advert.title,
      desc: advert.description,
      price: advert.price,
      location: [advert.location.lat, advert.location.lng],
    };
  };

  useEffect(() => {
    fetchAdvert(currentRecord.id);
  }, []);

  const initialValues = null;
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
  });

  const onSubmit = async (values) => {
    setLoading(true);
    const payload = {
      ...values,
      location: {
        lat: values.location[0],
        lng: values.location[1],
      },
    };

    try {
      const resp = await updateAdvertByCustomer(currentRecord.id, payload);
      showToast({
        severity: "success",
        summary: "Success!",
        detail: "Advert updated successfully",
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
  return (
    <>
      {flag && (
        <>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <PageHeader title="EDIT ADVERT" />
            <Spacer />
            <AdvertEditCommon formik={formik} />
            <Spacer height={50} />
            <AdvertAddress formik={formik} />
            <Spacer height={50} />
            <AdvertProperties info={"Update"} formik={formik} />
            <Container className="button-component">
              <ButtonComponent
                formik={formik}
                loading={loading}
                type="submit"
                text="Update"
              >
                <TbHomeCog />
              </ButtonComponent>
            </Container>
            <Spacer />
          </Form>

          <AdvertEditImage
            advertId={currentRecord.id}
            setDisplay={setDisplay}
            display={display}
          />

          <DisplayImages
            display={display}
            setDisplay={setDisplay}
            advertId={currentRecord.id}
          />
          <Spacer />
          <AdvertEditTour />
          <Spacer />
        </>
      )}
    </>
  );
};

export default EditAdvertPage;
