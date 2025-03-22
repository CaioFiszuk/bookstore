import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import * as token from '../utils/token';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleRegistration = ({ email, password }) => {
    auth.register(email, password)
      .then(() => {
        toast.success("Cadastro realizado com sucesso!", {
          position: "top-right",
          autoClose: 3000, 
          onClose: () => navigate("/signin") 
        });
      })
      .catch((error) => {
          toast.error(error.message.substr(6, 29));
      });
  };

  const handleLogin = ({ email, password }) => {
    auth
    .authorize(email, password)
      .then((data) => {
        if (data.token) {
          token.setToken(data.token);
          setIsLoggedIn(true); 
          navigate("/"); 
        }  
      })
      .catch((error) => {
        toast.error(error.message.substr(6, 31));
    });
  }

  const signOut = () => {
    token.removeToken();
    navigate("/signin");
    setIsLoggedIn(false);
  }

  useEffect(()=>{
  
    const jwt = token.getToken();
      
    if (jwt) {

      auth
      .getUserInfo(jwt)
      .then(() => {
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch(console.error);
    }
  
  }, [navigate]); 

  return (
    <div>
      <Routes>
        <Route 
          path='/'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Header handleSignOut={signOut}/>
              <Main/>
            </ProtectedRoute>
          }
        />

        <Route 
          path='/signin'
          element={
            <>
              <Login handleLogin={handleLogin}/>
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
