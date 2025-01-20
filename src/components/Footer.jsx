import React from 'react';
import './style.css';

const Footer = () => {
  return (
    <div id='footer' className='bg-info text-white py-4'>
      <div className='container'>
        <div className='row'>
          <div className='col text-center'>
            <h5>The Bulletin News</h5>
            <p>Stay updated with the latest news from around the India.</p>
          </div>
        </div>
        <div className='row justify-content-center'>
          <div className='col-auto'>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          </div>
        </div>
        <hr />
        <div className='text-center'>
          <p>&copy; 2025 The Bulletin News. All Rights Reserved.</p>
          <p>Developed by Manoj Karekar</p>

        </div>
      </div>
    </div>
  );
}

export default Footer;
