
import React, { useState, useEffect } from "react";
import { Container, Row, Col, ButtonGroup, Modal } from "react-bootstrap";
import { HiArrowsPointingOut, HiMiniHeart } from "react-icons/hi2";
import { TbMapSearch, TbTableRow, TbLayoutGrid } from "react-icons/tb";
import { getByAdvertsPage } from "../../../src/api/adverts-service"
import { useDispatch, useSelector } from "react-redux";
import { Tag } from 'primereact/tag';
import { Button } from 'react-bootstrap';
import { Image as FullImage } from 'primereact/image';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useLocation, useNavigate } from "react-router-dom";
import { useToast } from '../../store/providers/toast-provider';
import SearchPanel from "./search-panel";
import { Paginator } from "primereact/paginator";
import { setDisplayMode } from "../../store/slices/search-slice";
import PropertiesCard from "./properties-card";
import LocationDisplay from "../dashboard/profile/location/LocationDisplay";
import "./properties.scss";
import { showModal, toggleFav } from "../../store/slices/fav-slice";
import { toggleFavorite } from "../../api/favorites-service";

const Properties = () => {
  const [show, setShow] = useState(false);
  const { showToast } = useToast();
  const location = useLocation();
  const sParams = new URLSearchParams(location.search);


  const [adverts, setAdverts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const { isUserLogin } = useSelector((state) => state.auth);
  const { favorites } = useSelector((state) => state.fav);
  const { listRefreshToken } = useSelector(state => state.misc);
  const { displayMode } = useSelector(state => state.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 12,
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
        <div className="image">
          <FullImage
            className='ad-thumbnail'
            src={`data:${adverts.image?.type};base64, ${adverts.image?.data}`}
            alt={`${adverts.image?.name}`}
            preview
          />
        </div>
      </div>
    );
  };

  const handleFavorite = async (ad) => {
    if (isUserLogin) {
      try {
        await toggleFavorite(ad.id);
        dispatch(toggleFav(ad.id));
      } catch (err) {
        showToast({
          severity: "error",
          summary: "Error",
          detail: Object.values(err.response.data)[0],
        });
      }
    } else {
      dispatch(showModal());
    }
  };

  const handleDetails = (ad) => {
    navigate(`/advert/${ad.slug}`);
  };

  const getOperationButtons = (row) => {
    const isFaved = favorites.includes(row.id);
    if (row.builtIn) return null;
    return (
      <div className='operationsButton'>
        <Button className={`btn-link fav-button ${isFaved ? "faved" : ""}`} onClick={() => handleFavorite(row)}>
          <HiMiniHeart className="heart-icon" />
        </Button>
        <Button className="btn-link details-button" onClick={() => handleDetails(row)}>
          <HiArrowsPointingOut />
        </Button>
      </div>
    );
  };

  const getStatus = (adverts) => (
    <Tag
      value={adverts.statusForAdvert}
      style={{ backgroundColor: getStyle(adverts.statusForAdvert) }}
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

  const findAdverts = async (params) => {
    try {
      const resp = await getByAdvertsPage(params, lazyState.page, lazyState.rows);
      setAdverts(resp.content);
      setTotalRows(resp.totalElements);
    } catch (error) {
      const errMsg = Object.values(error.response.data)[0];
      showToast({
        severity: "error",
        summary: "Error!",
        detail: errMsg,
        life: 3000,
      });
    }
  };

  useEffect(() => {
    const params = {
      q: sParams.get('q') || "",
      at: sParams.get('at') || "",
      c: sParams.get('c') || "",
      ps: sParams.get('ps') || "",
      pe: sParams.get('pe') || "",
      ctry: sParams.get('ctry') || "",
      city: sParams.get('city') || "",
      dist: sParams.get('dist') || "",
    }
    findAdverts(params);
  }, [lazyState, listRefreshToken, location.search])

  const narrowRowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px",
  };

  const getImage = (row) => (
    <div style={{ padding: "0 10px" }} >
      {/* <div className="p-column-title" >Property</div> */}
      <div>{getProperty(row)}</div>
    </div>
  );

  const getTitle = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Title</span>
      {row.title}
    </div>
  );

  const getCity = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">City</span>
      {row.city.name}
    </div>
  );

  const getPrice = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Price</span>
      <p>{"$" + row.price}</p>
    </div>
  );


  const operationButton = (row) => (
    <div style={narrowRowStyle}>
      <span className="p-column-title">Action</span>
      {getOperationButtons(row)}
    </div>
  );

  return (
    <Container className="search-container">
      <Row>
        <Col xl={3} className="mb-4 mb-lg-0">
          <div style={{ width: '100%', height: '100%' }}>
            <SearchPanel />
          </div>
        </Col>
        <Col xl={9}>
          <div className="display-found">
            <div className="wrapper">
              <ButtonGroup>
                <Button onClick={() => dispatch(setDisplayMode("card"))}>
                  <TbLayoutGrid size={28} strokeWidth={1.5} title="Card" />
                </Button>
                <Button onClick={() => dispatch(setDisplayMode("list"))}>
                  <TbTableRow size={28} strokeWidth={1.5} title="Table" />
                </Button>
                <Button onClick={() => setShow(true)}>
                  <TbMapSearch size={28} strokeWidth={1.5} title="Map" />
                </Button>
              </ButtonGroup>
              <div className="found-text" >
                <span className="d-none d-sm-inline">Total found : </span>
                <span>{totalRows}</span>
              </div>
            </div>
          </div>
          <div style={{ width: '100%' }}>
            {
              displayMode === "card" ? (
                <Row className=" row-cols-1 row-cols-sm-2 row-cols-lg-3">
                  {
                    adverts.map((ad) => (
                      <Col key={ad.id}>
                        <PropertiesCard ad={ad} />
                      </Col>
                    ))
                  }
                </Row>
              ) : (
                <div className="tr-datatable-wrapper">
                  <div className="card" >
                    <DataTable className='tr-datatable'
                      lazy
                      dataKey="id"
                      value={adverts}
                      loading={loading}
                    >
                      <Column header="Property" body={getImage} headerStyle={{ width: '170px' }} >  </Column>
                      <Column header="Title" body={getTitle}></Column>
                      <Column header="City" body={getCity}></Column>
                      <Column header="Price" body={getPrice}></Column>
                      <Column header="Action" body={operationButton}></Column>
                    </DataTable>
                  </div>
                </div>
              )
            }
            <Paginator
              first={lazyState.first}
              rows={lazyState.rows}
              totalRecords={totalRows}
              onPageChange={onPage}
              template="PrevPageLink PageLinks CurrentPageReport NextPageLink"
            />
          </div>
        </Col>
      </Row>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        fullscreen
      >
        <Modal.Header closeButton>
          {/* <Modal.Title id="example-custom-modal-styling-title">
            Custom Modal Styling
          </Modal.Title> */}
        </Modal.Header>
        <Modal.Body style={{ padding: '0' }}>
          <LocationDisplay style={{ height: '100%', width: '100%' }} adverts={adverts} />
        </Modal.Body>
      </Modal>
    </Container >
  );
};

export default Properties;
