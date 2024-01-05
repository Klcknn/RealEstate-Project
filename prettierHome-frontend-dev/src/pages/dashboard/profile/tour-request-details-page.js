import React from 'react'
import TourRequestImage from '../../../components/dashboard/profile/tour-request-detail/tour-request-image'
import TourRequestUpdateForm from '../../../components/dashboard/profile/tour-request-detail/tour-request-update-form'
import { Col, Container, Row } from 'react-bootstrap'
import PageHeader from '../../../components/common/page-header'
import Spacer from '../../../components/common/spacer'


const TourRequestDetailsPage = () => {


  return (
    <Container>
    <PageHeader title="MY TOUR REQUESTS"/>
    <Spacer/>
    <Row >
      <Col xs={12} md={12} lg={6}>
        <TourRequestImage />
      </Col>
      <Col xs={0} md={0} lg={6}>
      <TourRequestUpdateForm/>
      </Col>
      </Row>
      <Spacer />
    
  </Container>
  )
}

export default TourRequestDetailsPage