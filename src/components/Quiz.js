import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

function Quiz() {
  const { id } = useParams(); // quizId
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await API.get(`/quiz/${id}`);
        console.log("Fetched quiz:", res.data); 
        setQuiz(res.data);
      } catch (err) {
        console.error('Failed to load quiz', err);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleOptionChange = (qIndex, optionIndex) => {
    setAnswers({ ...answers, [qIndex]: optionIndex });
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post(`/quiz/${id}/submit`, { answers });
      navigate(`/result/${res.data.resultId}`);
    } catch (err) {
      console.error('Failed to submit quiz', err);
    }
  };

  if (!quiz) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <h3>{quiz.title}</h3>
      <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        {quiz.questions.map((q, index) => (
          <div className="mb-4" key={index}>
            <h5>{index + 1}. {q.question}</h5>
            {q.options.map((option, i) => (
              <div key={i} className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`question-${index}`}
                  value={i}
                  checked={answers[index] === i}
                  onChange={() => handleOptionChange(index, i)}
                />
                <label className="form-check-label">{option}</label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit" className="btn btn-success">Submit Quiz</button>
      </form>
    </div>
  );
}

export default Quiz;
