import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Footer.css';

function Footer() {
  const handleClick = () => {
    window.location.assign('https://github.com/mahakagarwal248/ShoppingSite/tree/dev');
  };
  return (
    <div className="footer">
      <button onClick={handleClick}>
        <GitHubIcon className="github-icon"/>
        mahakagarwal248
      </button>
    </div>
  );
}

export default Footer;
