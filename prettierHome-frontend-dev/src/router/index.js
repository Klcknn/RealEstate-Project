import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UserLayout from "../layouts/user-layout";
import HomePage from "../pages/home-page";
import ContactPage from "../pages/contact-page";
import AboutPage from "../pages/about-page";
import LoginPage from "../pages/login-page";
import RegisterPage from "../pages/register-page";
import ForgotPage from "../pages/dashboard/profile/forgot-page";
import ResetPasswordPage from "../pages/dashboard/profile/reset-password-page";
import ChangePasswordPage from "../pages/dashboard/profile/change-password-page";
import AdminLayout from "../layouts/admin-layout";
import AdminDashboardPage from "../pages/dashboard/admin/admin-dashboard-page";
import { config } from "../helpers/config/index";
import PrivateRoute from "./private-route";
import MyProfilePage from "../pages/dashboard/profile/my-profile-page";
import MyAdvertsPage from "../pages/dashboard/profile/my-adverts-page";
import MyFavoritesPage from "../pages/dashboard/profile/my-favorites-page";
import MyTourRequestPage from "../pages/dashboard/profile/my-tour-request-page";
import AdvertDetailPage from "../pages/dashboard/profile/advert-detail-page";
import TourRequestDetailsPage from "../pages/dashboard/profile/tour-request-details-page";
import NewAdvertPage from "../pages/dashboard/profile/new-advert-page";
import EditAdvertPage from "../pages/dashboard/profile/edit-advert-page";
import AdvertPage from "../pages/advert-page";
import Error401Page from "../pages/errors/error-401";
import Error404Page from "../pages/errors/error-404";
import AdminAdvertTypeNew from "../pages/dashboard/admin/admin-advert-type-new";
import AdminAdvertTypeEdit from "../pages/dashboard/admin/admin-advert-type-edit";
import AdminAdvertTypes from "../pages/dashboard/admin/admin-advert-types";
import AdminAdvertsPage from "../pages/dashboard/admin/admin-adverts-page";
import AdminAdvertsEdit from "../pages/dashboard/admin/admin-adverts-edit";
import AdminUserEditPage from "../pages/dashboard/admin/admin-user-edit-page";
import UsersPage from "../pages/dashboard/admin/admin-users-page";
import AdminReportsPage from "../pages/dashboard/admin/admin-reports-page";
import ResetDatabasePage from "../pages/dashboard/admin/reset-database-page";
import AdminContactMessageListPage from "../pages/dashboard/admin/admin-contact-message-list-page";
import AdminCategoryListPage from "../pages/dashboard/admin/admin-category-list-page";
import AdminCategoryNewPage from "../pages/dashboard/admin/admin-category-new-page";
import AdminTourRequestPage from "../pages/dashboard/admin/admin-tour-request-page";
import AdminTourRequestDetail from "../components/dashboard/admin/tour-requests/admin-tour-request-detail";
import AdminCategoryEditPage from "../pages/dashboard/admin/admin-category-edit-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "ad/:query",
        element: <AdvertPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPage />,
      },
      {
        path: "reset-password",
        element: <ResetPasswordPage />,
      },
      {
        path: "change-password",
        element: <ChangePasswordPage />,
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute roles={config.pageRoles.myProfile}>
            <MyProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: "my-adverts",
        element: (
          <PrivateRoute roles={config.pageRoles.myAdverts}>
            <MyAdvertsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "my-favorites",
        element: (
          <PrivateRoute roles={config.pageRoles.myFavorites}>
            <MyFavoritesPage />
          </PrivateRoute>
        ),
      },
      {
        path: "my-tour-requests",
        element: (
          <PrivateRoute roles={config.pageRoles.myFavorites}>
            <MyTourRequestPage />
          </PrivateRoute>
        ),
      },
      {
        path: "tour-request-details",
        element: <TourRequestDetailsPage />,
      },
      {
        path: "/ad",
        element: (
          <PrivateRoute roles={config.pageRoles.myAdverts}>
            <NewAdvertPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/advert/:slug",
        element: <AdvertDetailPage />,
      },
      {
        path: "/ad/edit",
        element: (
          <PrivateRoute roles={config.pageRoles.myAdverts}>
            <EditAdvertPage />
          </PrivateRoute>
        ),
      },
      {
        path: "unauthorized",
        element: <Error401Page />,
      },
      {
        path: "*",
        element: <Error404Page />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute roles={config.pageRoles.dashboard}>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminDashboardPage />,
      },
      {
        path: "categories",
        children: [
          {
            index: true,
            element: <AdminCategoryListPage />,
          },
          {
            path: "category-new",
            element: <AdminCategoryNewPage />,
          },
          {
            path: "category-edit",
            element: <AdminCategoryEditPage />,
          },
        ],
      },
      {
        path: "tour-requests",
        children: [
          {
            index: true,
            element: <AdminTourRequestPage />,
          },
          {
            path: "admin-tour-request-detail",
            element: <AdminTourRequestDetail />,
          },
        ],
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "advert-type-new",
        element: <AdminAdvertTypeNew />,
      },
      {
        path: "advert-type-edit",
        element: <AdminAdvertTypeEdit />,
      },
      {
        path: "advert-types",
        element: <AdminAdvertTypes />,
      },
      {
        path: "adverts",
        element: <AdminAdvertsPage />,
      },
      {
        path: "adverts-edit-admin",
        element: <AdminAdvertsEdit />,
      },
      {
        path: "users/admin-user-edit",
        element: <AdminUserEditPage />,
      },
      {
        path: "reports",
        element: <AdminReportsPage />,
      },
      {
        path: "settings",
        element: <ResetDatabasePage />,
      },
      {
        path: "contact-messages",
        element: <AdminContactMessageListPage />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
