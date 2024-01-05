import React, { useEffect, useRef, useState } from 'react'
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FiTrash } from "react-icons/fi";
import { LuPencil } from "react-icons/lu";
import { setCurrentRecord, setListRefreshToken} from '../../../../store/slices/misc-slice'
import { Link, useNavigate } from 'react-router-dom';
import { prettyConfirm } from '../../../../helpers/function/toast-confirm';
import { deleteCategory, getAdminCategory } from '../../../../api/categories-service';
import { FaCheck, FaTimes } from "react-icons/fa";
import "./admin-category.scss"
import { PiHandPalmDuotone } from 'react-icons/pi';
import { useToast } from '../../../../store/providers/toast-provider';
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { TbFaceIdError } from "react-icons/tb";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HiMagnifyingGlass, HiXMark } from 'react-icons/hi2';



const AdminCategoryList = () => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const {listRefreshToken } = useSelector(state => state.misc);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {showToast} = useToast()

  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);

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


  const getOperationButtons = (row) => {
     if (row.builtIn) return null;
    return (

      <div className='operationsButton'>
        <Button className="btn-link"  onClick={(e) => handleDelete(e, row)} >
          <FiTrash  />
        </Button>
        <Button className="btn-link" onClick={() => handleEdit(row)} >
        <LuPencil />
        </Button>
      </div>
    );
  };
  

  const handleDelete = async (event, row) => {
    prettyConfirm({
      event:event,
      message: 'Are you sure you want to delete the category?',
      icon: <PiHandPalmDuotone size={50} />,
      acceptButtonType: 'danger',
      handleAccept: () => confirmDelete(row.id),
      handleReject: () => {
        showToast({
          severity: "warn",
          summary: "Canceled",
          detail: "Category not deleted",
          life: 2000,
          icon: <IoMdCloseCircleOutline   size={50} />,
        });
      },
    });
  };

  
  const confirmDelete = async (id) => {
    try {
      await deleteCategory(id);
      showToast({
        severity: "success",
        summary: "Deleted",
        detail: "Category deleted successfully",
        life: 2000,
        icon: <IoMdCheckmarkCircleOutline   size={50} />,
      });
      dispatch(setListRefreshToken(Math.random()));
    } catch (error) {
      showToast({
        severity: "error",
        summary: "Error",
        detail: Object.values(error.response.data),
        life: 3000,
        icon: <TbFaceIdError   size={50} />,
      });
    } finally {
      setLoading(false);
    }
  }; 
 

  const handleEdit = (row) => {

    dispatch(setCurrentRecord(row));
    navigate('/dashboard/categories/category-edit');

  };


    const loadData = async (page) => {
      try {
        const resp = await getAdminCategory(page, lazyState.rows, "seq", "asc", searchQuery);
        setCategories(resp.content);
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
    padding: "0 10px",
};


  const operationButton = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Action</span>
      {getOperationButtons(row)}
    </div>
  );

  const getCategoryTitle = (categories) => {
    const categoryTitle = categories.title;
    return categoryTitle;
  }

  const getName = (categories) => (
    <div  style={narrowRowStyle}>
      <span className="p-column-title ">Name</span>
      {getCategoryTitle(categories)}
    </div>
  );

  const sequence = (categories) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Sequence</span>
      {getSequence(categories)}
    </div>
  );

  const getSequence = (categories) => {
    return categories.seq;
  }

  const active = (categories) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Active</span>
      {getActive(categories)}
    </div>
  );

  const getActive = (categories) => {
    return categories.active ? <FaCheck /> : <FaTimes />
  }

  const icon = (categories) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Icon</span>
      {getIcon(categories.icon)}
    </div>
  );

  const getIcon = (iconClassName) => {
    return <FontAwesomeIcon icon={iconClassName} />
  }

  useEffect(() => {
    loadData(lazyState.page);

  }, [lazyState, listRefreshToken, searchQuery]);

  const handleSearch = () => {
    const query = inputRef.current.value.trim();
    setSearchQuery(query);
    loadData(lazyState.page, query);
  };

  // const handleClearSearch = () => {
  //   // Clear the input field and trigger a reload
  //   inputRef.current.value = '';
  //   handleSearch();
  // };

  // otomation search input
  // const handleInputChange = () => {
  //   const query = inputRef.current.value.trim();
  //   setSearchQuery(query);
  //   if (query === '') {
  //     loadData(lazyState.page, '');
  //   }
  // };


  return (
    <>
      <Container className="admin-category-container">
        <Row className='g-3'>
        <Col md={8} lg={9}>
          <div className="search-category ">
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
        </Col>
        <Col md={4} lg={3}>
          <Link to="/dashboard/categories/category-new">
            <Button className='add-new-btn'>ADD NEW</Button>
          </Link>
        </Col>
        </Row>

        <div className="tr-datatable-wrapper">
          <div className="card" >
          <DataTable
            className='tr-datatable'
            lazy
            dataKey="id"
            value={categories}
            paginator
            rows={lazyState.rows}
            rowsPerPageOptions={[5, 10, 15, 20]}
            totalRecords={totalRows}
            loading={loading}
            first={lazyState.first}
            onPage={onPage}
            paginatorTemplate={"PrevPageLink PageLinks CurrentPageReport NextPageLink"}
          >
            <Column header="Icon" body={icon} ></Column>
            <Column header="Name" body={getName} ></Column>
            <Column header="Sequence" body={sequence} ></Column>
            <Column header="Active" body={active} ></Column>
            <Column header="Action" body={operationButton}></Column>
          </DataTable>
            </div>
        </div>
      </Container>
    </>
  );
};

export default AdminCategoryList
