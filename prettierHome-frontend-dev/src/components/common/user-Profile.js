import { Nav } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import "./user-Profile.scss"
import { removeFromLocalStorage } from "../../helpers/function/encrypted-storage"
import { logout } from "../../store/slices/auth-slice"
import { useEffect, useRef } from 'react';
import { BsArrowRight, BsFillPersonFill, BsHeart, BsHouseDoor, BsListCheck } from 'react-icons/bs';
import { SlLogout } from "react-icons/sl";
import { prettyDialog } from '../../helpers/function/toast-confirm';
import { useToast } from '../../store/providers/toast-provider';
import { resetFavs } from '../../store/slices/fav-slice';
export const UserProfile = () => {

  const { profileMenu, user, isUserLogin } = useSelector(state => state.auth);

  const dispatch = useDispatch();
  const subMenuRef = useRef();
  const { showToast } = useToast();

  const toggleMenu = () => {
    // Get the element with the id 'subMenu' from the DOM
    const subMenu = document.getElementById("subMenu");

    // Toggle the 'open-menu' class on the 'subMenu' element
    // If the class is present, remove it; if it's not present, add it
    subMenu.classList.toggle('open-menu');
  }


  const handleLogout = async () => {
    prettyDialog({
      message: 'Are you sure to log out?',
      header: 'Confirmation',
      handleAccept: () => {
        dispatch(logout());
        dispatch(resetFavs());
        showToast({
          severity: 'success',
          summary: 'Logout',
          detail: 'You have logged out',
          icon: <SlLogout size={50} />,
          life: 1500,
        });
      },
      handleReject: () => {
        showToast({
          severity: 'warn',
          summary: 'Logout',
          detail: 'You are not logged out',
          life: 1500,
        });
      }
    });

    toggleMenu(); // Close the dropdown before dispatching the logout action
  };


  // Close the dropdown when a menu item is clicked
  const handleMenuItemClick = () => {
    toggleMenu();
  };


  const handleClickOutside = (event) => {
    // If the dropdown menu exists and the clicked element is not inside the dropdown menu
    if (subMenuRef.current && !subMenuRef.current.contains(event.target)) {
      // Remove the 'open-menu' class from the dropdown menu
      document.getElementById('subMenu').classList.remove('open-menu');
    }
  };


  useEffect(() => {
    // handleClickOutside runs when cliked anywhere on the page
    document.body.addEventListener('click', handleClickOutside);

    // clean up the event Listener when the component unmounts
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    }

  }, [])

  const getIconForTitle = (title) => {
    switch (title) {
      case 'My Profile':
        return <BsFillPersonFill />;
      case 'My Adverts':
        return <BsHouseDoor />;
      case 'My Favorites':
        return <BsHeart />;
      case 'My Tour Requests':
        return <BsListCheck />;
      case 'Dashboard':
        return <BsArrowRight />;
      default:
        return null;
    }
  };

  return (
    <>
      {
        <div className='hero'>
          <Nav className='user-logo-nav' ref={subMenuRef}>
            {
              user.profilePhoto ?
                <img className='user-pic' src={`data:${user?.profilePhoto?.type};base64, ${user?.profilePhoto?.data}`} onClick={toggleMenu} />
                :
                <img className='user-pic' src="/images/profile/user.jpg" onClick={toggleMenu} />
            }
            <div className='sub-menu-wrap' id='subMenu' ref={subMenuRef} >
              <div className="sub-menu">
                <div className="user-Info">
                {
              user.profilePhoto ?
                <img className='user-pic' src={`data:${user?.profilePhoto?.type};base64, ${user?.profilePhoto?.data}`} onClick={toggleMenu} />
                :
                <img className='user-pic' src="/images/profile/user.jpg" onClick={toggleMenu} />
            }
                  <h5> {user.firstName + " " + user.lastName}</h5>
                </div>
                <hr />
                {
                  profileMenu.map((item) => (
                    <Dropdown.Item as={Link} to={item.link} key={item.title} onClick={handleMenuItemClick}>
                      <span>{item.title}</span> <span className='ok-icon'>{getIconForTitle(item.title)}</span>
                    </Dropdown.Item>
                  ))
                }
                <Dropdown.Item as={Link} onClick={(e) => handleLogout(e)}>Logout</Dropdown.Item>
              </div>
            </div>

          </Nav>

        </div>
      }
    </>
  );
}

export default UserProfile;



