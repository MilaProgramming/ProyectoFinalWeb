import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSeedling} from '@fortawesome/free-solid-svg-icons';
import { faHome, faBoxOpen, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import "../styles/navBar.css"


class NavBar extends Component {
  
  render() {

    return <nav className="navbar">
      <div className="navbar-left">
        <FontAwesomeIcon icon={faSeedling} className="flower-icon"/>
      </div>

      <div className="navbar-right">

        <ul className="navbar-links">
          <li>
            <a href="\homePage">
              <FontAwesomeIcon icon={faHome} className="link-icon" />
              <span>Inicio</span>
            </a>
          </li>
          <li>
            <a href="\productos">
              <FontAwesomeIcon icon={faBoxOpen} className="link-icon" />
              <span>Productos</span>
            </a>
          </li>
          <li>
            <a href="\info">
              <FontAwesomeIcon icon={faInfoCircle} className="link-icon" />
              <span>Información</span>
            </a>
          </li>
        </ul>

      </div>

        <div className='navbar-right'>
            <div className="user-icon-container">

            <div className="user-dropdown">
       
            </div>
            </div>
        </div>

    </nav>

  }
}

export default NavBar; 