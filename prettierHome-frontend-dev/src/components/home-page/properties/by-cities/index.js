import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { Pagination } from 'swiper/modules';
import { getAdvertsByCities } from "../../../../api/adverts-service";
import { Swiper, SwiperSlide } from "swiper/react";
import { useToast } from "../../../../store/providers/toast-provider";
import 'swiper/scss';
import 'swiper/scss/pagination';
import "./style.scss";
import { useNavigate } from "react-router-dom";

const ExploreByCities = () => {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const fetchCities = async () => {
    try {
      const resp = await getAdvertsByCities(10);
      setCities(resp);
    } catch (error) {
      const errMsg = Object.values(error.response.data)[0];
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
      });
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);


  const handleSearch = (param) => {
    navigate(`ad/search?city=${param}`);
  }


  return (
    <>
      <Container className="city-statistics">
        <div className="mb-4">
          <h2>Explore Properties</h2>
          <h5>By Cities</h5>
        </div>

        <Swiper
          modules={[Pagination]}
          pagination={{
            dynamicBullets: true,
            clickable: true
          }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            450: { slidesPerView: 2 },
            // 576: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
        >
          {cities.map((city, index) => (
            <SwiperSlide key={index} className="cities-slider">
              <Card key={index} className="by-cities-card" onClick={() => handleSearch(city.cityId)}>
                <Card.Img
                  src={`images/cities/istanbul.jpg`}
                  className="by-cities-card-img"
                  alt="cities card"
                />
                <Card.ImgOverlay className="statistics">
                  <h3>{city.cityName}</h3>
                  <span className="ad-quantity">{city.cityQuantity}</span>
                  <span>properties</span>
                </Card.ImgOverlay>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </>
  );
};

export default ExploreByCities;
