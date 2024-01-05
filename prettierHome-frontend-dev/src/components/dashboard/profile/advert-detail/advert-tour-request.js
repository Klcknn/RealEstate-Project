import { Button, Container, Form, Row } from "react-bootstrap";
import "./advert-tour-request.scss";
import React, { useState } from "react";
import { saveTourRequest } from "../../../../api/adverts-service";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  setListRefreshToken,
  setOperation,
} from "../../../../store/slices/misc-slice";
import { useFormik } from "formik";
import { AiFillLock } from "react-icons/ai";
import ButtonLoader from "../../../common/button-loader";
import { isValid, isInValid } from "../../../../helpers/function/forms";
import { formatTime } from "../../../../helpers/function/date-time";
import { getFromLocalStorage } from "../../../../helpers/function/encrypted-storage";
import { PiHandPalmDuotone } from "react-icons/pi";
import { prettyDialog } from "../../../../helpers/function/toast-confirm";
import { useToast } from "../../../../store/providers/toast-provider";
import { useLocation, useNavigate } from "react-router-dom";

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of ["00", "30"]) {
      const time = `${hour.toString().padStart(2, "0")}:${minute}`;
      options.push(time);
    }
  }
  return options;
};
const AdvertTourRequest = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { advertsCurrentRecord } = useSelector((state) => state.misc);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const pathBeforeAdvert = pathSegments
    .slice(0, pathSegments.indexOf("advert"))
    .join("/");
  const basePath = location.pathname.split("/").slice(0, -1).join("/");

  const initialValues = {
    ...advertsCurrentRecord,
    advertId: advertsCurrentRecord ? advertsCurrentRecord.id : null,
    tourDate: "",
    tourTime: "",
  };

  const validationSchema = Yup.object({
    tourDate: Yup.date().required("Tour date is required"),
    tourTime: Yup.string().required("Tour time is required"),
  });

  const onSubmit = async (values) => {
    setLoading(true);
    const token = getFromLocalStorage("token");
    if (!token) {
      setLoading(false);
      prettyDialog({
        message:
          "A tour request cannot be created without login. Would you like to log in?",
        icon: <PiHandPalmDuotone size={50} />,
        handleAccept: () => navigate(`${pathBeforeAdvert}/login`),
        handleReject: () => navigate(`${basePath}/tour-request-details`),
      });
    } else {
      const payload = {
        ...values,
        tourTime: formatTime(values.tourTime),
      };
      try {
        const resp = await saveTourRequest(payload);
        dispatch(setOperation("null"));
        dispatch(setListRefreshToken(Math.random()));
        showToast({
          severity: "success",
          summary: "Created",
          detail: "TourRequest created successfully",
          life: 2000,
        });
      } catch (err) {
        const errMsg = err.response.data.message;
        showToast({
          severity: "error",
          summary: "error",
          detail: errMsg,
          life: 2000,
        });
      } finally {
        setLoading(false);
      }
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    enableReinitialize: true,
  });
  return (
    <Container className="advert-tour-request-container">
      <Form className="advert-tour-request-form" onSubmit={formik.handleSubmit}>
        <Row className="advert-tour-request-row">
          <Row>
            <h2>Schedule a tour</h2>
          </Row>
          <Row className="mb-5">
            <h6>Choose your preferred day</h6>
          </Row>
          <Row className="advert-tour-request-form-group-row mb-4">
            <Form.Group
              className="adverts-tour-request-form-group"
              controlId="tourDate"
            >
              <Form.Text>Tour Date</Form.Text>

              <Form.Control
                type="date"
                plaseholder=""
                {...formik.getFieldProps("tourDate")}
                isInvalid={isInValid(formik, "tourDate")}
                isValid={isValid(formik, "tourDate")}
                min={new Date().toISOString().split("T")[0]}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.tourDate}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>

          <Row className="advert-tour-request-form-group-row mb-4">
            <Form.Group
              className="adverts-tour-request-form-group"
              controlId="tourTime"
            >
              <Form.Text>Tour Time</Form.Text>
              <Form.Control
                as="select"
                className={`${
                  isInValid(formik, "tourTime") ? "is-invalid" : ""
                } ${isValid(formik, "tourTime") ? "is-valid" : ""}`}
                {...formik.getFieldProps("tourTime")}
              >
                <option className="w-50 h-20" value="tour" label="--:--" />
                {generateTimeOptions().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {formik.errors.tourTime}
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Button
              variant="danger"
              type="submit"
              disabled={!formik.isValid || loading}
            >
              {loading ? <ButtonLoader /> : <AiFillLock />} Submit a tour
              request
            </Button>
          </Row>
        </Row>
      </Form>
    </Container>
  );
};

export default AdvertTourRequest;
