import { useState } from "react";
import { Link } from "react-router-dom";

function Login({ handleLogin }) {

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };

    return (
      <div>
        <form onSubmit={handleSubmit}>
            <legend>Entrar</legend>

            <input 
              type='email' 
              name='email'
              placeholder='E-mail' 
              value={data.email}
              onChange={handleChange}
            />

            <input 
              type='password' 
              name='password'
              placeholder='Senha' 
              value={data.password}
              onChange={handleChange}
            />

            <button type="submit">Entrar</button>

            <span>Ainda não é membro? Inscreva-se <Link to='/signup' className='link'>aqui!</Link></span>
         </form>
      </div>
    )
  }
  
  export default Login;
  