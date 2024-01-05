import React from "react";

import PageHeader from "../components/common/page-header";
import Spacer from "../components/common/spacer";
import Properties from "../components/properties-page/properties";

const AdvertPage = () => {
  return (
    <>
      <PageHeader title="PROPERTIES" />
      <Spacer />
      <Properties />
      <Spacer />
    </>
  );
};

export default AdvertPage;
