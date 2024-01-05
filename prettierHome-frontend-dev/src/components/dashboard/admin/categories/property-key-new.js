import React from "react";
import { Row, Col, Container} from "react-bootstrap";
import InputText from "../../../common/input-text";
import './property-key-new.scss';
import InputSelect from "../../../common/input-select";

const PropertyKey = ({ formik }) => {

  const keyTypeOptions = [
    {
      id: 0,
      name: "TEXT",
    },
    {
      id: 1,
      name: "BOOLEAN",
    },
    {
      id: 2,
      name: "NUMBER",
    },
  ];

  // const getSuffixOptions = [
  //   {
  //     id: 0,
  //     name: "m²",
  //   },
  //   {
  //     id: 1,
  //     name: "km",
  //   },
  //   {
  //     id: 2,
  //     name: "cm",
  //   },
  //   {
  //     id: 4,
  //     name: "inç",
  //   },
  // ];

  // const getPrefixOptions = [
  //   {
  //     id: 0,
  //     name: "%",
  //   },
  //   {
  //     id: 1,
  //     name: "$",
  //   },
  //   {
  //     id: 2,
  //     name: "₺",
  //   },
  //   {
  //     id: 3,
  //     name: "€",
  //   },
  //   {
  //     id: 4,
  //     name: "£",
  //   },
  // ]; 
  
  
return (
    <Container className="property-key-new">
      <Row>
        <InputText
          formik={formik}
          label="Name"
          type="text"
          field="name"
          placeholder={"name"}
        />
      </Row>
      <Row className=" row-cols-1 row-cols-lg-3 ">
      <Col>
          <InputSelect
            formik={formik}
            label={"KeyType"}
            field={"keyType"}
            options={keyTypeOptions}
            optionValue={true}
          />
        </Col>
        <Col>
        <InputText
            formik={formik}
            label={"Prefix"}
            field={"prefix"}
            placeholder={"prefix"}
          />
        </Col>
        <Col>
        <InputText
            formik={formik}
            label={"Suffix"}
            field={"suffix"}
            placeholder={"suffix"}
        />
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyKey