import { Col, Container, Row } from "react-bootstrap";
import "./top-side.scss";
import { useDispatch} from "react-redux";
import { HiOutlineQueueList } from "react-icons/hi2";
import { useEffect, useState } from "react";
import { setOperation } from "../../store/slices/misc-slice";
import { useLocation } from "react-router-dom";

const TopSide = () => {

  // State to manage the visibility of the side menu
  const [show, setShow] = useState(false);
  // Redux dispatch function to set center
  const dispatch = useDispatch();
  // Get URL parameters and location using react-router-dom hooks
  const location = useLocation();

  // Extract the last segment of the URL path and capitalize it
  const lastSegment = location.pathname.split("/").pop();
  const upperCaseSegment =
    lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

  // Toggle the visibility of the side menu and update Redux state
  const handleSideMenu = () => {
    setShow((prev) => !prev);
    dispatch(setOperation(show));
  };

  // Handler for small screen sizes
  const handleSmallScreen = () => {
    dispatch(setOperation(false));
  };

  // Handler for large screen sizes
  const handleLargeScreen = () => {
    dispatch(setOperation(true));
  };

  // useEffect to handle window resize events
  useEffect(() => {
    // Event listener to handle window resize
    const handleResize = () => {
      // Get the page width
      const pageWidth = window.innerWidth;
      // If the width is less than 768px, handle small screen
      if (pageWidth < 768) {
        handleSmallScreen();
      } else {
        // If the width is 768px or more, handle large screen
        handleLargeScreen();
      }
    };

    //Add an event listener to be called when the page is loaded and when the window size changes
    window.addEventListener("resize", handleResize);
    handleResize(); // Check on page load

    // Remove event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // useEffect runs only once with an empty dependency array

  return (
    <Container fluid className="top-side">
      <Row>
        <Col>
          <div className="menu-icon">
            <HiOutlineQueueList onClick={handleSideMenu} size={30} />
          </div>
          <div className="home-col">
            Home / {upperCaseSegment}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default TopSide;


    // Event listener'ı sayfa yüklendiğinde ve pencere boyutu değiştiğinde çağır