import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { formatCreatedAt} from "../../../../helpers/function/format-date-time"
import { useLocation } from 'react-router-dom';
import { TbFaceIdError } from "react-icons/tb";
import { getLogs } from "../../../../api/log-service";
import "./admin-user-logs.scss";
import { useToast } from "../../../../store/providers/toast-provider";

const AdminUserLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();
  const [totalRows, setTotalRows] = useState(0);
  const { listRefreshToken } = useSelector((state) => state.misc);
  const location = useLocation();
  const id = location.state?.id;


  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 0,
    sortField: null,
    sortOrder: null,
  });

  const loadData = async (page) => {
    try {
      const resp = await getLogs(id,page,lazyState.rows);

      setLogs(resp.content);
      setTotalRows(resp.totalElements);
    } catch (err) {
      const errMsg = Object.values(err?.response?.data)[1]?.message
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

  const onPage = (event) => {
    setlazyState(event);
  };

  useEffect(() => {
    loadData(lazyState.page);
  }, [lazyState, listRefreshToken]);

  return (
    <>
      <Container className="admin-user-edit-log-container">
        <div className="user-log-datatable-wrapper">
          <div className="user-log-card">
            <DataTable
              className="user-log-datatable"
              lazy
              dataKey="id"
              value={logs} // the data to display in the table
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
              <Column header="Action" field="message"></Column>
              <Column
                header="Date"
                body={(rowData) => formatCreatedAt(rowData.createdAt)}
              ></Column>
            </DataTable>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AdminUserLogs;
