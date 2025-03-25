import { NavLink } from "react-router-dom";

function Header({handleSignOut}) {

    return (
      <header className='header'>
         <nav className='header__navigation'>
           <h1>Bookstore</h1>

           <ul className='header__items'>

            <li><button className='header__button' onClick={handleSignOut}>Sign Out</button></li>

           </ul>
         </nav>
      </header>
    )
  }
  
  export default Header;
  