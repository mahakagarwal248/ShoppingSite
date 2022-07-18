import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import './Footer.css';

function Footer() {
  const handleClick=()=>{
    window.location.assign("https://github.com/mahakagarwal248")
  }
  return (
    <div className='footer' >
      <button onClick={handleClick} style={{background:'transparent', border:'none', color:'white'}}>
        <GitHubIcon style={{marginRight:'5px'}}/>mahakagarwal248
      </button>
    </div>
  )
}

export default Footer