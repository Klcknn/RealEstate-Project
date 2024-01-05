import React, { useEffect, useState } from 'react'
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Image as FullImage } from 'primereact/image';
import { Button, Container } from 'react-bootstrap';
import { deleteTourRequest, getAllTourRequestsByUserId, getTourRequest } from '../../../../api/tour-requests-service';
import { useDispatch, useSelector } from 'react-redux';
import { FiTrash } from "react-icons/fi";
import { LuPencil } from "react-icons/lu";
import { setCurrentRecord, setListRefreshToken} from '../../../../store/slices/misc-slice';
import { Link, useNavigate } from 'react-router-dom';
import "../admin-user-edit/admin-user-tour-request-property.scss";
import { prettyConfirm } from '../../../../helpers/function/toast-confirm';
import { PiHandPalmDuotone } from "react-icons/pi";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { TbFaceIdError } from "react-icons/tb";
import { useToast } from '../../../../store/providers/toast-provider';
import { useLocation } from 'react-router-dom';



const MyTourRequest = () => {
  const [tourRequest, setTourRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const { listRefreshToken} = useSelector(state => state.misc);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {showToast} = useToast();
  const location = useLocation();
  const id = location.state?.id;

   const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 5,
    page: 0,
    sortField: null,
    sortOrder: null,
   });
  
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    return date.toLocaleString('tr-TR', options);
  };

  const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return time.toLocaleString('en-US', options);
  };


  const getOperationButtons = (row) => {
    if (row.built_in) return null;
    return (
      <div className='operationsButton'>
        <Button className="btn-link" 
          onClick={(e) => {
            tourRequestDecline(e, row);
          }}
           >
          <FiTrash  />
        </Button>
        <Button className="btn-link" 
          onClick={(e) => {
            handleEdit(row)
          }}
          >
        <LuPencil />
        </Button>
      </div>
    );
  };

  const tourRequestDecline = (event, row) => {
    prettyConfirm({
      event: event,
      message: "Are you sure you want to delete the tour request?",
      icon: <PiHandPalmDuotone size={50} />,
      acceptButtonType: "danger",
      handleAccept: () => handleDelete(row.id),
      handleReject: () => {
        showToast({
          severity: "warn",
          summary: "Canceled",
          detail: "Tour request not deleted",
          life: 2000,
          icon: <IoMdCloseCircleOutline   size={50} />,
        });
      },
    });
  };

  
  const handleDelete = async (id) => {

    try {
      await deleteTourRequest(id);
      showToast({
          severity: "success",
          summary: "Deleted",
          detail: "Tour request deleted",
          life: 2000,
          icon: <IoMdCheckmarkCircleOutline   size={50} />,
        });
      dispatch(setListRefreshToken(Math.random()))
    } catch (error) {
      showToast({
        severity: "error",
        summary: "Error",
        detail: Object.values(error.response.data)[0],
        life: 2000,
        icon: <TbFaceIdError   size={50} />,
      });
    } finally {
      setLoading(false);
    }
  };


  const handleEdit = (row) => {

    dispatch(setCurrentRecord(row));
    navigate('/tour-request-details', { state: { ...row } });
  };

  const getStatus = (tourRequest) => (
    <Tag
      value={tourRequest.status}
      style={{ backgroundColor: getStyle(tourRequest.status)}}
    />
  );  

  // style for status
  const getStyle = (status) => {
    switch (status) {
        case 'PENDING':
            return '#f18506';

        case 'ACTIVATED':
            return '#61c141';

        case 'REJECTED':
            return '#ec4747';

        default:
            return null;
    }
  }

 

const getProperty = (tourRequest) => {

    return (
      <div className="getproperty">
        
        {
          <div className="image">
            <FullImage
              className='ad-thumbnail'
              src={`data:${tourRequest.images[0]?.type};base64, ${tourRequest.images[0]?.data}`}
              alt={`${tourRequest.images[0]?.name}`}
              // height={300}
              // width='100%'
              preview
            />
          </div>
        }
        <div className='text'>
        <Link to={`/advert/${tourRequest.advert.slug}`} >{tourRequest.advert.title}</Link>
          <p>{tourRequest.advert.country.name + " " + tourRequest.advert.city.name + " " + tourRequest.advert.district.name }</p>
          <p>{"$" + tourRequest.advert.price}</p>
        </div>
      </div>
    );
  };




    const onPage = (event) => {
      setlazyState(event);
    };

    const getFullName = (tourRequest) => {

      const firstName = tourRequest.ownerUser.firstName;
      const lastName = tourRequest.ownerUser.lastName;

      return `${firstName} ${lastName}`;

    }

    const loadData = async (id,page) => {
      try {
        const resp = await getAllTourRequestsByUserId(id,page, lazyState.rows);
        setTourRequest(resp.content);
        setTotalRows(resp.totalElements);
       
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
      padding: "0 10px"
  };

  const property = (tourRequest) => (
    <div  style={{ padding: "0 10px" }} > 
      <div className="p-column-title mb-1" >Property</div>
      <div>{getProperty(tourRequest)}</div>
    </div>
  );
  
  const fullName = (tourRequest) => (
    <div  style={narrowRowStyle}>
      <span className="p-column-title ">Owner</span>
      {getFullName(tourRequest)}
    </div>
  );
  
  const status = (tourRequest) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Status</span>
      {getStatus(tourRequest)}
    </div>
  );
  
  const dateFormat = (row) => (
    <div  style={narrowRowStyle}>
      <span className="p-column-title">Tour Request Date</span>
      {formatDate(row.tourDate)}
    </div>
  );
  
  const timeFormat = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Tour Request Time</span>
      {formatTime(row.tourTime)}
    </div>
  );
  
  const operationButton = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Action</span>
      {getOperationButtons(row)}
    </div>
  );
  
  useEffect(() => {

    loadData(id,lazyState.page);

  }, [lazyState, listRefreshToken,]);


  return (
    <>
      <Container className="admin-user-tour-request-container" >
        <div className="tr-datatable-wrapper">
          <div className="card">
            <DataTable   className='tr-datatable'
              lazy
              dataKey="id"
              value={tourRequest} // the data to display in the table
              paginator // show pagination bar
              rows={lazyState.rows} // how many rows to display in each page
              rowsPerPageOptions={[5, 10, 15, 20]}
              totalRecords={totalRows}
              loading={loading}
              first={lazyState.first}
              onPage={onPage}
              paginatorTemplate={"PrevPageLink PageLinks CurrentPageReport NextPageLink"}
            >
              <Column header="Property" body={property} headerStyle={{ width: '30%' }} >  </Column>
              <Column header="Owner" body={fullName}></Column>
              <Column header="Status" body={status}></Column>
              <Column header="Tour Request Date" body={dateFormat}></Column>
              <Column header="Tour Request Time" body={timeFormat}></Column>
              <Column header="Action" body={operationButton}></Column>
            </DataTable>
            </div>
        </div>
      </Container>
    </>
  );
};

export default MyTourRequest