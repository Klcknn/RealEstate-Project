import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import "./property-key.scss";
import { setComponentMode, setCurrentObject } from '../../../../store/slices/misc-slice';
import { useToast } from '../../../../store/providers/toast-provider';
import { TbFaceIdError } from "react-icons/tb";
import { getPropertyKeysOfCategory } from '../../../../api/property-key-service';

const PropertyKeyListForNewProperty = ({id, isAddedOrEdited}) => {

  const [propertyKey, setPropertyKey] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { showToast } = useToast();

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

  const getPropertyKeyName = (propertyKey) => {
    return propertyKey.name;
  };

  const getName = (propertyKey) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Name</span>
      <span className='pk-span'>{getPropertyKeyName(propertyKey)}</span>
    </div>
  );

  useEffect(() => {
    if (id) {
      loadData(id);
    } else {
      return () => {
        dispatch(setCurrentObject(null));
        dispatch(setComponentMode(null))
      }
    }
    // eslint-disable-next-line
    
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
            </DataTable>
          </div>    
          <div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PropertyKeyListForNewProperty;
