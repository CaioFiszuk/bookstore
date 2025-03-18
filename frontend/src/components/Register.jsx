import { Link } from "react-router-dom";

function Register() {

    return (
      <div>
        <form>
            <legend>Cadastre-se</legend>

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

            <button type="submit">Cadastrar</button>

            <span className='auth-form__register-link'>Já é um membro? Faça o login <Link to='/signin' className='link'>aqui</Link></span>
         </form>
      </div>
    )
  }
  
  export default Register;
  