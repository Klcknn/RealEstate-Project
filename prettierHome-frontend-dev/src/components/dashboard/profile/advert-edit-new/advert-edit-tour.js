import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";
import { Container } from "react-bootstrap";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import "./advert-edit-tour.scss";
import { HiCheck, HiXMark } from "react-icons/hi2";
import { PiHandshakeFill, PiHandPalmDuotone } from "react-icons/pi";
import {
  approveTourRequest,
  declineTourRequest,
  getTourRequestByAdvert,
} from "../../../../api/tour-requests-service";
import { setListRefreshToken } from "../../../../store/slices/misc-slice";
import { prettyConfirm } from "../../../../helpers/function/toast-confirm";
import {
  formatDate,
  formatTime,
} from "../../../../helpers/function/format-date-time";
import { useToast } from "../../../../store/providers/toast-provider";

const AdvertEditTour = () => {
  const [loading, setLoading] = useState(true);
  const [totalRows, setTotalRows] = useState(0);
  const [tour, setTour] = useState([]);
  const { listRefreshToken, currentRecord } = useSelector(
    (state) => state.misc
  );

  const dispatch = useDispatch();
  const { showToast } = useToast();
  // CONFIRM & TOAST
  const handleDecline = async (row) => {
    try {
      await declineTourRequest(row.id);
      showToast({
        severity: "warn",
        summary: "Declined",
        detail: "Tour request declined",
        life: 3000,
        icon: <PiHandPalmDuotone size={50} />,
      });
      dispatch(setListRefreshToken(Math.random()));
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
      });
    }
  };

  const handleApprove = async (row) => {
    try {
      await approveTourRequest(row.id);
      showToast({
        severity: "success",
        summary: "Approved",
        detail: "Tour request approved",
        life: 3000,
        icon: <PiHandshakeFill size={50} />,
      });
      dispatch(setListRefreshToken(Math.random()));
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
      });
    }
  };

  const queryTourDecline = (event, row) => {
    prettyConfirm({
      event: event,
      message: "Are you sure you want to reject the tour request?",
      icon: <PiHandPalmDuotone size={50} />,
      acceptButtonType: "danger",
      handleAccept: () => handleDecline(row),
    });
  };

  const queryTourApprove = (event, row) => {
    prettyConfirm({
      event: event,
      message: "Are you sure you want to accept the tour request?",
      icon: <PiHandshakeFill size={50} />,
      acceptButtonType: "success",
      handleAccept: () => handleApprove(row),
    });
  };

  //TABLE PAGE DATA
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 5,
    page: 0,
    sortField: null,
    sortOrder: null,
  });

  const onPage = (event) => {
    if (event.page === lazyState.page) return;
    setlazyState(event);
  };

  const loadData = async (page) => {
    try {
      const resp = await getTourRequestByAdvert(
        currentRecord.id,
        page,
        lazyState.rows
      );
      setTour(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      const errMsg = Object.values(err.response.data)[0];
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(lazyState.page);
  }, [lazyState, listRefreshToken]);

  //STATUS & STYLE
  const getStatus = (tour) => (
    <Tag
      value={tour.status}
      style={{ backgroundColor: getStyle(tour.status) }}
    />
  );

  const getStyle = (status) => {
    switch (status) {
      case "PENDING":
        return "#f18506";
      case "APPROVED":
        return "#61c141";
      case "DECLINED":
        return "#ec4747";
      case "CANCELED":
        return "#ff0000";
      default:
        return null;
    }
  };

  const getOperationButtons = (row) => {
    if (row.built_in) return null;
    return (
      <span className="operationsButtons">
        <Button
          className="btn-link"
          onClick={(e) => {
            queryTourDecline(e, row);
          }}
        >
          <HiXMark />
        </Button>
        <Button
          className="btn-link"
          onClick={(e) => {
            queryTourApprove(e, row);
          }}
        >
          <HiCheck />
        </Button>
      </span>
    );
  };

  //NARROW TABLE & STYLE
  const narrowRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
  };

  const fullName = (rowData) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Guest Name</span>
      {rowData.guestUserFullName}
    </div>
  );
  const advertStatus = (rowData) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Status</span>
      {getStatus(rowData)}
    </div>
  );
  const tourRequestDate = (date) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Tour Date</span>
      {formatDate(date)}
    </div>
  );
  const tourRequestTime = (time) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Tour Time</span>
      {formatTime(time)}
    </div>
  );
  const operationButtons = (rowdata) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Action</span>
      {getOperationButtons(rowdata)}
    </div>
  );

  return (
    <>
      <Container className="tour-request-container">
        <h5>Tour Requests</h5>
        <div className="tr-datatable-wrapper">
          <div className="card">
            <DataTable
              className="tr-datatable"
              lazy
              dataKey="id"
              value={tour}
              paginator
              rows={lazyState.rows}
              totalRecords={totalRows}
              loading={loading}
              first={lazyState.first}
              onPage={onPage}
              tableStyle={{ minHeight: "122px" }}
              paginatorTemplate={
                "PrevPageLink PageLinks CurrentPageReport NextPageLink"
              }
            >
              <Column
                header="Guest"
                field="guestUserFullName"
                headerStyle={{ width: "30%" }}
                body={fullName}
              ></Column>
              <Column
                header="Status"
                field="status"
                className="my-custom-column"
                body={advertStatus}
              ></Column>
              <Column
                header="Tour Request Date"
                body={(rowData) => tourRequestDate(rowData.tourDate)}
              ></Column>
              <Column
                header="Tour Request Time"
                body={(rowData) => tourRequestTime(rowData.tourTime)}
              ></Column>
              <Column
                header="Action"
                body={(rowData) => operationButtons(rowData)}
              ></Column>
            </DataTable>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AdvertEditTour;
