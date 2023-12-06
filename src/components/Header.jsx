import React from 'react';
import Navigation from './Navigation';
import Container from './Container';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
        <Container className="header-section">
            <div className='logo'>
              <Link to='/'><span>E</span>xpenses <span>T</span>racker</Link>
            </div>
            <Navigation />
        </Container>
    </header>
  )
}

export default Header;