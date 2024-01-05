import React from 'react'
import { Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import "./advert-description.scss"


const AdvertDescription = () => {
    const { advertsCurrentRecord } = useSelector((state) => state.misc);


  return (
    <>
    <Container className="description-container ">
        <h4 className='description-title' >Description</h4>
        <Row className='description-row' >{advertsCurrentRecord?.description}</Row>

    </Container>
    </>

  )
}

export default AdvertDescription