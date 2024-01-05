import React, { useEffect,useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FiTrash } from "react-icons/fi";
import { LuPencil } from "react-icons/lu";
import {setCurrentRecord, setListRefreshToken} from "../../../../store/slices/misc-slice";
import { useNavigate } from "react-router-dom";
import { prettyConfirm } from "../../../../helpers/function/toast-confirm";
import { PiHandPalmDuotone } from "react-icons/pi";
import { deleteUser, getUsers } from "../../../../api/user-service";
import "../users/admin-users.scss";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import { TbFaceIdError } from "react-icons/tb";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { useToast } from "../../../../store/providers/toast-provider";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const { listRefreshToken } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 0,
    sortField: null,
    sortOrder: null,
  });

  const getOperationButtons = (row) => {
    if (row.built_in) return null;
    return (
      <div className="operationsButton">
        <Button
          className="btn-link"
          onClick={(e) => {
            userDecline(e, row);
          }}
        >
          <FiTrash />
        </Button>
        <Button
          className="btn-link"
          onClick={(e) => {
            handleEdit(row);
          }}
        >
          <LuPencil />
        </Button>
      </div>
    );
  };

  const userDecline = (event, row) => {
    
    prettyConfirm({
      event: event,
      message: "Are you sure you want to delete the user?",
      icon: <PiHandPalmDuotone size={50} />,
      acceptButtonType: "danger",
      handleAccept: () => handleDelete(row.id),
      handleReject: () => {
        showToast({
          severity: "warn",
          summary: "Canceled",
          detail: "User not deleted",
          life: 2000,
          icon: <IoMdCloseCircleOutline  size={50} />,
        });
      },
    });
  };


  const findUsers = () => {
    loadData(0);
  };

  const loadData = async (page) => {
    try {
      const resp = await getUsers(searchText, page, lazyState.rows);
      setUsers(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      const errMsg = err?.response?.data.message;
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
        icon: <TbFaceIdError   size={50} />,
      });

    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      showToast({
        severity: 'success',
        summary: 'User deleted',
        detail: 'User deleted successfully',
        life: 2000,
        icon: <IoMdCheckmarkCircleOutline  size={50} />,
      })
      dispatch(setListRefreshToken(Math.random()));
    } catch (error) {
      const errMsg = Object.values(error.response.data)[0];
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
    navigate("admin-user-edit", { state: { ...row} });

  };

  const onPage = (event) => {
    if (event.page === lazyState.page) return;
    setlazyState(event);
  };
  const getFullName = (user) => {
    const firstName = user.firstName;
    const lastName = user.lastName;

    return `${firstName} ${lastName}`;
  };
  const clearSearch = () => {
    setSearchText("");
    setlazyState((prevLazyState) => ({
      ...prevLazyState,
      page: 0, // Sayfa numarasını sıfırla
    }));
  };
  

  const narrowRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
  };
  const fullName = (user) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title ">Name</span>
      {getFullName(user)}
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
      <Container className="user-container">
      <div className="advert-types-page-search-div">
        <InputGroup className="search-input">
          <Form.Control
            placeholder="Type Something"
            x
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
          {searchText&& (
            <InputGroup.Text
              className="clear-wrapper"
              variant="outline-secondary"
            >
              <Button
                className=" clear-btn btn-link"
                onClick={clearSearch}
              >
                <HiXMark size={20} strokeWidth={0.5} />
              </Button>
            </InputGroup.Text>
          )}

          <Button
            onClick={() => findUsers()}
            className="search-button"
            variant="outline-secondary"
          >
            <HiMagnifyingGlass strokeWidth={1} />
          </Button>
        </InputGroup>
      </div>


        <div className="user-datatable-wrapper">
          <div className="user-card">
            <DataTable
              className="user-datatable"
              lazy
              dataKey="id"
              value={users} // the data to display in the table
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
                className="user-column"
                header="Name"
                body={fullName}
              ></Column>
              <Column field="email" header="Email"></Column>
              <Column field="phone" header="Phone"></Column>
              <Column header="Action" body={operationButton}></Column>
            </DataTable>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Users;
