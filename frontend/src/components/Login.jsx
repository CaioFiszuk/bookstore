import { Link } from "react-router-dom";

function Login() {

    return (
      <div>
        <form>
            <legend>Entrar</legend>

            <input 
              type='email' 
              name='email'
              placeholder='E-mail' 
            />

            <input 
              type='password' 
              name='password'
              placeholder='Senha' 
            />

            <button type="submit">Entrar</button>

            <span>Ainda não é membro? Inscreva-se <Link to='/signup' className='link'>aqui!</Link></span>
         </form>
      </div>
    )
  }
  
  export default Login;
  