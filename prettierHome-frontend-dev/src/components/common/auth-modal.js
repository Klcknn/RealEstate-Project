import React from 'react'
import { Button, Image, Modal } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { HiXMark } from 'react-icons/hi2'
import { useDispatch, useSelector } from 'react-redux'
import { hideModal } from '../../store/slices/fav-slice'
import './auth-modal.scss'

const AuthModal = () => {
  const { modal } = useSelector(state => state.fav);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    dispatch(hideModal())
    navigate('/login')
  }

  const handleRegister = () => {
    dispatch(hideModal())
    navigate('/register')
  }

  return (
    <>
      <Modal
        className="auth-modal"
        show={modal}
        onHide={() => dispatch(hideModal())}
        size="sm"
        centered
      >
        <Modal.Body className="auth-modal-body">
          <div className="close-wrapper">
            <Button className='close-button' onClick={() => dispatch(hideModal())}>
              <HiXMark size={20} strokeWidth={1.5} />
            </Button>
          </div>
          <Image
            fluid
            src="/images/content/search-fav.png"
            className="fav-vector"
          />
          <h4>Log in for favorite</h4>
          <p>
            Found an interesting property?<br />Login to save it for later!
          </p>
          <Button className='login-button' onClick={handleLogin}>
            Login
          </Button>
          <p>
            Don't have an account? <span className='register-link' onClick={handleRegister}>Create one now!</span>
          </p>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AuthModal