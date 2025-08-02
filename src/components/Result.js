// src/components/Result.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

function Result() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await API.get(`/quiz/result/${id}`);
        setResult(res.data);
      } catch (err) {
        console.error('Failed to load result', err);
      }
    };

    fetchResult();
  }, [id]);

  if (!result) return <p>Loading result...</p>;

  return (
    <div className="container mt-5">
      <h2>Quiz Result</h2>
      <p><strong>Score:</strong> {result.score} / {result.total}</p>
      <p><strong>Percentage:</strong> {(result.score / result.total * 100).toFixed(2)}%</p>
      <button className="btn btn-primary" onClick={() => navigate('/quizlist')}>Back to Quiz List</button>
    </div>
  );
}

export default Result;
