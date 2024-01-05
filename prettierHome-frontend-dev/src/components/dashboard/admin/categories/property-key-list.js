import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import "./property-key.scss";
import { FiTrash } from "react-icons/fi";
import { LuPencil } from "react-icons/lu";
import { setComponentMode, setCurrentObject } from '../../../../store/slices/misc-slice';
import { prettyConfirm } from "../../../../helpers/function/toast-confirm";
import { PiHandPalmDuotone } from "react-icons/pi";
import { IoMdCheckmarkCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { useToast } from '../../../../store/providers/toast-provider';
import { TbFaceIdError } from "react-icons/tb";
import { deletePropertyKey, getPropertyKeysOfCategory } from '../../../../api/property-key-service';
import { Navigate } from 'react-router-dom';
import { MdSaveAlt } from 'react-icons/md';

const PropertyKeyList = ({id, isAddedOrEdited}) => {

  const [propertyKey, setPropertyKey] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const getOperationButtons = (row) => {
    if (row.builtIn) return null;
    return (
      <div className='operationsButton'>
        <Button className="btn-link" onClick={(e) => propertyKeyDecline(e, row)}>
          <FiTrash />
        </Button>
        <Button className="btn-link" onClick={() => handleEdit(row)}>
          <LuPencil />
        </Button>
      </div>
    );
  };

  const propertyKeyDecline = (event, row) => {
    prettyConfirm({
      event: event,
      message: "Are you sure you want to delete the property key?",
      icon: <PiHandPalmDuotone size={50} />,
      acceptButtonType: "danger",
      handleAccept: () => handleDelete(row.id),
      handleReject: () => {
        showToast({
          severity: "warn",
          summary: "Canceled",
          detail: "Property Key not deleted",
          life: 2000,
          icon: <IoMdCloseCircleOutline size={50} />,
        });
      },
    });
  };

  const handleDelete = async (id) => {
    try {
      await deletePropertyKey(id);
      setPropertyKey(propertyKey.filter((item) => item.id !== id));
      showToast({
        severity: "success",
        summary: "Deleted",
        detail: "Property Key deleted",
        life: 2000,
        icon: <IoMdCheckmarkCircleOutline size={50} />,
      });
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

  const handleEdit = (row) => {
    dispatch(setCurrentObject(row));
    dispatch(setComponentMode("edit"));

  };


  const loadData = async (categoryId) => {
    try {
      const resp = await getPropertyKeysOfCategory(categoryId);
      setPropertyKey(resp);
    } catch (err) {
      const errMsg = Object.values(err.response.data)[1];
      showToast({
        severity: "error",
        summary: "Error",
        detail: errMsg,
        life: 2000,
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
    padding: "3px 10px"
  };

  const operationButton = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Action</span>
      <span  className='pk-span'>{getOperationButtons(row)}</span>
    </div>
  );

  const getPropertyKeyName = (propertyKey) => {
    return propertyKey.name;
  };

  const getName = (propertyKey) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Name</span>
      <span className='pk-span'>{getPropertyKeyName(propertyKey)}</span>
    </div>
  );

  const handleAddPropertyKey = () => {
    dispatch(setComponentMode("new"));
  }

  useEffect(() => {
    loadData(id);
    if (!id) {
      Navigate('/dashboard/categories');
    }

    // eslint-disable-next-line
    return () => {
      dispatch(setCurrentObject(null));
      dispatch(setComponentMode(null))
    }
  }, [id, isAddedOrEdited]);
    // listRefreshToken sonsuz donguye atiyor.

  return (
    <>
      <Container className="property-key-container">
        <div className="tr-datatable-wrapper">
          <div className="card">
            <DataTable
              className='tr-datatable'
              value={propertyKey}
              header="Property Keys"
            >
              <Column header="Name" body={getName} />
              <Column header="Action" body={operationButton} />
            </DataTable>
          </div>    
          <div>
            <br />
            <Button
              className='btn-addPK' style={{ borderRadius: "10px", padding: "10px 55px", marginLeft: "10px" }}
              onClick={handleAddPropertyKey}
            >
               <MdSaveAlt style={{marginTop:"-3px", marginRight:"4px", fontSize:"1.1rem"}} />
              ADD 
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PropertyKeyList;
