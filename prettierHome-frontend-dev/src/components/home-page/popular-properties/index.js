import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useToast } from "../../../store/providers/toast-provider";
import { getMostPopularAdverts } from "../../../api/adverts-service";
import PropertiesCard from "../../properties-page/properties-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/pagination';
import "./style.scss";
const PopularProperties = () => {
  const [loading, setLoading] = useState(false);
  const [popular, setPopular] = useState([]);
  const { showToast } = useToast();

  const fetchPopularAdverts = async () => {
    try {
      const resp = await getMostPopularAdverts(6);
      setPopular(resp);
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
    fetchPopularAdverts();
  }, []);

  return (
    <>
      <Container className="popular-container">
        <div className="mb-4">
          <h2>Discover Popular Properties</h2>
          <h5>Featured properties</h5>
        </div>
        <Swiper
          className="popular-swiper"
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          loop={true}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          slidesPerView={1}
          breakpoints={{
            576: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
        >
          {popular.map((ad, index) => (
            <SwiperSlide key={index}>
              <PropertiesCard ad={ad} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </>
  );
};

export default PopularProperties;
