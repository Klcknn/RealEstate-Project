import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import "../tour-request-detail/tour-request-image.scss"
import { useLocation } from 'react-router-dom';
import { setCurrentRecord} from '../../../../store/slices/misc-slice';

const TourRequestImage = () => {
const { currentRecord } = useSelector((state) => state.misc);
const dispatch = useDispatch();
const status=currentRecord?.status;
const location = useLocation();
if (currentRecord === null && location && location.state !== undefined) {
  dispatch(setCurrentRecord(location.state));
}

  return (
    <Container className='tour-request-container'>
      
      <Row className='tour-request-image-row'>
      <span className='status-span'>{status}</span>
          <img
            className=" tour-request-image"
            src={`data:${currentRecord?.images[0]?.type};base64,${currentRecord?.images[0]?.data}`}
            alt={`Resim ${currentRecord?.images[0]?.lenght}`}
          />
        </Row>

    </Container>
  )
}

export default TourRequestImage