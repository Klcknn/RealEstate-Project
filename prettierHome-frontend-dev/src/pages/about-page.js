import React from "react";
import PageHeader from "../components/common/page-header";
import About from "../components/about-page/about";
import NeedHelp from "../components/common/needhelp";
import Spacer from "../components/common/spacer";
import SellingAdvert from "../components/common/selling-advert";

const AboutPage = () => {
  return (
    <>
      <PageHeader title="ABOUT US" />
      <Spacer />
      <About />
      <Spacer />
      <SellingAdvert />
      <Spacer />
      <NeedHelp />
      <Spacer />
    </>
  );
};

export default AboutPage;
