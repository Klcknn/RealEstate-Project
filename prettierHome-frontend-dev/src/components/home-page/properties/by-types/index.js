import React, { useEffect, useRef, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { getAdvertsByCategories } from "../../../../api/adverts-service";
import { Toast } from "primereact/toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "./style.scss";

const ExplorePropertiesByType = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const toast = useRef(null);

  const fetchCategories = async () => {
    try {
      const resp = await getAdvertsByCategories();
      setCategories(resp);
    } catch (error) {
      const errMsg = Object.values(error.response.data)[0];
      toast.current.show({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Toast ref={toast} />
      <div className="type-properties">
        <Container>
          <div className="mb-4">
            <h2>Explore Properties</h2>
            <h5>By Types</h5>
          </div>

          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            breakpoints={{
              576: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
          >
            {categories.map((category, index) => (
              <SwiperSlide key={index}>
                <Card className="by-types-card" key={index}>
                  <Card.Img
                    src={`images/icons/icon-office.jpg`}
                    className="by-types-card-img"
                    alt="cities card"
                  />
                  <Card.ImgOverlay className="d-flex  justify-content-between ">
                    <Card.Title className="by-types-card-anchor">
                      <span
                        as={Link}
                        to="/"
                        className="by-types-card-anchor-link"
                      >
                        {category.categoryName}
                      </span>
                    </Card.Title>
                    <Card.Subtitle className="by-type-count">
                      {category.categoryQuantity}
                    </Card.Subtitle>
                  </Card.ImgOverlay>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </div>
    </>
  );
};

export default ExplorePropertiesByType;
