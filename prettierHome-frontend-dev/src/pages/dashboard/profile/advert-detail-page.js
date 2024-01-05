import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spacer from "../../../components/common/spacer";
import AdvertDetailPageHeader from "../../../components/dashboard/profile/advert-detail/advert-detail-page-header";
import AdvertTourRequest from "../../../components/dashboard/profile/advert-detail/advert-tour-request";
import AdvertDescription from "../../../components/dashboard/profile/advert-detail/advert-description";
import { Col, Container, Row } from "react-bootstrap";
import AdvertDetails from "../../../components/dashboard/profile/advert-detail/advert-details";
import AdvertImage from "../../../components/dashboard/profile/advert-detail/advert-image";
import AdvertLocation from "../../../components/dashboard/profile/advert-detail/advert-location";
import { getAdvertsBySlug } from "../../../api/adverts-service";
import { useDispatch, useSelector } from "react-redux";
import { setAdvertsCurrentRecord, setListRefreshToken } from "../../../store/slices/misc-slice";
import Loading from "../../../components/loading/LogoLoading";
import AdvertDetailUserProfile from "../../../components/dashboard/profile/advert-detail/advert-detail-user-profile";
import { useToast } from "../../../store/providers/toast-provider";
import { TbFaceIdError } from "react-icons/tb";

const AdvertDetailPage = () => {
  const { slug } = useParams();
  const { advertsCurrentRecord } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const loadAdvert = async () => {
    try {
      const advert = await getAdvertsBySlug(slug);
      dispatch(setAdvertsCurrentRecord(advert));
      dispatch(setListRefreshToken(true));
    } catch (error) {
      const errMsg = error?.response?.data?.message;
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
        icon: <TbFaceIdError  size={50} />,
      });
    }
  };
  useEffect(() => {
   loadAdvert();
    return ()=>{
      dispatch(setAdvertsCurrentRecord(null));
    }
  }, []);


if(advertsCurrentRecord===null){
  return <Loading size={80} />;
}

  return (
    
    <Container className="max-width-lg min-width-lg">
     
      <AdvertDetailPageHeader slug={slug} />
      <Row >
        <Col className="" xs={12} md={12} lg={8}>
          <AdvertImage />
          <AdvertDescription />
          <AdvertDetails />
          <AdvertLocation/>
        </Col>
        <Col xs={0} md={0} lg={4} >
          <AdvertTourRequest />
          <Spacer minHeight={40} />
         <AdvertDetailUserProfile/>
        </Col>
        <Spacer />
      </Row>
    </Container>
  );
};

export default AdvertDetailPage;
