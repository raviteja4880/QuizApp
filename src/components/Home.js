import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">🎓 Welcome to the Online Quiz App</h1>
      <p className="lead mb-4">
        Take a quiz and view your performance history!
      </p>

      <div className="d-flex justify-content-center gap-3">
        <Link to="/quizlist" className="btn btn-primary btn-lg">
          ▶️ Start Quiz
        </Link>
      </div>
    </div>
  );
}

export default Home;
