import React from "react";
import PageHeader from "../../../components/common/page-header";
import Spacer from "../../../components/common/spacer";
import ForgotForm from "../../../components/dashboard/profile/password-profile/forgot-form";

const ForgotPage = () => {
  return (
    <>
      <PageHeader title="FORGOT PASSWORD" />
      <Spacer minHeight={50}/>
      <ForgotForm/>
      <Spacer />
    </>
  );
};

export default ForgotPage;