import { useEffect, useState } from "react";
import {
  deleteAdvert,
  findAdvertForAdmin,
  updateAdvertByAdmin,
} from "../../../api/adverts-service";
import Spacer from "../../../components/common/spacer";
import AdvertAddress from "../../../components/dashboard/profile/advert-edit-new/advert-address";
import AdvertProperties from "../../../components/dashboard/profile/advert-edit-new/advert-properties";
import { Button, Container, Form } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { MdEditNote } from "react-icons/md";
import ButtonComponent from "../../../components/common/button-component";
import DisplayImages from "../../../components/dashboard/profile/advert-edit-new/display-images";
import AdvertEditImage from "../../../components/dashboard/profile/advert-edit-new/advert-edit-image";
import { useToast } from "../../../store/providers/toast-provider";
import { useSelector } from "react-redux";
import AdminAdvertEditCommon from "../../../components/dashboard/admin/advert-types/admin-advert-edit-common";
import UserInfo from "../../../components/dashboard/admin/advert-types/user-info";
import { getTourRequestCount } from "../../../api/tour-requests-service";
import { getFavoritesCount } from "../../../api/favorites-service";
import { useNavigate } from "react-router-dom";
import AdminAdvertEditTour from "../../../components/dashboard/admin/advert-types/admin-advert-edit-tour";
import { Fieldset } from "primereact/fieldset";

const AdminAdvertsEdit = () => {
  const { currentRecord } = useSelector((state) => state.misc);
  const [loading, setLoading] = useState(false);
  const [flag, setflag] = useState(false);
  const [display, setDisplay] = useState([]);
  const [user, setUser] = useState({});
  const [favCount, setFavCount] = useState({});
  const [tourRequestCount, setTourRequestCount] = useState({});
  const { showToast } = useToast();
  const navigate = useNavigate();

  //Backendden Status String olarak geliyor seçili olarak göstermek için buraya yazdık
  const statusForAdverts = [
    {
      id: 0,
      name: "PENDING",
    },
    {
      id: 1,
      name: "ACTIVATED",
    },
    {
      id: 2,
      name: "REJECTED",
    },
  ];

  //Advert getirme işlemi (currentRecord'Dan gelen id ile)
  const fetchAdvert = async (id) => {
    try {
      const resp = await findAdvertForAdmin(id);
      const fav = await fetchFavoritesCount(id);
      const tourReq = await fetchTourRequestCount(id);
      setFavCount(fav);
      setTourRequestCount(tourReq);
      setUser(resp);
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

  //Advert update işlemi (currentRecord'Dan gelen id ile)

  const editAdvert = (advert) => {
    return {
      statusForAdvert: findStatusIdByName(advert.statusForAdvert),
      slug: advert.slug,
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

  // responsedan gelen status name ile id bulma
  const findStatusIdByName = (statusName) => {
    const foundStatus = statusForAdverts.find(
      (status) => status.name === statusName
    );
    return foundStatus ? foundStatus.id : null;
  };

  //advertin favori sayısını bulma
  const fetchFavoritesCount = async (id) => {
    try {
      const resp = await getFavoritesCount(id);
      return resp;
    } catch (error) {}
  };

  //advertin tour request sayısını bulma

  const fetchTourRequestCount = async (id) => {
    try {
      const resp = await getTourRequestCount(id);
      return resp;
    } catch (error) {}
  };

  //refresh edildiğinde current record boş olduğu için adverts sayfasına yönlendirme işlemi
  useEffect(() => {
    if (!currentRecord) {
      navigate("/dashboard/adverts");
    } else {
      fetchAdvert(currentRecord.id);
    }
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
      const resp = await updateAdvertByAdmin(currentRecord.id, payload);
      showToast({
        severity: "success",
        summary: "Success!",
        detail: "Advert updated successfully",
        life: 3000,
      });
      navigate("/dashboard/adverts");
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

  const handleDelete = async () => {
    try {
      await deleteAdvert(currentRecord.id);
      showToast({
        severity: "success",
        summary: "Success!",
        detail: "Advert deleted successfully",
        life: 3000,
      });
      navigate("/dashboard/adverts");
    } catch (error) {
      const errMsg = Object.values(error.response.data)[0];
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
      });
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
        <div className="adminn-adverts-edit-page">
          <Form
            noValidate
            onSubmit={formik.handleSubmit}
            className="admin-advert-edit-form"
          >
            <AdminAdvertEditCommon formik={formik} />
            <Spacer height={50} />
            <AdvertAddress formik={formik} />
            <Spacer height={50} />
            <AdvertProperties info={"Update"} formik={formik} />
            <Container className="button-component">
              <Button
                className="delete-btn"
                variant="secondary"
                onClick={() => {
                  handleDelete();
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
            </Container>
            <UserInfo
              resp={user}
              favCount={favCount}
              tourRequestCount={tourRequestCount}
            />
            <Spacer />
          </Form>
          <Container style={{ width: "70%" }} className="gallery">
            <Fieldset legend="Galleries" toggleable collapsed={true}>
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
            </Fieldset>
          </Container>

          <Spacer />
          <Container
            style={{ width: "70%" }}
            className="admin-advert-edit-tour-container"
          >
            <Fieldset legend="Tour Requests" toggleable collapsed={true}>
              <AdminAdvertEditTour />
            </Fieldset>
          </Container>
          <Spacer />
        </div>
      )}
    </>
  );
};

export default AdminAdvertsEdit;
