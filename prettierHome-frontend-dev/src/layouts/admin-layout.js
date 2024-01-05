import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import "../layouts/admin-layout.scss";
import SideMenu from "../components/admin-layout/side-menu";
import TopSide from "../components/admin-layout/top-side";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Spacer from "../components/common/spacer";

const AdminLayout = () => {
  const { currentOperation } = useSelector((state) => state.misc);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // const sideColClasses = currentOperation ? "side-col" : "side-col d-none d-xl-block ";

  return (
    <>
      <div>
        <Row className="p-0 g-0 m-0 ">
          {currentOperation && (
            <Col xl={2} className="side-col">
              <SideMenu />
            </Col>
          )}
          <Col className="contents-col">
            <TopSide />
            <Spacer minHeight={50} />
            <Outlet />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default AdminLayout;
