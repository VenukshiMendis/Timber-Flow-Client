import React, { useState }  from "react"
import { Link } from "react-router-dom"
import "./header.css"

const Header = ({isLoggedIn}) => {
  const [click, setClick] = useState(false)
  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='logo'>
            <h1>TimberFlow</h1>
          </div>
          <header>
          <nav className='flexSB'>
            <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            {isLoggedIn ? (
                  <>
                    <li>
                      <h1><Link to='/'>My Profile</Link></h1>
                    </li>
                    <li>
                      <h1><Link to='/login'>Log Out</Link></h1>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <h1><Link to='/login'>Login</Link></h1>
                    </li>
                    <li>
                      <h1><Link to='/register'>Register</Link></h1>
                    </li>
                  </>
                )}
            </ul>
            <button className='toggle' onClick={() => setClick(!click)}>
              {click ? <i className='fa fa-times'> </i> : <i className='fa fa-bars'></i>}
            </button>
          </nav>
      </header>
        </div>
      </section>
    </>
  )
}

export default Header
