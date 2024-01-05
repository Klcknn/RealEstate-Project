import React from "react";
import PageHeader from "../../../components/common/page-header";
import Spacer from "../../../components/common/spacer";
import ResetPasswordForm from "../../../components/dashboard/profile/password-profile/reset-password-form";

const ResetPasswordPage = () => {
  return (
    <>
      <PageHeader title="RESET PASSWORD" />
      <Spacer />
      <ResetPasswordForm />
      <Spacer />
    </>
  );
};

export default ResetPasswordPage;
