import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./advert-detail-page-header.scss";
import { MdLocationOn } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { AiFillClockCircle } from "react-icons/ai";
import { IoEye } from "react-icons/io5";

function calculateWeeksSinceCreation(createdAt) {
  const creationDate = new Date(createdAt);
  const currentDate = new Date();
  const timeDifference = currentDate - creationDate;
  const weeksDifference = timeDifference / (1000 * 60 * 60 * 24 * 7);
  return Math.floor(weeksDifference);
}

const AdvertDetailPageHeader = () => {

  const { advertsCurrentRecord } = useSelector((state) => state.misc);

  useEffect(() => {
    
  }, []);

  const advert = advertsCurrentRecord;
  const createdAt = advert?.createdAt;
  const weeksSinceCreation = calculateWeeksSinceCreation(createdAt);
  return (
    <Container className="advert-detail-page-header">
      <Row className="advert-detail-title">{advert?.title}</Row>
      <Row className="advert-detail-info">
        <Col xs={12} md={9} lg={10} className="advert-detail-info-col">
          <Col className="advert-detail-col"> <MdLocationOn /> {`${advert?.city?.name}, `}{" "}{advert?.district?.name}</Col>
          <Col className="advert-detail-col"><IoMdPricetag /> {advert?.advertType?.title}</Col>
          <Col className="advert-detail-col"><AiFillClockCircle />{`${weeksSinceCreation} week${ weeksSinceCreation === 1 ? "" : "s"} ago`}</Col>
          <Col className="advert-detail-col"><IoEye />{advert?.viewCount}</Col>
        </Col> 
        <Col xs={0} md={3} lg={2} className="advert-detail-price">{`$${advert?.price}`}</Col>
      </Row>
    </Container>
  );
};

export default AdvertDetailPageHeader;
