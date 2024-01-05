import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PasswordInput from '../../../common/password-input';
import { deleteUser } from '../../../../api/auth-service';
import { AiOutlineUserDelete } from "react-icons/ai";
import ButtonLoader from '../../../common/button-loader';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../../store/providers/toast-provider';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { TbFaceIdError } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../../store/slices/auth-slice';
import { prettyDialog } from '../../../../helpers/function/toast-confirm';
import { ImUserMinus } from "react-icons/im";

const DeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state.auth);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    password: '',
  };

  const validationSchema = Yup.object({
    password: Yup.string().required('Password is required'),
  });

  const onSubmit = async (values) => {
    prettyDialog({
      message: 'Are you sure to delete your account permanently?',
      header: 'Confirmation',
      handleAccept: async () => {
        try {
          await deleteUser(values);
          dispatch(logout());
          navigate('/');
          showToast({
            severity: 'success',
            summary: 'Account deleted',
            detail: 'Account deleted successfully',
            icon: <IoMdCheckmarkCircleOutline size={50} />,
            life: 1500,
          });
        } catch (error) {
          showToast({
            severity: "error",
            summary: "Error!",
            detail: Object.values(error.response.data)[0],
            icon: <TbFaceIdError size={50} />,
            life: 1500,
          });
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className='profile-form-container'>
      <Row>
        <Col xs={12} lg={5} className='p-0'>
          <div className='profile-form-side'>
            <ImUserMinus size={100} />
            <div className='text-center'>
              <p className='m-0'>If you delete your account, all related records with this account will also be deleted permanently</p>
            </div>
          </div>
        </Col>
        <Col xs={12} lg={7} className='profile-form-main'>
          <div className="form-wrapper">
            <div className='text-center text-danger'>
              <h4>Delete Account</h4>
              <h6>Enter your password to delete your account</h6>
            </div>
            <br />
            <Form
              className="profile-form"
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <InputGroup className="mb-4">
                <PasswordInput
                  placeholder="Enter your password "
                  formik={formik}
                  field="password"
                />
              </InputGroup>

              <div className="form-submit-button">
                <Button
                  variant="secondary"
                  type="submit"
                  className="submit-button"
                  disabled={!formik.isValid || loading || user.builtIn}
                >
                  {loading ? <ButtonLoader size={20} /> : <AiOutlineUserDelete size={20} />} DELETE <span className='d-none d-sm-inline'>ACCOUNT</span>
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DeleteAccount;
