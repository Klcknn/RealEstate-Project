import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { VscSearch } from "react-icons/vsc";
import Spacer from "../../../components/common/spacer";
import { LuPencil } from "react-icons/lu";
import { FiTrash } from "react-icons/fi";
import {
  deleteAdvertType,
  getAllAdvertType,
} from "../../../api/advert-type-service";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentRecord,
  setListRefreshToken,
} from "../../../store/slices/misc-slice";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../store/providers/toast-provider";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";

const AdminAdvertTypes = () => {
  const { showToast } = useToast();
  const [advertTypes, setAdvertTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { listRefreshToken } = useSelector((state) => state.misc);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const fetchAllAdvertTypes = async () => {
    try {
      const resp = await getAllAdvertType();
      setAdvertTypes(resp);
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

  useEffect(() => {
    fetchAllAdvertTypes();
  }, [listRefreshToken, searchTerm]);

  const findAdvertTypes = () => {
    const filteredAdvertTypes = advertTypes.filter((advertType) =>
      advertType.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setAdvertTypes(filteredAdvertTypes);
  };

  const deleteType = async (id) => {
    try {
      const resp = await deleteAdvertType(id);
      dispatch(setListRefreshToken(Math.random()));
      showToast({
        severity: "success",
        summary: "Success!",
        detail: "Advert type deleted successfully",
        life: 3000,
      });
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

  const handleEdit = (advertType) => {
    dispatch(setCurrentRecord(advertType));
    navigate("/dashboard/advert-type-edit");
  };

  return (
    <Container className="advert-types-page">
      <div className="advert-types-page-search-div">
        {/*ESKİ YÖNTEM */}
        {/* <div className="search-input">
          <Form.Control
            type="text"
            placeholder="Type Something"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <Button className="search-icon" onClick={() => findAdvertTypes()}>
            <VscSearch />
          </Button>
        </div> */}
        <InputGroup className="search-input">
          <Form.Control
            placeholder="Type Something"
            x
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          {searchTerm && (
            <InputGroup.Text
              className="clear-wrapper"
              variant="outline-secondary"
            >
              <Button
                className=" clear-btn btn-link"
                onClick={() => setSearchTerm("")}
              >
                <HiXMark size={20} strokeWidth={0.5} />
              </Button>
            </InputGroup.Text>
          )}

          <Button
            onClick={() => findAdvertTypes()}
            className="search-button"
            variant="outline-secondary"
          >
            <HiMagnifyingGlass strokeWidth={1} />
          </Button>
        </InputGroup>

        <Button
          className="add-new-btn"
          onClick={() => navigate("/dashboard/advert-type-new")}
        >
          New
        </Button>
      </div>
      <Spacer minHeight={50} />
      <div className="table-data">
        <div className="table-header">
          <span>Title</span>
          <span>Action</span>
        </div>
        {advertTypes.map((advertType) => (
          <div className="table-rows" key={advertType.id}>
            <span>{advertType.title}</span>
            <div className="btn-div">
              <Button onClick={() => deleteType(advertType.id)}>
                <FiTrash />
              </Button>
              <Button
                onClick={() => {
                  handleEdit(advertType);
                }}
              >
                <LuPencil />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default AdminAdvertTypes;
