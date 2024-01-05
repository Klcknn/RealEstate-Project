import React, { useEffect, useState } from 'react'
import { getAdvertTypes, getAllCityByCountry, getAllCountries, getAllDistrictsByCity, getCategories } from '../../api/adverts-service';
import { useToast } from '../../store/providers/toast-provider';
import InputSelect from "../common/input-select";
import { Col, Form, Row } from 'react-bootstrap'
import { useFormik } from "formik";
import * as Yup from "yup";
import InputText from '../common/input-text';
import ButtonComponent from '../common/button-component';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoSearch } from "react-icons/go";
import { prepareRequestParams } from '../../helpers/function/request-param-converter';

const SearchPanel = () => {
    const [advertTypes, setAdvertTypes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const location = useLocation();
    const navigate = useNavigate();
    const sParams = new URLSearchParams(location.search);

    /////////FORMIK/////////////

    const initialValues = {
        q: sParams.get('q') || "",
        at: sParams.get('at') || "",
        c: sParams.get('c') || "",
        ps: sParams.get('ps') || "",
        pe: sParams.get('pe') || "",
        ctry: sParams.get('ctry') || "",
        city: sParams.get('city') || "",
        dist: sParams.get('dist') || "",
    };

    const validationSchema = Yup.object({
        price: Yup.number()
            .positive("Price must be positive"),
    });

    const onSubmit = async (values) => {
        const queryString = prepareRequestParams(values);
        navigate(`?${queryString}`);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
        enableReinitialize: true,
    });

    /////////FORMIK/////////////

    const fetchAdvertTypes = async () => {
        try {
            const data = await getAdvertTypes();
            setAdvertTypes([{ id: "", title: "All" }, ...data]);
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
            setCategories([{ id: "", title: "All" }, ...data]);
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

    const fetchCountries = async () => {
        try {
            const data = await getAllCountries();
            setCountries([{ id: "", name: "All" }, ...data]);
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

    const fetchCities = async (ctry) => {
        try {
            const data = await getAllCityByCountry(ctry);
            setCities([{ id: "", name: "All" }, ...data]);
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

    const fetchDistricts = async (city) => {
        try {
            const data = await getAllDistrictsByCity(city);
            setDistricts([{ id: "", name: "All" }, ...data]);
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
        fetchCountries();
    }, []);

    useEffect(() => {
        formik.values.ctry > 0 && fetchCities(formik.values.ctry);
    }, [formik.values.ctry]);

    useEffect(() => {
        formik.values.city > 0 && fetchDistricts(formik.values.city);
    }, [formik.values.city]);

    return (
        <>
            <Form noValidate onSubmit={formik.handleSubmit}>
                <Row className=" row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-1">
                    <Col xs lg={8}>
                        <InputText
                            formik={formik}
                            label="Search"
                            type="text"
                            field="q"
                            placeholder={"Search"}
                            feedback={false}
                        />
                    </Col>
                    <Col style={{ display: "flex", gap: "10px" }}>
                        <div style={{ width: '50%' }}>
                            <InputText
                                formik={formik}
                                label="Price Range"
                                type={"number"}
                                field="ps"
                                placeholder={"min"}
                            />
                        </div>
                        <div style={{ width: '50%' }}>
                            <InputText
                                formik={formik}
                                label="&nbsp;"
                                type={"number"}
                                field="pe"
                                placeholder={"max"}
                            />
                        </div>
                    </Col>
                    <Col>
                        <InputSelect
                            formik={formik}
                            field={"at"}
                            label={"Advert Type"}
                            // type={"Advert Type"}
                            options={advertTypes}
                            feedback={false}
                        />
                    </Col>
                    <Col>
                        <InputSelect
                            formik={formik}
                            field={"c"}
                            label={"Category"}
                            // type={"Category"}
                            options={categories}
                            feedback={false}
                        />
                    </Col>
                    <Col>
                        {countries.length > 0 && (
                            <InputSelect
                                formik={formik}
                                field={"ctry"}
                                label={"Country"}
                                // type={"Country"}
                                options={countries}
                                feedback={false}
                            />
                        )}
                    </Col>
                    <Col>
                        <InputSelect
                            formik={formik}
                            field={"city"}
                            label={"City"}
                            type={"City"}
                            options={cities}
                            feedback={false}
                        />
                    </Col>
                    <Col>
                        <InputSelect
                            formik={formik}
                            field={"dist"}
                            label={"District"}
                            type={"District"}
                            options={districts}
                            feedback={false}
                        />
                    </Col>
                    <Col style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ width: "100%" }}>
                            <ButtonComponent
                                formik={formik}
                                loading={loading}
                                type="submit"
                                text="Search"
                                style={{ width: "100%", padding: "15px" }}
                            >
                                <GoSearch />
                            </ButtonComponent>
                        </div>
                    </Col>
                </Row>
            </Form>
        </>
    )
}

export default SearchPanel