import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Image as FullImage } from 'primereact/image';
import { useDispatch, useSelector } from 'react-redux';
import Spacer from '../../../common/spacer';
import "./admin-tour-request-detail.scss"
import ButtonLoader from '../../../common/button-loader';
import { setListRefreshToken } from '../../../../store/slices/misc-slice';
import { useToast } from '../../../../store/providers/toast-provider';
import { IoMdCheckmarkCircleOutline} from "react-icons/io";
import { deleteTourRequest } from '../../../../api/tour-requests-service';
import { TbFaceIdError } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const AdminTourRequestDetail = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const { currentRecord } = useSelector((state) => state.misc);
    const { showToast } = useToast();
    
    const handleDelete = async () => {
        setLoading(true);
        try {

            await deleteTourRequest(currentRecord?.id);
            showToast({
                severity: "success",
                summary: "Deleted",
                detail: "Tour request deleted",
                life: 2000,
                icon: <IoMdCheckmarkCircleOutline   size={50} />,
              });
          dispatch(setListRefreshToken(Math.random()));
          navigate("/dashboard/tour-requests");
                
        } catch (error) {
            showToast({
                severity: "error",
                summary: "Error",
                detail: Object.values(error.response.data)[0],
                life: 2000,
                icon: <TbFaceIdError   size={50} />,
              });

        } finally {
            setLoading(false);
        }

    
      
    }

  return (
    <>
      <Spacer minHeight={25} />
      <Container className='admin-tour-request-detail-container'>
        <Row className='row1'>
            <Col className="image">
                <FullImage
                className='ad-thumbnail'
                src={`data:${currentRecord?.images[0]?.type};base64, ${currentRecord?.images[0]?.data}`}
                alt={`${currentRecord?.images[0]?.name}`}
                preview
                />
            </Col>

            <Col className='info mb-3'>
            <Row className="r-title mb-4">
              <Col className="c-title">
                <h3>{currentRecord?.advert?.title}</h3>
                <div> {`${currentRecord?.advert?.district?.name}, `}{" "}
                {`${currentRecord?.advert?.city?.name}, `}{" "}
                {currentRecord?.advert?.country?.name}</div>
              </Col>
              <Col className="c-price">
                {`$${currentRecord?.advert?.price}`}
              </Col>
            </Row>

            <Row className='row2 mb-4'>
              <Col>
                <Form.Group className='form-group-date-time'>
                  <Form.Text>Tour Date</Form.Text>
                  <Form.Control
                    type="text"
                    value={currentRecord.tourDate}
                    readOnly
                  />
                </Form.Group>
              </Col>

              <Col >
                <Form.Group className='form-group-date-time'>
                  <Form.Text>Tour Time</Form.Text>
                  <Form.Control
                    type="text"
                    placeholder={currentRecord.tourTime}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row className='row3'>
                <Col>
                </Col>
                <Col>
                    <Button
                        className="delete-btn"
                        variant="warning"
                        type="button"
                        onClick={handleDelete}
                        >
                        {loading ? <ButtonLoader /> : null} Delete
                    </Button>
                </Col>
              
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default AdminTourRequestDetail;
