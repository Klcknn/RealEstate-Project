import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { FaUser, FaList, FaAd, FaCalendar, FaTags, FaDotCircle } from 'react-icons/fa';
import { getStatistics } from '../../../../api/report-service';
import './dashboard.scss';

const Dashboard = () => {

  const menu = [ // icons for dashboard elements
    { icon: <FaUser /> },
    { icon: <FaList /> },
    { icon: <FaAd /> },
    { icon: <FaCalendar /> },
    { icon: <FaTags /> },
  ];


  const [statistics, setStatistics] = useState({});

  const loadData = async () => {
    try {

      const resp = await getStatistics();
      setStatistics(resp);

    } catch (err) {
    }
  };

  // get statistics when the component mounts
  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);


  return (
    <div className="dashboard-container">
      {Object.entries(statistics).map(([key, value], index) => (
        <Card key={index} className="custom-card">
          <Card.Header>
            <span className="name">
              <FaDotCircle color="orange" size={20} /> {key.substring(5)} {/* to removing tatal words */}
            </span>
          </Card.Header>
          <Card.Body>
            <div className='div1'>{value}</div>
            <div className='div2'>{menu[index].icon}</div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;