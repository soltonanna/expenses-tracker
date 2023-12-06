import React from 'react';
import Container from '../components/Container';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <Container className="footer-section">
            <div className='logo'>
              <Link to='/'><span>E</span>xpenses <span>T</span>racker</Link>
            </div>
        <div className='copyright'>Copyright © 2023 ExpensesTracker. All rights reserved.</div>
      </Container>
    </footer>
  )
}

export default Footer;