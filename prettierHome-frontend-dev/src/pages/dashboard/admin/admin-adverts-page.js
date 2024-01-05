import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Form, Row, Button, Image } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  getAdvertTypes,
  getAdvertsForAdmin,
  getCategories,
} from "../../../api/adverts-service";
import InputText from "../../../components/common/input-text";
import InputSelect from "../../../components/common/input-select";
import { IoSearchOutline } from "react-icons/io5";
import ButtonComponent from "../../../components/common/button-component";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { deleteAdvert, getAdverts } from "../../../api/adverts-service";
import "../../../components/dashboard/profile/my-adverts.scss";
import { FaRegEye } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { FiTrash } from "react-icons/fi";
import { LuPencil } from "react-icons/lu";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TbFaceIdError } from "react-icons/tb";
import { Image as FullImage } from "primereact/image";

import {
  setCurrentRecord,
  setListRefreshToken,
} from "../../../store/slices/misc-slice";
import { getFavoritesCount } from "../../../api/favorites-service";
import { getTourRequestCount } from "../../../api/tour-requests-service";
import { prettyConfirm } from "../../../helpers/function/toast-confirm";
import { PiHandPalmDuotone } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Spacer from "../../../components/common/spacer";
import { useToast } from "../../../store/providers/toast-provider";

