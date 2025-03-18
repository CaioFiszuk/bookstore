import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleRegistration = ({
    email,
    password,
  }) => {
    auth.register(email, password)
      .then(() => {
        navigate("/signin");
        
      })
      .catch(console.error);   
  };

  return (
    <div>
      <Routes>
        <Route 
          path='/'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
               <Main />
            </ProtectedRoute>
          }
        />

        <Route 
          path='/signin'
          element={
            <>
              <Login />
            </>
          }
        />

        <Route 
          path='/signup'
          element={
            <>
              <Register handleRegistration={handleRegistration}/>
            </>
          }
        />

          <Route
            path="*"
            element={
              isLoggedIn ? (
              <Navigate to="/" replace />
              ) : (
              <Navigate to="/signin" replace />
              )
            }
          />
      </Routes>
    </div>
  )
}

export default App;
