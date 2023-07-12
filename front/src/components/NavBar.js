import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faUser } from '@fortawesome/free-solid-svg-icons';
import { faHome, faBoxOpen, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import "../styles/navBar.css"

export default function NavBar() {
  return (
        <nav className="navbar">
      <div className="navbar-left">
        <FontAwesomeIcon icon={faSeedling} className="flower-icon"/>
      </div>

      <div className="navbar-right">

        <ul className="navbar-links">
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faHome} className="link-icon" />
              <span>Inicio</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faBoxOpen} className="link-icon" />
              <span>Productos</span>
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faInfoCircle} className="link-icon" />
              <span>Información</span>
            </a>
          </li>
        </ul>

      </div>

        <div className='navbar-right'>
            <div className="user-icon-container">
            <FontAwesomeIcon icon={faUser} className="user-icon" />
            <div className="user-dropdown">
                {/* Content for user dropdown */}
            </div>
            </div>
        </div>

    </nav>

  )
}
