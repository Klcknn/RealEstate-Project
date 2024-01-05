import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button, Container} from 'react-bootstrap';
import { Image as FullImage } from 'primereact/image';
import { useDispatch, useSelector } from 'react-redux';
import "./my-favorites.scss";
import { FiTrash } from "react-icons/fi";
import { setListRefreshToken } from '../../../store/slices/misc-slice';
import { Link } from 'react-router-dom';
import { getFavorites, deleteFavorite } from '../../../api/favorites-service';
import { prettyConfirm } from "../../../helpers/function/toast-confirm";
import { PiHandPalmDuotone } from "react-icons/pi";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { useToast } from '../../../store/providers/toast-provider';
import { TbFaceIdError } from "react-icons/tb";
import { toggleFav } from '../../../store/slices/fav-slice';

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { listRefreshToken } = useSelector(state => state.misc);
  const dispatch = useDispatch();
  const {showToast} = useToast()

 
  const getProperty = (favorite) => {
    return (
      <div className="getproperty">
        
        {
          <div className="image">
            <FullImage
              className='ad-thumbnail'
              src={`data:${favorite.images[0]?.type};base64, ${favorite.images[0]?.data}`}
              alt={`${favorite.images[0]?.name}`}
              preview
            />
          </div>
        }

        <div className='text'>
        <Link to={`/advert/${favorite.slug}`} >{favorite.title}</Link>
          <p>{favorite.country.name + " " + favorite.city.name + " " + favorite.district.name}</p>
          <p>{"$" + favorite.price}</p>
        </div>
      </div>
    );
  };

  const getOperationButtons = (row) => {
    return (
      <div className='operationsButton'>
        <Button className="btn-link"  onClick={(e) => {
            favoriteDecline(e, row);
          }} >
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
      dispatch(toggleFav(id));
      showToast({
        severity: "success",
        summary: "Deleted",
        detail: "Favorite deleted",
        life: 2000,
        icon: <IoMdCheckmarkCircleOutline size={50} />,
      });
      dispatch(setListRefreshToken(Math.random()))
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

 
  const loadData = async () => {
    try {
      const resp = await getFavorites();
        setFavorites(resp);
    } catch (err) {
      showToast({
        severity: "error",
        summary: "Error",
        detail: "Something went wrong",
        life: 2000,
        icon: <TbFaceIdError  size={50} />,
      });
    } finally {
      setLoading(false);
    }
  };

  const narrowRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px"
  };


  const property = (tourRequest) => (
    <div  style={{ padding: "0 10px" }} > 
    <div className="p-column-title mb-1" >Property</div>
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
  }
  const category = (favorite) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Category</span>
      {getCategory(favorite)}
    </div>
  );

  const getType = (favorite) => {
    return favorite.advertType.title;
  }
  const type = (favorite) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Type</span>
      {getType(favorite)}
    </div>
  );


  useEffect(() => {
    loadData();
  }, [listRefreshToken]);

  return (
    <>

        <Container className="favorite-container" >
          <div className="tr-datatable-wrapper">
            <div className="card">
              <DataTable   className='tr-datatable'
            value={favorites}
          >
            <Column header="Property" body={property} headerStyle={{ width: '30%' }} />
            <Column header="Category"  body={category} />
            <Column header="Type"  body={type} />
            <Column header="Action" body={operationButton} />
          </DataTable>
            </div>
        </div>
      </Container>
    </>
  );
};

export default MyFavorites;
