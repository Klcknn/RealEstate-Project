import React, { useEffect, useRef, useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import InputText from "../../../common/input-text";
import InputSelect from "../../../common/input-select";
import {
  getAllCountries,
  getAllCityByCountry,
  getAllDistrictsByCity,
} from "../../../../api/adverts-service";
import LocationPicker from "../location/LocationPicker";
import "./advert-address.scss";
import { useToast } from "../../../../store/providers/toast-provider";

const AdvertAddress = ({ formik }) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const { showToast } = useToast();

  const fetchCountries = async () => {
    try {
      const data = await getAllCountries();
      setCountries(data);
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

  const fetchCities = async (countryId) => {
    try {
      const data = await getAllCityByCountry(countryId);
      setCities(data);
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

  const fetchDistricts = async (cityId) => {
    try {
      const data = await getAllDistrictsByCity(cityId);
      setDistricts(data);
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
    fetchCountries();
  }, []);

  useEffect(() => {
    formik.values.countryId > 0 && fetchCities(formik.values.countryId);
  }, [formik.values.countryId]);

  useEffect(() => {
    formik.values.cityId > 0 && fetchDistricts(formik.values.cityId);
  }, [formik.values.cityId]);

  return (
    <Container className="advert-address">
      <h5>Address Information</h5>
      <Row className="row-cols-1 row-cols-lg-3">
        <Col>
          {countries.length > 0 && (
            <InputSelect
              formik={formik}
              field={"countryId"}
              label={"Country"}
              type={"Country"}
              options={countries}
            />
          )}
        </Col>
        <Col>
          <InputSelect
            formik={formik}
            field={"cityId"}
            label={"City"}
            type={"City"}
            options={cities}
          />
        </Col>
        <Col>
          <InputSelect
            formik={formik}
            field={"districtId"}
            label={"District"}
            type={"District"}
            options={districts}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <LocationPicker formik={formik} field={"location"} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Accordion flush>
            <Accordion.Item eventKey="0" disabled>
              <Accordion.Header>
                Manually entering the coordinates
              </Accordion.Header>
              <Accordion.Body>
                <Row className="row-cols-1 row-cols-lg-2">
                  <Col>
                    <InputText
                      formik={formik}
                      handleValue={
                        formik.values.location.length > 0
                          ? formik.values.location[0]
                          : 0
                      }
                      handleChange={(e) =>
                        formik.setFieldValue("location", [
                          e.target.value,
                          formik.values.location[1],
                        ])
                      }
                      handleDisable={formik.values.location.length === 0}
                      label="Latitude"
                      type={"number"}
                      field="location"
                      placeholder={"latitude"}
                      feedback={false}
                    />
                  </Col>
                  <Col>
                    <InputText
                      formik={formik}
                      handleValue={
                        formik.values.location.length > 0
                          ? formik.values.location[1]
                          : 0
                      }
                      handleChange={(e) =>
                        formik.setFieldValue("location", [
                          formik.values.location[0],
                          e.target.value,
                        ])
                      }
                      handleDisable={formik.values.location.length === 0}
                      label="Longitude"
                      type={"number"}
                      field="location"
                      placeholder={"longitude"}
                      feedback={false}
                    />
                  </Col>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};

export default AdvertAddress;
