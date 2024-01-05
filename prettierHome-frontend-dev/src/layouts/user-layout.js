import React, { useEffect } from "react";
import Menubar from "../components/common/menubar";
import Footer from "../components/common/footer";
import { Outlet, useLocation } from "react-router-dom";
import ScrollToTopButton from "../components/common/scroll-to-top-button";
import AuthModal from "../components/common/auth-modal";

const UserLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Menubar />
      <AuthModal />
      <Outlet />
      <Footer />
      <ScrollToTopButton />
    </>
  );
};

export default UserLayout;
