import React from 'react';
import { Col, Container, Image, Nav, Row } from 'react-bootstrap';

import "./address.scss"
import { config } from '../../helpers/config';

const Address
 = () => {
  return (
    <Container>
        <Row className='address'>
            <Col >
            <Image className='img-city' src="./images/contact/paris.png" width={150} />
           
            <h4>PARIS</h4>
            <Nav className="flex-column">
            <Nav.Link href={config.contact.mapURL} target='_blank'>{config.contact.address2}</Nav.Link>
              <Nav.Link href={`tel:${config.contact.phone2}`}>{config.contact.phone2}</Nav.Link> </Nav>
            
            </Col>
            <Col>
            <Image className='img-city' src="./images/contact/london.png" width={150} />
            <h4>LONDON</h4>
            <Nav className="flex-column">
            <Nav.Link href={config.contact.mapURL} target='_blank'>{config.contact.address2}</Nav.Link>
              <Nav.Link href={`tel:${config.contact.phone2}`}>{config.contact.phone2}</Nav.Link> </Nav>
            </Col>
            <Col>
            <Image className='img-city' src="./images/contact/istanbul.png"  width={150} />
            <h4>ISTANBUL</h4>
            <Nav className="flex-column">
            <Nav.Link href={config.contact.mapURL} target='_blank'>{config.contact.address2}</Nav.Link>
              <Nav.Link href={`tel:${config.contact.phone2}`}>{config.contact.phone2}</Nav.Link> </Nav>
            </Col>
        </Row>

    </Container>
  )
}

export default Address
