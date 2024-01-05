import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button, Container } from "react-bootstrap";
import { Image as FullImage } from "primereact/image";
import { useDispatch, useSelector } from "react-redux";
import "../admin-user-edit/admin-user-favorites-property.scss";
import { FiTrash } from "react-icons/fi";
import { setListRefreshToken } from "../../../../store/slices/misc-slice";
import { Link } from "react-router-dom";
import {deleteFavorite,getAllFavoritesByUserId} from "../../../../api/favorites-service";
import { prettyConfirm } from "../../../../helpers/function/toast-confirm";
import { PiHandPalmDuotone } from "react-icons/pi";
import { IoMdCheckmarkCircleOutline,IoMdCloseCircleOutline,} from "react-icons/io";
import { useToast } from "../../../../store/providers/toast-provider";
import { TbFaceIdError } from "react-icons/tb";
import { useLocation } from 'react-router-dom';

const AdminUserFavoritesProperty = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { listRefreshToken} = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const [totalRows, setTotalRows] = useState(0);
  const location = useLocation();
  const id = location.state?.id;
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 5,
    page: 0,
    sortField: null,
    sortOrder: null,
  });

  const getProperty = (favorite) => {
    return (
      <div className="getproperty">
        {
          <div className="image">
            <FullImage
              className="ad-thumbnail"
              src={`data:${favorite.images[0]?.type};base64, ${favorite.images[0]?.data}`}
              alt={`${favorite.images[0]?.name}`}
              preview
            />
          </div>
        }

        <div className="text">
          <Link to={`/${favorite.slug}`}>{favorite.title}</Link>
          <p>
            {favorite.country.name +
              " " +
              favorite.city.name +
              " " +
              favorite.district.name}
          </p>
          <p>{"$" + favorite.price}</p>
        </div>
      </div>
    );
  };
  const onPage = (event) => {
    setlazyState(event);
  };

  const getOperationButtons = (row) => {
    return (
      <div className="operationsButton">
        <Button
          className="btn-link"
          onClick={(e) => {
            favoriteDecline(e, row);
          }}
        >
          <FiTrash />
        </Button>
      </div>
    );
  };

  const favoriteDecline = (event, row) => {
    prettyConfirm({
      event: event,
      message: "Are you sure you want to delete the favorite?",
      icon: <PiHandPalmDuotone size={50} />,
      acceptButtonType: "danger",
      handleAccept: () => handleDelete(row.id),
      handleReject: () => {
        showToast({
          severity: "warn",
          summary: "Canceled",
          detail: "Favorite not deleted",
          life: 2000,
          icon: <IoMdCloseCircleOutline size={50} />,
        });
      },
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteFavorite(id);
      showToast({
        severity: "success",
        summary: "Deleted",
        detail: "Favorite deleted",
        life: 2000,
        icon: <IoMdCheckmarkCircleOutline size={50} />,
      });
      dispatch(setListRefreshToken(Math.random()));
    } catch (err) {
      showToast({
        severity: "error",
        summary: "Error",
        detail: Object.values(err.response.data)[0],
        life: 2000,
        icon: <TbFaceIdError size={50} />,
      });
    } finally {
      setLoading(false);
    }
  };

  const loadData = async (id, page) => {
    try {
      const resp = await getAllFavoritesByUserId(id, page, lazyState.rows);
      setFavorites(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      showToast({
        severity: "error",
        summary: "Error",
        detail: Object.values(err.response.data)[0],
        life: 3000,
        icon: <TbFaceIdError size={50} />,
      });
    } finally {
      setLoading(false);
    }
  };

  const narrowRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
  };

  const property = (tourRequest) => (
    <div style={{ padding: "0 10px" }}>
      <div className="p-column-title mb-1">Property</div>
      <div>{getProperty(tourRequest)}</div>
    </div>
  );

  const operationButton = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Action</span>
      {getOperationButtons(row)}
    </div>
  );

  const getCategory = (favorite) => {
    return favorite.category.title;
  };
  const category = (favorite) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Category</span>
      {getCategory(favorite)}
    </div>
  );

  const getType = (favorite) => {
    return favorite.advertType.title;
  };
  const type = (favorite) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Type</span>
      {getType(favorite)}
    </div>
  );

  useEffect(() => {
    
    loadData(id, lazyState.page);
  }, [lazyState, listRefreshToken]);

  return (
    <>
      <Container className="admin-user-edit-favorite-container">
        <div className="tr-datatable-wrapper">
          <div className="card">
            <DataTable
              className="tr-datatable"
              lazy
              dataKey="id"
              value={favorites} // the data to display in the table
              paginator // show pagination bar
              rows={lazyState.rows} // how many rows to display in each page
              rowsPerPageOptions={[5, 10, 15, 20]}
              totalRecords={totalRows}
              loading={loading}
              first={lazyState.first}
              onPage={onPage}
              paginatorTemplate={
                "PrevPageLink PageLinks CurrentPageReport NextPageLink"
              }
            >
              <Column
                header="Property"
                body={property}
                headerStyle={{ width: "30%" }}
              />
              <Column header="Category" body={category} />
              <Column header="Type" body={type} />
              <Column header="Action" body={operationButton} />
            </DataTable>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AdminUserFavoritesProperty;
