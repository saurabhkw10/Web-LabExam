import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Read() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  const getArticles = () => {
    axios.get('http://localhost:9595/articles')
      .then(response => {
        console.log(response.data);
        setArticles(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleRegister = () => {
    navigate('/create');
  };

  const handleLocalStorage = (id, name, category, dateCreated, creatorName) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("category", category);
    localStorage.setItem("dateCreated", dateCreated);
    localStorage.setItem("creatorName", creatorName);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:9595/articles/delete/${id}`)
      .then(response => {
        console.log(response.data);
        getArticles();
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="container mt-3 mb-3">
      <button className="btn btn-info m-2" onClick={handleRegister}>Add Article</button>
      <h3>Articles</h3>
      <div className="row mt-3 mb-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Category</th>
              <th scope="col">Date Created</th>
              <th scope="col">Creator Name</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article._id}>
                <td>{article._id}</td>
                <td>{article.name}</td>
                <td>{article.category}</td>
                <td>{new Date(article.dateCreated).toLocaleDateString()}</td>
                <td>{article.creatorName}</td>
                <td>
                  <Link to="/update">
                    <button
                      className="btn btn-success"
                      onClick={() => handleLocalStorage(article._id, article.name, article.category, article.dateCreated, article.creatorName)}
                    >
                      Update
                    </button>
                  </Link>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(article._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
