import React, { useState } from "react";
import { Container, Row, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./advert-detail-user-profile.scss";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";

const AdvertDetailUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const { advertsCurrentRecord } = useSelector((state) => state.misc);

  const handleSendMessage = () => {
    setShowEmail(true);
  };
  const handleCallPhoneNumber = () => {
    setShowPhone(true);
  };

  return (
    <Container className="advert-tour-request-profile-container">
      <Row className="advert-tour-request-profile-row">
        <img
          className="advert-detail-user-pic"
          src="/images/profile/user.jpg"
          alt="user"
        />
      </Row>
      <Row className="advert-tour-request-profile-row mb-3">
        <div className="advert-detail-btn-link">{`${advertsCurrentRecord.user.firstName} ${advertsCurrentRecord.user.lastName}`}</div>
      </Row>
      <Row className="advert-tour-request-profile-row">
        {showPhone ? (
          <Button className="advert-detail-mail-btn"><a
          className="advert-detail-mail-link"
          href={`tel:${advertsCurrentRecord.user.phone}`}
        >
           <FaPhoneAlt  className="advert-detail-mail-send-icon"/>
          {advertsCurrentRecord.user.phone}
        </a>
        </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleCallPhoneNumber}
            className="advert-detail-mail-send-btn"
          >
            <FaPhoneAlt  className="advert-detail-mail-send-icon"/>
            Call Phone Number
          </Button>
           )}
      </Row>
      <Row className="advert-tour-request-profile-row">
        {showEmail ? (
          <Button className="advert-detail-mail-btn"><a
          className="advert-detail-mail-link"
          href={`mailto:${advertsCurrentRecord.user.email}`}
        >
          <IoMdMail className="advert-detail-mail-send-icon"/>
          {advertsCurrentRecord.user.email}
        </a>
        </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleSendMessage}
            className="advert-detail-mail-send-btn"
          >
            <IoMdMail className="advert-detail-mail-send-icon"/>
            Send Mail
          </Button>
        )}
      </Row>
    </Container>
  );
};

export default AdvertDetailUserProfile;
