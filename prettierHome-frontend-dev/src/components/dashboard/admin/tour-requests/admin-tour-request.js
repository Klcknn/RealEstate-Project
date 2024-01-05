import React, { useEffect, useRef, useState } from 'react'
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Image as FullImage } from 'primereact/image';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { deleteTourRequest, getAllTourRequestByAdminManager } from '../../../../api/tour-requests-service';
import { useDispatch, useSelector } from 'react-redux';
import { FiTrash } from "react-icons/fi";
import { LuPencil } from "react-icons/lu";
import { setCurrentRecord, setListRefreshToken} from '../../../../store/slices/misc-slice'
import { Link, useNavigate } from 'react-router-dom';
import "./admin-tour-request.scss";
import { prettyConfirm } from "../../../../helpers/function/toast-confirm";
import { PiHandPalmDuotone } from "react-icons/pi";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { TbFaceIdError } from "react-icons/tb";
import { useToast } from '../../../../store/providers/toast-provider';
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';



const AdminTourRequest = () => {

  const [adminTourRequest, setAdminTourRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);
  const { listRefreshToken, currentOperation } = useSelector(state => state.misc);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {showToast} = useToast()

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
    navigate('/dashboard/tour-requests/admin-tour-request-detail');
  };

  
  const getStatus = (adminTourRequest) => (
    <Tag
      value={adminTourRequest.status}
      style={{ backgroundColor: getStyle(adminTourRequest.status)}}
    />
  );  


const getStyle = (status) => {
  const colors = {
    PENDING: '#f18506',
    ACTIVATED: '#61c141',
    REJECTED: '#ec4747'
  };

  return colors[status] || null;
};

 

const getProperty = (adminTourRequest) => {

    return (
      <div className="getproperty">
        
        {
          <div className="image">
            <FullImage
              className='ad-thumbnail'
              src={`data:${adminTourRequest?.images[0]?.type};base64, ${adminTourRequest?.images[0]?.data}`}
              alt={`${adminTourRequest?.images[0]?.name}`}
              preview
            />
          </div>
        }
        <div className='text'>
        <Link to={`/${adminTourRequest.advert.slug}`} >{adminTourRequest.advert.title}</Link>
          <p>{adminTourRequest.advert.country.name + " " + adminTourRequest.advert.city.name + " " + adminTourRequest.advert.district.name }</p>
          <p>{"$" + adminTourRequest.advert.price}</p>
        </div>
      </div>
    );
  };


    const getFullNameOwner = (adminTourRequest) => {

      const firstName = adminTourRequest.ownerUser.firstName;
      const lastName = adminTourRequest.ownerUser.lastName;

      return `${firstName} ${lastName}`;

    }
    const getFullNameGuest = (adminTourRequest) => {

      const firstName = adminTourRequest.guestUser.firstName;
      const lastName = adminTourRequest.guestUser.lastName;

      return `${firstName} ${lastName}`;

    }

  const loadData = async (page) => {
    
      try {
        const resp = await getAllTourRequestByAdminManager(page, lazyState.rows, "tourDate", "desc", searchQuery);
        setAdminTourRequest(resp.content);
        setTotalRows(resp.totalElements);
       
      } catch (err) {
        const errMsg = Object.values(err.response.data)[1]
        showToast({
          severity: "error",
          summary: "Error",
          detail: errMsg,
          life: 2000,
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

 

  const property = (adminTourRequest) => (
    <div  style={{ padding: "0 10px" }} > 
      <div className="p-column-title mb-1" >Property</div>
      <div>{getProperty(adminTourRequest)}</div>
    </div>
  );
  
  const fullNameOwner = (adminTourRequest) => (
    <div  style={narrowRowStyle}>
      <span className="p-column-title ">Owner</span>
      {getFullNameOwner(adminTourRequest)}
    </div>
  );
  const fullNameGuest = (adminTourRequest) => (
    <div  style={narrowRowStyle}>
      <span className="p-column-title ">Guest</span>
      {getFullNameGuest(adminTourRequest)}
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
  
  const onPage = (event) => {
    setlazyState(event);
    };
    
  useEffect(() => {

    loadData(lazyState.page);

  }, [lazyState, listRefreshToken, searchQuery]);


  const handleSearch = () => {
    const query = inputRef.current.value.trim();
    setSearchQuery(inputRef.current.value);
    loadData(lazyState.page, query);
  };


  return (
    <>
      <Container className="admin-tour-request-container" >
        <div className="search-tour-request ">
          <InputGroup className="search-input">
          <Form.Control
            aria-label="Search"
            placeholder="Type Something"
            ref={inputRef}
          />
          {searchQuery && (
            <InputGroup.Text
              className="clear-wrapper"
              variant="outline-secondary"
            >
              <Button
                className=" clear-btn btn-link"
                onClick={() => setSearchQuery("")}
              >
                <HiXMark size={20} strokeWidth={0.5} />
              </Button>
            </InputGroup.Text>
          )}

          <Button
            onClick={() => handleSearch()}
            className="search-button"
            variant="outline-secondary"
          >
            <HiMagnifyingGlass strokeWidth={1} />
          </Button>
        </InputGroup>


        </div>

        <div className="tr-datatable-wrapper">
          <div className="card">
            <DataTable   className='tr-datatable'
              lazy
              dataKey="id"
              value={adminTourRequest} // the data to display in the table
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
              <Column header="Owner" body={fullNameOwner}></Column>
              <Column header="Guest" body={fullNameGuest}></Column>
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

export default AdminTourRequest;