import React from 'react';
import { Col, Container, Image, Nav, Row } from 'react-bootstrap';
import { config } from '../../helpers/config';
import "./offices.scss"

const offices = config.contact.offices;

const Offices = () => {
  return (
    <Container className="office-container">


      <Row>
        <Col xs={12} className='office-text'>
          <h4>Visit Our Office</h4>
          <p>Pretier Homes has more than 1,000 offices of all sizes and all potential of session.</p>
        </Col>
      </Row>
      <Row className='office-addresses'>
        {offices.length && offices.map((office, index) => {
          return (
            <Col key={index}>
              <Image className='img-city' src={`images/contact/${office.image}`} />
              <h4>{office.name}</h4>
              <Nav className="flex-column">
                <Nav.Link href={office.mapURL} target='_blank'>{office.address}</Nav.Link>
                <Nav.Link href={`tel:${config.contact.phone2}`}>{office.phone}</Nav.Link> </Nav>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}

export default Offices
