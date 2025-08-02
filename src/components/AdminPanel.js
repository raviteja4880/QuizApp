import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';



function AdminPanel() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [questionsList, setQuestionsList] = useState([]);

  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await API.get('/quiz');
      setQuizzes(res.data);
    } catch (err) {
      console.error('Error fetching quizzes:', err);
    }
  };

const addQuestion = () => {
  const newQuestion = { question, options, correctAnswer };
  console.log('Adding question:', newQuestion); 
  setQuestionsList([...questionsList, newQuestion]);
  setQuestion('');
  setOptions(['', '', '', '']);
  setCorrectAnswer(0);
};

  

  const createQuiz = async () => {
    try {
      const quizData = {
        title,
        description,
        timeLimit,
        questions: questionsList,
      };
      await API.post('/quiz/create', quizData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (questionsList.length === 0) {
      alert('Please add at least one question before creating the quiz.');
        return;
      }

      console.log('Quiz Data to send:', quizData);
      alert('Quiz created successfully');
      setTitle('');
      setDescription('');
      setTimeLimit('');
      setQuestionsList([]);
      fetchQuizzes(); 
      navigate('/home'); 
    } catch (err) {
      console.error('Quiz creation failed', err);
      alert('Failed to create quiz');
    }
  };

  const deleteQuiz = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this quiz?');
    if (!confirm) return;

    try {
      await API.delete(`/quiz/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Quiz deleted');
      fetchQuizzes();
    } catch (err) {
      console.error('Error deleting quiz:', err);
      alert('Failed to delete quiz');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Admin Panel - Create Quiz</h2>

      <div className="mb-4">
        <input
          className="form-control mb-2"
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="form-control mb-3"
          type="number"
          placeholder="Time Limit (minutes)"
          value={timeLimit}
          onChange={(e) => setTimeLimit(e.target.value)}
        />
      </div>

      <h5>Add Question</h5>
      <input
        className="form-control mb-2"
        type="text"
        placeholder="Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      {options.map((opt, idx) => (
        <input
          key={idx}
          className="form-control mb-2"
          type="text"
          placeholder={`Option ${idx + 1}`}
          value={opt}
          onChange={(e) => {
            const updated = [...options];
            updated[idx] = e.target.value;
            setOptions(updated);
          }}
        />
      ))}
      <select
        className="form-select mb-3"
        value={correctAnswer}
        onChange={(e) => setCorrectAnswer(parseInt(e.target.value))}
      >
        <option value={0}>Option 1</option>
        <option value={1}>Option 2</option>
        <option value={2}>Option 3</option>
        <option value={3}>Option 4</option>
      </select>
      <button className="btn btn-secondary mb-3" onClick={addQuestion}>
        Add Question
      </button>

      <h6>{questionsList.length} Questions Added</h6>
      <button className="btn btn-primary" onClick={createQuiz}>
        Create Quiz
      </button>

      <hr />
      <h3 className="mt-4">Existing Quizzes</h3>
      <ul className="list-group mt-3">
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{quiz.title}</strong> — {quiz.description}
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => deleteQuiz(quiz._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
