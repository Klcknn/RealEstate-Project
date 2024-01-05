import React from "react";
import PageHeader from "../../../components/common/page-header";
import Spacer from "../../../components/common/spacer";
import ChangePasswordForm from "../../../components/dashboard/profile/password-profile/change-password-form";


const ChangePasswordPage = () => {
  return (
    <>
      <PageHeader title="CHANGE PASSWORD" />
      <Spacer />
      <ChangePasswordForm />
      <Spacer />
    </>
  );
};

export default ChangePasswordPage;
