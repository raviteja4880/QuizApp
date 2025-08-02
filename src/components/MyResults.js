import React, { useEffect, useState } from 'react';
import API from '../services/api';

function MyResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await API.get('/quiz/myresults', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setResults(res.data);
      } catch (err) {
        console.error('Failed to load results', err);
        alert('Could not load results.');
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="container mt-4">
      <h3>My Quiz Results</h3>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul className="list-group">
          {results.map((res, index) => (
            <li key={index} className="list-group-item">
              <strong>{res.quizTitle}</strong> - Score: {res.score}/{res.total} (
              {((res.score / res.total) * 100).toFixed(2)}%)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyResults;
