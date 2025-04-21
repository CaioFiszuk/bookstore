import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Header from './Header';
import Dashboard from './Dashboard';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import AdminRoute from "./AdminRoute";
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import * as token from '../utils/token';
import { api } from '../utils/api';

function App() {
  const [books, setBooks] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");

  const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

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
          localStorage.setItem("isLoggedIn", "true");

          auth.getUserInfo(data.token)
            .then((user) => {
              const role = user.data.isAdmin ? "admin" : "user";
              setUserRole(role);
              localStorage.setItem("userRole", role);
              setIsLoggedIn(true);

              navigate(role === "admin" ? "/dashboard" : "/");
            });
        }
      })
      .catch((error) => {
        toast.error(error.message.slice(6));
      });
  }

  const getAllBooks = async () => {
    await api.getBooks()
    .then((data)=>{
     setBooks(data.data);
    })
    .catch((error) => console.error("Erro ao buscar os livros:", error));
  }

  const signOut = () => {
    token.removeToken();
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/signin");
  }

  useEffect(() => {
    const jwt = token.getToken();
    if (jwt) {
      auth.getUserInfo(jwt)
        .then((user) => {
          setIsLoggedIn(true);
          const role = user.data.isAdmin ? "admin" : "user";
          setUserRole(role);
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userRole", role);
        })
        .catch(() => {
          setIsLoggedIn(false);
          setUserRole(null);
          token.removeToken();
          localStorage.removeItem("userRole");
          localStorage.removeItem("isLoggedIn");
        });
    }

    getAllBooks();
  }, []);

  return (
    <div>
      <Routes>
        <Route 
          path='/'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Header handleSignOut={signOut}/>
              <Main books={books}/>
            </ProtectedRoute>
          }
        />

       <Route
         path='/dashboard'
         element={
           <AdminRoute isLoggedIn={isLoggedIn} userRole={userRole}>
             <Header handleSignOut={signOut}/>
             <Dashboard books={books} setBooks={setBooks} getAllBooks={getAllBooks}/>
           </AdminRoute>
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
