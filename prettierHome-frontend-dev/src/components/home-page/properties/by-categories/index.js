import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { getAdvertsByCategories } from "../../../../api/adverts-service";
import { Pagination } from 'swiper/modules';
import { useToast } from "../../../../store/providers/toast-provider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import 'swiper/scss';
import 'swiper/scss/pagination';
import "./style.scss";

const ExploreByCategories = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { showToast } = useToast();


  const fetchCategories = async () => {
    try {
      const resp = await getAdvertsByCategories();
      setCategories(resp);
    } catch (error) {
      const errMsg = Object.values(error.response.data)[0];
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = (param) => {
    navigate(`ad/search?c=${param}`);
  }


  return (
    <>
      <Container className="category-statistics">
        <div className="mb-4">
          <h2>Explore Properties</h2>
          <h5>By Categories</h5>
        </div>

        <Swiper
          modules={[Pagination]}
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            // 576: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
            // 1400: { slidesPerView: 5 },
          }}
        >
          {!loading && categories.map((category, index) => (
            <SwiperSlide key={index}>
              <Card className="category-statistics-card" key={index} onClick={() => handleSearch(category.categoryId)}>
                <Card.Img variant="bottom" className="category-card-img" src={`images/categories/${category.categoryName}.jpg`} />
                <div className="statistics-overlay">
                  <div className="statistics">
                    <span>{category.categoryName}</span>
                    <span>{category.categoryQuantity}</span>
                  </div>
                  <div className="category-icon">
                    <FontAwesomeIcon icon={category.icon} color="black" />
                  </div>
                </div>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

      </Container>
    </>
  );
};

export default ExploreByCategories;