const AdminAdvertsPage = () => {
  const { showToast } = useToast();
  const [advertTypes, setAdvertTypes] = useState([]);
  const [adverts, setAdverts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const { listRefreshToken } = useSelector((state) => state.misc);
  const [favoritesCounts, setFavoritesCounts] = useState([]);
  const [tourRequestCounts, setTourRequestCounts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 5,
    page: 0,
    sortField: null,
    sortOrder: null,
  });
  const onPage = (event) => {
    setlazyState(event);
  };
  const getOperationButtons = (row) => {
    if (row.builtIn) return null;

    return (
      <div className="operationsButton">
        <Button className="btn-link" onClick={(e) => handleDelete(e, row)}>
          <FiTrash />
        </Button>
        <Button className="btn-link" onClick={() => handleEdit(row)}>
          <LuPencil />
        </Button>
      </div>
    );
  };

  const handleDelete = async (event, row) => {
    prettyConfirm({
      event: event,
      message: "Are you sure you want to delete the tour request?",
      icon: <PiHandPalmDuotone size={50} />,
      acceptButtonType: "danger",
      handleAccept: () => confirmDelete(row.id),
      handleReject: () => {
        showToast({
          severity: "warn",
          summary: "Canceled",
          detail: "Tour request not deleted",
          life: 2000,
          icon: <IoMdCheckmarkCircleOutline size={50} />,
        });
      },
    });
  };

  const confirmDelete = async (id) => {
    try {
      await deleteAdvert(id);
      showToast({
        severity: "success",
        summary: "Advert deleted",
        detail: "Advert deleted successfully",
        life: 2000,
        icon: <IoMdCheckmarkCircleOutline size={50} />,
      });
      dispatch(setListRefreshToken(Math.random()));
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
        icon: <TbFaceIdError size={50} />,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (row) => {
    dispatch(setCurrentRecord(row));
    navigate("/dashboard/adverts-edit-admin");
  };

  const getStatus = (adverts) => (
    <Tag
      value={adverts.statusForAdvert}
      style={{ backgroundColor: getStyle(adverts.statusForAdvert) }}
    />
  );
  const getViewLikeTour = (adverts) => {
    const favoritesCount = favoritesCounts[adverts.id];
    const tourRequestCount = tourRequestCounts[adverts.id];

    return (
      <div className="icons">
        <div>
          <FaRegEye /> {adverts.viewCount}
        </div>
        <div>
          <FaRegHeart /> {favoritesCount}
        </div>
        <div>
          <GoLocation /> {tourRequestCount}{" "}
        </div>
      </div>
    );
  };
  const getFavoritesCountForAdvert = async (id) => {
    try {
      const resp = await getFavoritesCount(id);
      setFavoritesCounts((prevFavorites) => ({
        ...prevFavorites,
        [id]: resp,
      }));
    } catch (err) {
      console.error("Error getting favorites count:", err);
    }
  };

  const getTourRequestCountForAdvert = async (id) => {
    try {
      const resp = await getTourRequestCount(id);
      setTourRequestCounts((prevTourRequest) => ({
        ...prevTourRequest,
        [id]: resp,
      }));
    } catch (err) {
      console.error("Error getting Tour Request count:", err);
    }
  };
  const loadData = async (page) => {
    try {
     
      const resp = await getAdvertsForAdmin(initialValues, page, lazyState.rows);
      // const resp = await getAdverts(page, lazyState.rows);
      setAdverts(resp.content);
      setTotalRows(resp.totalElements);

      for (const advert of resp.content) {
        getFavoritesCountForAdvert(advert.id);
      }

      for (const advert of resp.content) {
        getTourRequestCountForAdvert(advert.id);
      }
    } catch (err) {
      showToast({
        severity: "error",
        summary: "Error!",
        detail: Object.values(err.response.data)[0],
        life: 3000,
        icon: <TbFaceIdError size={50} />,
      });
    } finally {
      setLoading(false);
    }
  };

  const narrowRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
  };

  const propertyStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    rowGap: "20px",
  };
  const getProperty = (adverts) => {
    return (
      <div className="getproperty">
        {
          <div className="image">
            <FullImage
              className="ad-thumbnail"
              src={`data:${adverts.images[0]?.type};base64, ${adverts.images[0]?.data}`}
              alt={`${adverts.images[0]?.name}`}
              preview
            />
          </div>
        }
        <div className="text">
          <Link to={`/${adverts.slug}`}>{adverts.title}</Link>
          <p>
            {adverts.country.name +
              " " +
              adverts.city.name +
              " " +
              adverts.district.name}
          </p>
          <p>{"$" + adverts.price}</p>
        </div>
      </div>
    );
  };
  const property = (adverts) => (
    <div style={{ padding: "0 10px" }}>
      <div className="p-column-title mb-1">Property</div>
      <div>{getProperty(adverts)}</div>
    </div>
  );
  const formatCreatedAt = (dateString) => {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return date.toLocaleDateString("tr-TR", options);
  };
  const dateFormat = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">createdAt</span>
      {formatCreatedAt(row.createdAt)}
    </div>
  );

  const status = (adverts) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Status</span>
      {getStatus(adverts)}
    </div>
  );
  const ViewLikeTour = (adverts) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">View/Like/Tour</span>
      {getViewLikeTour(adverts)}
    </div>
  );
  const operationButton = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Action</span>
      {getOperationButtons(row)}
    </div>
  );

  useEffect(() => {
    loadData(lazyState.page);
  }, [lazyState, listRefreshToken]);

  // style for status
  const getStyle = (status) => {
    const statusStyles = {
      PENDING: "#f18506",
      ACTIVATED: "#61c141",
      REJECTED: "#ec4747",
    };

    return statusStyles[status] || null;
  };

  const statusForAdverts = [
    {
      id: 1,
      name: "PENDING",
    },
    {
      id: 2,
      name: "ACTIVATED",
    },
    {
      id: 3,
      name: "REJECTED",
    },
  ];

  const initialValues = {
    q: "",
    advert_type_id: 0,
    price_start: 0,
    price_end: 0,
    category_id: 0,
    status: 0,
  };

  const validationSchema = Yup.object({
    price_start: Yup.number().test(
      "is-non-negative",
      "Price must be 0 or greater",
      (value) => value >= 0
    ),
    price_end: Yup.number().test(
      "is-greater-than-start",
      "Price end must be greater than or equal to Price start",
      function (value) {
        const priceStart = this.resolve(Yup.ref("priceStart"));
        return (
          priceStart === undefined ||
          (value !== undefined && value >= priceStart)
        );
      }
    ),
    advert_type_id: Yup.number()
      .required("Select an advertisement type")
      .notOneOf([0], "Select an advert type"),
      category_id: Yup.number()
      .required("Select a category")
      .notOneOf([0], "Select a category"),
    status: Yup.number().notOneOf([0], "Select a status"),
  });

  const onSubmit = async (values) => {
    setLoading(true);

    try {
      const resp = await getAdvertsForAdmin(
        values,
        lazyState.page,
        lazyState.rows
      );
      setAdverts(resp.content);
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
  const fetchAdvertTypes = async () => {
    try {
      const data = await getAdvertTypes();
      setAdvertTypes(data);
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

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
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
  useEffect(() => {
    fetchAdvertTypes();
    fetchCategories();
  }, []);

  return (
    <>
      <Container className="admin-adverts-page">
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Row className="row-cols-1 row-cols-md-2 row-cols-lg-3">
            <Col md={12} lg={12}>
              <InputText
                formik={formik}
                label={"Type something"}
                field={"query"}
              />
            </Col>

            <Col>
              {advertTypes.length > 0 && (
                <InputSelect
                  formik={formik}
                  field={"advert_type_id"}
                  label={"Advert Type"}
                  type={"Advert Type"}
                  options={advertTypes}
                />
              )}
            </Col>
            <Col>
              {categories.length > 0 && (
                <InputSelect
                  formik={formik}
                  field={"category_id"}
                  label={"Category"}
                  type={"Category"}
                  options={categories}
                />
              )}
            </Col>
            <Col>
              <InputSelect
                formik={formik}
                field={"status"}
                label={"status"}
                type={"status"}
                options={statusForAdverts}
              />
            </Col>

            <Col>
              <InputText
                formik={formik}
                label={"Price start"}
                field={"price_start"}
                type={"number"}
              />
            </Col>
            <Col>
              <InputText
                formik={formik}
                label={"Price end"}
                field={"price_end"}
                type={"number"}
              />
            </Col>
            <Col className="adverts-page-search-button">
              <ButtonComponent
                formik={formik}
                loading={loading}
                type="submit"
                text="SEARCH"
              >
                <IoSearchOutline className="fs-5" />
              </ButtonComponent>
            </Col>
          </Row>
        </Form>
      </Container>
      <Spacer height={50} />
      <Container className="advert-container" style={{ width: "85%" }}>
        <div className="tr-datatable-wrapper">
          <div className="card">
            <DataTable
              className="tr-datatable"
              lazy
              dataKey="id"
              value={adverts} // the data to display in the table
              paginator // show pagination bar
              rows={lazyState.rows} // how many rows to display in each page
              rowsPerPageOptions={[5, 10, 15, 20]} // rows per page options
              totalRecords={totalRows}
              loading={loading}
              first={lazyState.first}
              onPage={onPage}
              paginatorTemplate={
                "PrevPageLink PageLinks CurrentPageReport NextPageLink"
              }
            >
              <Column
                header="Property"
                body={property}
                headerStyle={{ width: "30%" }}
              ></Column>
              <Column
                field="createdAt"
                className="my-custom-column"
                header="Date Published "
                body={dateFormat}
              ></Column>
              <Column header="Status" body={status}></Column>
              <Column header="View/Like/Tour" body={ViewLikeTour}></Column>
              <Column header="Action" body={operationButton}></Column>
            </DataTable>
          </div>
        </div>
      </Container>
      <Spacer />
    </>
  );
};

export default AdminAdvertsPage;
