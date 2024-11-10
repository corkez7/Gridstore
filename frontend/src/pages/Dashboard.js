import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [configurations, setConfigurations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConfigurations = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!token) return;

      try {
        const response = await axios.get(`http://localhost:5000/api/configuration/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setConfigurations(response.data);
      } catch (error) {
        console.error('Error fetching configurations:', error);
      }
    };

    fetchConfigurations();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/configuration/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setConfigurations(configurations.filter(config => config._id !== id));
    } catch (error) {
      console.error('Error deleting configuration:', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={() => navigate('/configuration/new')}>Add New Configuration</button>
      <ul>
        {configurations.map(config => (
          <li key={config._id}>
            {config.useCase}
            <button onClick={() => navigate(`/configuration/${config._id}`)}>Edit</button>
            <button onClick={() => handleDelete(config._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
