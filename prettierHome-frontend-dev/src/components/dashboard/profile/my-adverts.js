import React, { useEffect,  useState } from 'react'
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Button, Container } from 'react-bootstrap';
import { Image as FullImage } from 'primereact/image';
import { deleteAdvert, getAdverts } from '../../../api/adverts-service';
import { useDispatch, useSelector } from 'react-redux';
import "./my-adverts.scss"
import { FaRegEye } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { FiTrash } from "react-icons/fi";
import { LuPencil } from "react-icons/lu";
import { setCurrentRecord, setListRefreshToken} from '../../../store/slices/misc-slice'
import { Link, useNavigate } from 'react-router-dom';
import { getFavoritesCount } from '../../../api/favorites-service';
import { getTourRequestCount } from '../../../api/tour-requests-service';
import { prettyConfirm } from '../../../helpers/function/toast-confirm';
import { PiHandPalmDuotone } from 'react-icons/pi';
import { TbFaceIdError } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { useToast } from '../../../store/providers/toast-provider';


const MyAdverts = () => {

  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const {listRefreshToken } = useSelector(state => state.misc);
  const [favoritesCounts, setFavoritesCounts] = useState([]);
  const [tourRequestCounts, setTourRequestCounts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();


  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 5,
    page: 0,
    sortField: null,
    sortOrder: null,
   });

  const onPage = (event) => {
    setlazyState(event);
  };


  const getProperty = (adverts) => {
  
      return (
        <div className="getproperty">
  
          {
            <div className="image">
            <FullImage
              className='ad-thumbnail'
              src={`data:${adverts.images[0]?.type};base64, ${adverts.images[0]?.data}`}
              alt={`${adverts.images[0]?.name}`}
              preview
            />
           </div>
              
          }
          <div className='text'>
            <Link to={`/advert/${adverts.slug}`} >{adverts.title}</Link>
            <p>{adverts.country.name + " " + adverts.city.name + " " + adverts.district.name }</p>
            <p>{"$" + adverts.price}</p>
          </div>
        </div>
      );
    };
    
    const formatCreatedAt = (dateString) => {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      return date.toLocaleDateString('tr-TR', options);
    };

  const getOperationButtons = (row) => {
    if (row.builtIn) return null;

    return (

      <div className='operationsButton'>
        <Button className="btn-link" onClick={(e) => handleDelete(e, row)} >
          <FiTrash  />
        </Button>
        <Button className="btn-link" onClick={() => handleEdit(row)}>
        <LuPencil />
        </Button>
      </div>
    );
  };
  

  const handleDelete = async (event, row) => {
    prettyConfirm({
      event:event,
      message: 'Are you sure you want to delete the advert?',
      icon: <PiHandPalmDuotone size={50} />,
      acceptButtonType: 'danger',
      handleAccept: () => confirmDelete(row.id),
      handleReject: () => {
        showToast({
          severity: 'warn',
          summary: 'Canceled',
          detail: 'Advert not deleted',
          life: 2000,
          icon: <IoMdCloseCircleOutline   size={50} />,
        });
      },
    });
  };

  const confirmDelete = async (id) => {
    try {
      await deleteAdvert(id);
      showToast({
        severity: 'success',
        summary: 'Advert deleted',
        detail: 'Advert deleted successfully',
        life: 2000,
        icon: <IoMdCheckmarkCircleOutline  size={50} />,
      })
      dispatch(setListRefreshToken(Math.random()));
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
        icon: <TbFaceIdError  size={50} />,
      });
    } finally {
      setLoading(false);
    }
  };


  const handleEdit = (row) => {
    dispatch(setCurrentRecord(row));
    navigate('/ad/edit');

  };


  const getStatus = (adverts) => (
    <Tag
      value={adverts.statusForAdvert}
      style={{ backgroundColor: getStyle(adverts.statusForAdvert)}}
    />
  );  

const getStyle = (status) => {
  const statusStyles = {
    'PENDING': '#f18506',
    'ACTIVATED': '#61c141',
    'REJECTED': '#ec4747',
  };

  return statusStyles[status] || null;
};


const getViewLikeTour = (adverts) => {

    const favoritesCount = favoritesCounts[adverts.id] ;
    const tourRequestCount = tourRequestCounts[adverts.id];
 
    return (
      <div className='icons'>
        <div><FaRegEye/>  {adverts.viewCount}</div>
        <div><FaRegHeart />  {favoritesCount}</div>
        <div><GoLocation />  {tourRequestCount} </div>
      </div>
    );
  };


  const getFavoritesCountForAdvert = async (id) => {
    try {
      const resp = await getFavoritesCount(id);
      setFavoritesCounts(prevFavorites => ({
        ...prevFavorites,
        [id]: resp,
      }));
    } catch (err) {
      console.error("Error getting favorites count:", err);
    } 
  };

  const getTourRequestCountForAdvert = async (id) => {
    try {
      const resp = await getTourRequestCount(id);
      setTourRequestCounts(prevTourRequest => ({
        ...prevTourRequest,
        [id]: resp,
      }));
    } catch (err) {
      console.error("Error getting Tour Request count:", err);
    } 
  };

    const loadData = async (page) => {
      try {
        const resp = await getAdverts(page, lazyState.rows);
        setAdverts(resp.content);
        setTotalRows(resp.totalElements);
        
        for (const advert of resp.content) {
          getFavoritesCountForAdvert(advert.id);
        }
       
        for (const advert of resp.content) {
          getTourRequestCountForAdvert(advert.id);
        }
    
      } catch (err) {
        showToast({
          severity: "error",
          summary: "Error!",
          detail: Object.values(err.response.data)[0],
          life: 3000,
          icon: <TbFaceIdError   size={50} />,
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


  
  const property = (adverts) => (
    <div  style={{ padding: "0 10px" }} > 
    <div className="p-column-title mb-1" >Property</div>
      <div>{getProperty(adverts)}</div>
    </div>
  );

  const dateFormat = (row) => (
    <div  style={narrowRowStyle}>
      <span className="p-column-title">createdAt</span>
      {formatCreatedAt(row.createdAt)}
    </div>
  );

  const status = (adverts) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Status</span>
      {getStatus(adverts)}
    </div>
  );
  const ViewLikeTour = (adverts) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">View/Like/Tour</span>
      {getViewLikeTour(adverts)}
    </div>
  );

  const operationButton = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Action</span>
      {getOperationButtons(row)}
    </div>
  );



  useEffect(() => {
    loadData(lazyState.page);
  }, [lazyState, listRefreshToken]);


  return (
    <>
      <Container className="advert-container">
        <div className="tr-datatable-wrapper">
          <div className="card" >
            <DataTable   className='tr-datatable'
              lazy
              dataKey="id"
              value={adverts} // the data to display in the table
              paginator // show pagination bar
              rows={lazyState.rows} // how many rows to display in each page
              rowsPerPageOptions={[5, 10, 15, 20]} // rows per page options
              totalRecords={totalRows}
              loading={loading}
              first={lazyState.first}
              onPage={onPage}
              paginatorTemplate={"PrevPageLink PageLinks CurrentPageReport NextPageLink"}
            >
              <Column header="Property" body={property} headerStyle={{ width: '30%' }} >  </Column>
              <Column field="createdAt" className='my-custom-column' header="Date Published " body={dateFormat}></Column>
              <Column header="Status" body={status}></Column>
              <Column header="View/Like/Tour" body={ViewLikeTour}></Column>
              <Column header="Action" body={operationButton}></Column>
          
            </DataTable>
            </div>
        </div>
      </Container>
    </>
  );
};

export default MyAdverts
