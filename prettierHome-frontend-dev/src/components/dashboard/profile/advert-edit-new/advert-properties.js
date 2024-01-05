import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import InputText from "../../../common/input-text";
import { getCategoryPropertyKeysByCategory } from "../../../../api/adverts-service";
import { useToast } from "../../../../store/providers/toast-provider";
import options from "../../../../helpers/data/options.json";
import InputSelect from "../../../common/input-select";
import "./advert-properties.scss";



const AdvertProperties = ({ info, formik }) => {
  const [categoryKeys, setCategoryKeys] = useState([]);
  const [render, setRender] = useState(1);
  const { showToast } = useToast();

  const fetchCategoryKeys = async () => {
    try {
      const data = await getCategoryPropertyKeysByCategory(
        formik.values.categoryId
      );
      setCategoryKeys(data);
      if (info === "Update" && render > 2) {
        formik.setFieldValue(
          "propertyValues",
          data.map((item) => (item.keyType == "BOOLEAN" ? "No" : ""))
        );
      } else if (info !== "Update") {
        formik.setFieldValue(
          "propertyValues",
          data.map((item) => (item.keyType == "BOOLEAN" ? "No" : ""))
        );
      }
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
    fetchCategoryKeys();
    setRender((prev) => prev + 1);
  }, [formik.values.categoryId]);

  const handleChange = (originalArray, index, newValue) => {
    const newArray = [...originalArray];
    newArray.splice(index, 1, newValue);
    return newArray;
  };
   return (
    <Container className="advert-properties">
      <h5>Properties</h5>
      <Row className=" row-cols-1 row-cols-lg-3 ">
        {categoryKeys.map((categoryKey, index) => {
          const { keyType } = categoryKey;

          return keyType == "BOOLEAN" ? (
            <Col key={index}>
              <InputSelect
                formik={formik}
                field={"propertyValues"}
                label={categoryKey.name}
                options={options}
                feedback={false}
                handleValue={formik.values.propertyValues[index]}
                handleChange={(e) => {
                  formik.setFieldValue(
                    `propertyValues`,
                    handleChange(
                      formik.values.propertyValues,
                      index,
                      e.target.value
                    )
                  );
                }}
              />
            </Col>
          ) : (
            <Col key={index}>
              <InputText
                feedback={false}
                formik={formik}
                label={categoryKey.name}
                type={categoryKey.keyType === "TEXT" ? "text" : "number"}
                index={index}
                field={"propertyValues"}
                handleValue={formik.values.propertyValues[index]}
                handleChange={(e) => {
                  formik.setFieldValue(
                    `propertyValues`,
                    handleChange(
                      formik.values.propertyValues,
                      index,
                      e.target.value
                    )
                  );
                }}
                placeholder={categoryKey.name.toLowerCase()}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default AdvertProperties;
