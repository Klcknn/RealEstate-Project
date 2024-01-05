import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import "./contact-info.scss";

const ContactInfo = () => {
  return (
    <Container >

    <Row className='info' >   
    <Col  sm={12} className="text1">    
    <h4>We'd Love To Hear From You.</h4>
    <p >
    We are here to answer any question you may have. As a partner of corporates, realton has more than 9,000 offices of all sizes and all potential of session.</p>
    </Col>

    <Col sm={12} className='text2'>
    <h4>Visit Our Office</h4>
    <p>Realton has more than 9,000 offices of all sizes and all potential of session.</p>
    </Col>


    </Row>
    </Container>
  )
}

export default ContactInfo