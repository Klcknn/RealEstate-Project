import React, { useState } from 'react'
import { Button, Container, Form, InputGroup } from 'react-bootstrap'
import "../contact-messages/admin-contact-message-search.scss";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";

const AdminContactMessageSearch = () => {

    const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <Container className='admin-contact-message-search-container'>
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
                className="clear-btn btn-link"
                onClick={() => setSearchTerm("")}
              >
                <HiXMark size={20} strokeWidth={0.5} />
              </Button>
            </InputGroup.Text>
          )}

          <Button
            // onClick={() => findContactMessages()}
            className="search-button"
            variant="outline-secondary"
          >
            <HiMagnifyingGlass strokeWidth={1} />
          </Button>
        </InputGroup>
      </Container>
  )
}

export default AdminContactMessageSearch