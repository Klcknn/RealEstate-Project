import React, { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { getAllContactMessage } from "../../../../api/contact-messages";
import { useSelector } from "react-redux";
import Pagination from 'react-bootstrap/Pagination';
import Spacer from "../../../common/spacer";
import "./admin-contact-message.scss";
import {formatCreatedAt} from "../../../../helpers/function/format-date-time";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";


const AdminContactMessage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { listRefreshToken } = useSelector((state) => state.misc);
  const [searchText, setSearchText] = useState("");

  const [lazyState, setLazyState] = useState({
    first: 0,
    rows: 8, // Adjust the number of rows per page
    page: 0,
    sortField: null,
    sortOrder: null,
  });

  const findContactMessages = () => {
    getMessages(0);
   }

  const getMessages = async (page) => {
    setLoading(true);
    try {
      const resp = await getAllContactMessage(searchText, page, lazyState.rows);
      setMessages(resp);
    } catch (err) {
      const errMsg = Object.values(err?.response?.data)[1]?.message;
    } finally {
      setLoading(false);
    }
  };
  const clearSearch = () => {
    setSearchText("");
    setLazyState((prevLazyState) => ({
      ...prevLazyState,
      page: 0, 
    }));
  };


   useEffect(() => {

    getMessages(lazyState.page);
  }, [lazyState, listRefreshToken]);

  


  return (
    <>
      <Container className="admin-contact-message-container">
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
            onClick={() => findContactMessages()}
            className="search-button"
            variant="outline-secondary"
          >
            <HiMagnifyingGlass strokeWidth={1} />
          </Button>
        </InputGroup>
      </div>
      <Spacer minHeight={30} />
        <Accordion >
          {messages?.content?.map((item, index) => (
            <Accordion.Item  key={index} eventKey={index.toString()}>
              
              <Accordion.Header className="fw-bold"><span className="span-one">{`${item.email}`}</span><span className="span-two">{(formatCreatedAt(item.createdAt))}</span></Accordion.Header>
              <Accordion.Body>
                <h5>{`${item.firstName} ${item.lastName}`}</h5>
                <p>{item.message}</p>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
        <Spacer />
        <Pagination className="admin-contact-message-pagination d-flex justify-content-center">
  <Pagination.First
    onClick={() => setLazyState({ ...lazyState, page: 0 })}
    disabled={lazyState.page === 0}  // İlk sayfadaysa devre dışı bırak
  />
  <Pagination.Prev
    onClick={() => setLazyState({ ...lazyState, page: lazyState.page - 1 })}
    disabled={lazyState.page === 0}  // İlk sayfadaysa devre dışı bırak
  />
  {Array.from({ length: messages?.totalPages || 0 }, (_, index) => (
    <Pagination.Item
      key={index}
      onClick={() => setLazyState({ ...lazyState, page: index })}
      
    >
      {index + 1}
    </Pagination.Item>
  ))}
  <Pagination.Next
    onClick={() => {
      if (lazyState.page < messages?.totalPages - 1) {
        setLazyState({ ...lazyState, page: lazyState.page + 1 });
      }
    }}
    disabled={lazyState.page === messages?.totalPages - 1}  // Son sayfadaysa devre dışı bırak
  />
  <Pagination.Last
    onClick={() => setLazyState({ ...lazyState, page: messages?.totalPages - 1 })}
    disabled={lazyState.page === messages?.totalPages - 1}  // Son sayfadaysa devre dışı bırak
    
  />
</Pagination>
<Spacer  />

      </Container>

     
    </>
  );
};

export default AdminContactMessage;
