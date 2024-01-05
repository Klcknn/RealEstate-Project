import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./advert-detail.scss";
import { useSelector } from "react-redux";

const AdvertDetails = () => {
  const { advertsCurrentRecord } = useSelector((state) => state.misc);
  const keysResponse = advertsCurrentRecord?.category?.categoryPropertyKeysResponse || [];
  const propertyValues = advertsCurrentRecord?.categoryPropertyValue || [];

  
  return (
    <Container className="advert-details-container">
      <h1 className='advert-detail-title'>Details</h1>
      
        <Row height="50%">
        {keysResponse.map((propertyKey, index) => (
  <Col xs={12}  sm={4} md={3} lg={3} className="property-key-name" key={index}>
    {`${propertyKey.name} :${propertyKey?.prefix || ''} ${propertyValues[index]?.value || ''} ${propertyKey?.suffix || ''}`}
  </Col>
))}
            
        </Row>
    </Container>
  );
};

export default AdvertDetails;