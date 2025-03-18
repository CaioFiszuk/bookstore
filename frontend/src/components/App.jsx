import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
              <Register />
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
