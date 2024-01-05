import React from "react";
import { Button, Image, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./side-menu.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/auth-slice";
import { HiOutlineLogout } from "react-icons/hi";
import userMenuData from "../../helpers/data/user-menu.json";
import {removeFromLocalStorage} from '../../helpers/function/encrypted-storage'
import { prettyDialog } from "../../helpers/function/toast-confirm";
import { SlLogout } from "react-icons/sl";
import { useToast } from "../../store/providers/toast-provider";
import { resetFavs } from "../../store/slices/fav-slice";


const SideMenu = () => {
  const loggedInUser = useSelector((state) => state.auth.user);
  const role = loggedInUser.role.toLowerCase();
  const active = 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { showToast } = useToast();

  const handleLogout = async () => {
    prettyDialog({
      message: "Are you sure to log out?",
      header: "Confirmation",
      handleAccept: () => {
        dispatch(logout());
        dispatch(resetFavs());
        navigate("/");

        showToast({
          severity: "success",
          summary: "Logout",
          detail: "You have logged out",
          icon: <SlLogout size={50} />,
          life: 1500,
        });
      },
      handleReject: () => {
        showToast({
          severity: "warn",
          summary: "Logout",
          detail: "You are not logged out",
          life: 1500,
        });
      },
    });
  };

  return (
    <div className="side-menu">
      <Nav className="navvvv">
        <div className="side-logo">
          <Image
            src="/logos/logo-white-2.png"
            alt="stack-logo"
            className="img-fluid p-3 mt-4 "
          />
        </div>

        {userMenuData[role].map((item, index) => (
          <Nav.Link
            className={active === index ? "active-link" : "standart-link"}
            as={Link}
            to={item.link}
            key={index}
          >
            {item.title}
          </Nav.Link>
        ))}
        <Button className="logout-btn" onClick={() => handleLogout()}>
          LOGOUT <HiOutlineLogout className="logout-icon" />
        </Button>
      </Nav>
    </div>
  );
};

export default SideMenu;
