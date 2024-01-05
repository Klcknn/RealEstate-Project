import React from "react";
import { CiSearch } from "react-icons/ci";
import { Container, Dropdown, Form, Button } from "react-bootstrap";

const Filter = () => {
  const formSubmit = (event) => {
    event.preventDefault();

    const searchValue = document.getElementById("propertiesForm_search").value;

    const propertyStatus = document.querySelector(
      'input[name="propertiesForm_propertyStatus"]:checked'
    )?.value;
    const propertyType = document.querySelector(
      'input[name="propertiesForm_propertyType"]:checked'
    )?.value;

    const minPrice = document.getElementById("propertiesForm_minPrice").value;
    const maxPrice = document.getElementById("propertiesForm_maxPrice").value;

    const locationSelect = document.getElementById("propertiesForm_location");
    const location =
      locationSelect.options[locationSelect.selectedIndex]?.value;

    const formData = {
      searchValue,
      propertyStatus,
      propertyType,
      minPrice,
      maxPrice,
      location,
    };

    console.log("Form bilgileri:", formData);
  };

  return (
    <Dropdown className=" d-lg-none mb-5 ">
      <Dropdown.Toggle
        className="rounded-4"
        variant="success"
        id="dropdown-basic"
      >
        Filter
      </Dropdown.Toggle>

      <Dropdown.Menu className="filter-dropdown rounded-4">
        <div className="filter rounded-4">
          <Container>
            <Form id="propertiesForm" onSubmit={formSubmit}>
              <Form.Group className="mb-5">
                <Form.Label htmlFor="propertiesForm_search">
                  Find your home
                </Form.Label>

                <Form.Control
                  type="text"
                  className=" py-2"
                  placeholder="What are you looking for?"
                  id="propertiesForm_search"
                />
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label htmlFor="propertiesForm_propertyStatus">
                  Property Status
                </Form.Label>
                <div>
                  <Form.Check
                    value="All"
                    name="propertiesForm_propertyStatus"
                    type="radio"
                    label="All"
                  />
                  <Form.Check
                    value="Rent"
                    name="propertiesForm_propertyStatus"
                    type="radio"
                    label="Rent"
                  />
                  <Form.Check
                    value="Sale"
                    name="propertiesForm_propertyStatus"
                    type="radio"
                    label="Sale"
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label htmlFor="propertiesForm_propertyType">
                  Property Type
                </Form.Label>
                <div>
                  <Form.Check
                    value="All"
                    name="propertiesForm_propertyType"
                    type="radio"
                    label="All"
                  />
                  <Form.Check
                    value="Houses"
                    name="propertiesForm_propertyType"
                    type="radio"
                    label="Houses"
                  />
                  <Form.Check
                    value="Apartments"
                    name="propertiesForm_propertyType"
                    type="radio"
                    label="Apartments"
                  />
                  <Form.Check
                    value="Offices"
                    name="propertiesForm_propertyType"
                    type="radio"
                    label="Offices"
                  />
                  <Form.Check
                    value="Villas"
                    name="propertiesForm_propertyType"
                    type="radio"
                    label="Villas"
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label htmlFor="propertiesForm_priceRange">
                  Price Range
                </Form.Label>
                <div className="d-flex gap-4 p-2">
                  <Form.Control
                    id="propertiesForm_minPrice"
                    type="number"
                    placeholder="Min"
                    min="0"
                  />

                  <Form.Control
                    id="propertiesForm_maxPrice"
                    type="number"
                    placeholder="Max"
                    min="0"
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-5">
                <Form.Label htmlFor="propertiesForm_location">
                  Location
                </Form.Label>
                <Form.Select id="propertiesForm_location">
                  <option disabled>City</option>
                  <option value="istanbul">İstanbul</option>
                  <option value="izmir">İzmir</option>
                  <option value="ankara">Ankara</option>
                </Form.Select>
              </Form.Group>

              <Button className="w-100 py-3" type="submit">
                <CiSearch size={22} /> Search
              </Button>
            </Form>
          </Container>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Filter;
