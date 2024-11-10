import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddEditConfiguration = () => {
  const [dimensions, setDimensions] = useState({ width: '', length: '', height: '' });
  const [useCase, setUseCase] = useState('');
  const [bins, setBins] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchConfiguration = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get(`http://localhost:5000/api/configuration/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const { dimensions, useCase, bins } = response.data;
          setDimensions(dimensions);
          setUseCase(useCase);
          setBins(bins);
        } catch (error) {
          console.error('Error fetching configuration:', error);
        }
      };

      fetchConfiguration();
    }
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    try {
      if (id) {
        // Update existing configuration
        await axios.put(`http://localhost:5000/api/configuration/update/${id}`, {
          dimensions, useCase, bins
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        // Create new configuration
        await axios.post('http://localhost:5000/api/configuration/create', {
          userId, dimensions, useCase, bins
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving configuration:', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Configuration' : 'Add New Configuration'}</h2>
      <form onSubmit={handleSave}>
        <div>
          <label>Width:</label>
          <input type="number" value={dimensions.width} onChange={(e) => setDimensions({ ...dimensions, width: e.target.value })} />
        </div>
        <div>
          <label>Length:</label>
          <input type="number" value={dimensions.length} onChange={(e) => setDimensions({ ...dimensions, length: e.target.value })} />
        </div>
        <div>
          <label>Height:</label>
          <input type="number" value={dimensions.height} onChange={(e) => setDimensions({ ...dimensions, height: e.target.value })} />
        </div>
        <div>
          <label>Use Case:</label>
          <input type="text" value={useCase} onChange={(e) => setUseCase(e.target.value)} />
        </div>
        {/* Add additional fields as needed for bins */}
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddEditConfiguration;
