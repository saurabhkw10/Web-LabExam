import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Create() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('painting');
  const [dateCreated, setDateCreated] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9595/articles/add', {
      name,
      category,
      dateCreated,
      creatorName
    })
    .then(response => {
      console.log(response.data);
      navigate('/');
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div className="container">
      <h2>Add Article</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Painting">Painting</option>
            <option value="Photography">Photography</option>
            <option value="Fashion">Fashion</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date Created</label>
          <input
            type="date"
            className="form-control"
            value={dateCreated}
            onChange={(e) => setDateCreated(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Creator Name</label>
          <input
            type="text"
            className="form-control"
            value={creatorName}
            onChange={(e) => setCreatorName(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Submit</button>
      </form>
    </div>
  );
}
