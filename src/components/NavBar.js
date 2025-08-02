import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleAdminAccess = () => {
    const passKey = prompt('Enter pass key to access Admin Panel:');
    if (passKey === 'slrt') {
      navigate('/admin');
    } else {
      alert('Incorrect pass key. Access denied.');
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
      <Link className="navbar-brand" to="/home">Quiz App</Link>

      <div className="ms-auto d-flex align-items-center position-relative">
        {isLoggedIn && (
          <>
            <button className="btn btn-outline-primary mx-2" onClick={handleAdminAccess}>
              Admin Panel
            </button>
            <Link className="btn btn-outline-success mx-2" to="/home">Home</Link>
            <Link className="btn btn-outline-info mx-2" to="/myresults">My Results</Link>

            <div className="position-relative">
              <i
                className="bi bi-person-circle fs-4 mx-3"
                style={{ cursor: 'pointer' }}
                onClick={toggleDropdown}
              ></i>

              {showDropdown && (
                <div
                  className="position-absolute bg-white border shadow p-3"
                  style={{
                    top: '120%',
                    right: 0,
                    width: '250px',
                    zIndex: 1000,
                    borderRadius: '8px',
                  }}
                >
                  <p className="mb-1"><strong>Name:</strong> {user?.name}</p>
                  <p className="mb-2"><strong>Email:</strong> {user?.email}</p>
                  <button className="btn btn-danger btn-sm w-100" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
