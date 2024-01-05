import React from "react";
import PageHeader from "../components/common/page-header";
import Spacer from "../components/common/spacer";
import Contact from "../components/contact-page/contact";

const ContactPage = () => {
  return (
    <>
      <PageHeader title="CONTACT US" />
      <Spacer />
      <Contact />
      <Spacer />
    </>
  );
};

export default ContactPage;
