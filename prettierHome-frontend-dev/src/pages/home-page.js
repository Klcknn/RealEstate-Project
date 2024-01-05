import React from "react";
import NeedHelp from "../components/common/needhelp";
import Spacer from "../components/common/spacer";
import Banner from "../components/home-page/banner";
import ExploreByCategories from "../components/home-page/properties/by-categories";
import ExploreByCities from "../components/home-page/properties/by-cities";
import RegisterNow from "../components/home-page/register-now";
import SellingAdvert from "../components/common/selling-advert";
import PopularProperties from "../components/home-page/popular-properties";

const HomePage = () => {
  return (
    <>
      <Banner />
      <Spacer />
      <ExploreByCategories />
      <Spacer />
      <ExploreByCities />
      <Spacer />
      <RegisterNow />
      <Spacer />
      <PopularProperties />
      <Spacer height={150} />
      <SellingAdvert />
      <Spacer />
      <NeedHelp />
      <Spacer />
    </>
  );
};

export default HomePage;
