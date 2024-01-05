import React, { useEffect, useState } from "react";
import { getAdvertTypes, getCategories } from "../../../api/adverts-service";
import { Container, ButtonGroup, Button } from "react-bootstrap";
import { LiaSearchSolid } from "react-icons/lia";
import { useToast } from "../../../store/providers/toast-provider";
import { useDispatch } from "react-redux";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { prepareRequestParams } from "../../../helpers/function/request-param-converter";

const Banner = () => {
  const [advertTypes, setAdvertTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const { showToast } = useToast();

  // Search Params
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchAdvertTypes = async () => {
    try {
      const data = await getAdvertTypes();
      const filteredTypes = data.filter((type) => type.builtIn);
      setAdvertTypes(filteredTypes);
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

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      const filteredCategories = data.filter((category) => category.builtIn);
      setCategories(filteredCategories);
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
    fetchAdvertTypes();
    fetchCategories();
  }, []);

  const handleSearch = () => {
    const searchParams = {
      q: query,
      at: type,
      c: category,
    };
    const queryString = prepareRequestParams(searchParams);
    navigate(`ad/search?${queryString}`);
  };

  return (
    <Container className="edit">
      <div className="edit-box">
        <h1 className="edit-box-h1">
          Easy Way to Find a <br className="d-none d-lg-block" /> Perfect
          Property
        </h1>
        <ButtonGroup
          className="d-flex flex-column align-items-center align-items-lg-start"
          aria-label="Basic example"
        >
          <div className="up-side">
            {advertTypes.map((type, index) => (
              <a
                key={index}
                onClick={() => setType(type.id)}
                className="edit-box-navLink"
              >
                {/* {type.title} */}
                Buy
              </a>
            ))}
            {/* <a href="#" className="edit-box-navLink">
              Buy
            </a>
            <a href="#" className="edit-box-navLink">
              Rent
            </a>
            <a href="#" className="edit-box-navLink">
              Sell
            </a> */}
          </div>
          <div className="bottom-side d-flex p-3 bg-white gap-2">
            <input
              className="form-control mr-sm-2 border-0 rounded-3"
              type="search"
              placeholder="Search best option for you"
              aria-label="Search best option for you"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            ></input>
            <button
              className="btn btn-primary rounded-4"
              onClick={handleSearch}
            >
              <LiaSearchSolid size={25} color="white" />
            </button>
          </div>
          <div className="category-radio-group d-lg-flex gap-3 ms-3 mt-2 d-none">
            {categories.map((cat, index) => (
              <div className="radio-box" key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="ad-cat"
                  value={cat.id}
                  onChange={(e) => setCategory(e.target.value)}
                  checked={category === cat.id}
                />
                <label className="form-check-label">{cat.title}</label>
              </div>
            ))}
          </div>
        </ButtonGroup>
      </div>
    </Container>
  );
};
export default Banner;
