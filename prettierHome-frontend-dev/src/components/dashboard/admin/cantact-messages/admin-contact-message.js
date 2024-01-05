import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Toast } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { getAllContactMessage } from "../../../../api/contact-messages";
import { useSelector } from "react-redux";
import Pagination from 'react-bootstrap/Pagination';
import Spacer from "../../../common/spacer";
import "./admin-contact-message.scss";
import moment from "moment/moment"
import { Column } from "primereact/column";

const AdminContactMessage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { listRefreshToken } = useSelector((state) => state.misc);
  const toast = useRef(null);

  const [lazyState, setLazyState] = useState({
    first: 0,
    rows: 8, // Adjust the number of rows per page
    page: 0,
    sortField: null,
    sortOrder: null,
  });

  const getMessages = async (page) => {
    setLoading(true);
    try {
      const resp = await getAllContactMessage(page, lazyState.rows);
      setMessages(resp);
      console.log(resp);
    } catch (err) {
      const errMsg = Object.values(err?.response?.data)[1]?.message;
      console.log(errMsg);
      // Handle error and show toast if necessary
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessages(lazyState.page);
  }, [lazyState.page, listRefreshToken]);


  return (
    <>
      <Container className="admin-contact-message-container">
        <Accordion>
          {messages?.content?.map((item, index) => (
            <Accordion.Item key={index} eventKey={index.toString()}>
              
              <Accordion.Header className="fw-bold"><span className="span-one">{`${item.email}`}</span><span className="span-two">{`${item.createdAt}`}</span></Accordion.Header>
              <Accordion.Body>
                <h5>{`${item.firstName} ${item.lastName}`}</h5>
                <p>{item.message}</p>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
      <Spacer />
      <Pagination className="d-flex justify-content-center">
        <Pagination.First onClick={() => setLazyState({ ...lazyState, page: 0 })} />
        <Pagination.Prev onClick={() => setLazyState({ ...lazyState, page: lazyState.page - 1 })} />
        {Array.from({ length: messages?.totalPages || 0 }, (_, index) => (
  <Pagination.Item
    key={index}
    active={index === lazyState.page}
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
/>
        <Pagination.Last
          onClick={() => setLazyState({ ...lazyState, page: messages?.totalPages - 1 })}
        />
      </Pagination>
    </>
  );
};

export default AdminContactMessage;
