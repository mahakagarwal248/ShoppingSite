import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import buffer from 'buffer';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import './Login.css';
import Navbar from '../Navbar/Navbar'
import {forgotPassword, login, updatedPassword} from '../../actions/Users';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  textAlign:'center'
};


function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fgEmail, setFgEmail] = useState('')
  const [ans, setAns] = useState('')
  
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editPW, setEditPw] = useState(false)
  const [newPW, setNewPW] = useState('')

  const handleModalSubmit =(e) => {
    e.preventDefault();
    dispatch(forgotPassword({fgEmail,ans}));
    setEditPw(true)
  }

  const handlePWSubmit = (e) => {
    e.preventDefault();
    dispatch(updatedPassword({fgEmail,newPW}))
    setOpen(false)
    navigate('/login')
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!email && !password){
      alert('Invalid credentials')
    }
    const data = {email, password};
    const loginData = JSON.stringify(data)
    const encodedText = buffer.Buffer.from(loginData).toString('base64')
    dispatch(login(encodedText, navigate))
  }

  return (
    <div className='login-container container'>
      <Navbar/>
      <div style={{marginTop:'80px'}}>
      <h2>Login Here</h2>
        <div style={{marginTop:'25px'}}>
          <form className='login-form' onSubmit={handleSubmit}>
            <label>Email</label><br/>
            <input type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
            <br/>
            <label>Password</label><br/>
            <input type={showPw ? "text" : "password"} minLength="6" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
            <RemoveRedEyeIcon onClick={() => setShowPw(!showPw)} style={{marginLeft:'2px'}}/>
            <br/>
            <button type='submit' className='login-form-btn'>Login</button>
            <br/>
            <button onClick={handleOpen} style={{background:'transparent', border:'none',color:'white',padding:'0'}}>Forgot Password?</button>
            <div>
              <span>New User?</span>
              <Link to="/register">
                <button className='signup-btn'>Sign up</button>
              </Link>
              <span>now.</span>
            </div>
          </form>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {editPW ? 
          <>
          <div style={{display:'flex',marginTop:'-15px',marginBottom:'45px'}}>
            <h5 style={{marginTop:'0'}}>Change Password</h5>
            <button onClick={handleClose} className="cross-btn">X</button>
          </div>
          <p style={{fontSize:'18px', fontWeight:'500',marginBottom:'0'}}>Enter new password</p>
          <input onChange={(e) => setNewPW(e.target.value)} type="text" placeholder='Enter security answer here' style={{width:'90%',border:'2px solid black',borderRadius:'5px',marginBottom:'15px'}}/>
          <button className='submit-btn' onClick={handlePWSubmit}>Submit</button>
          </> : <>
          <div style={{display:'flex',marginTop:'-15px',marginBottom:'45px'}}>
            <h5 style={{marginTop:'0'}}>Security Question</h5>
            <button onClick={handleClose} className="cross-btn">X</button>
          </div>
          <p style={{fontSize:'18px', fontWeight:'500',marginBottom:'0'}}>Enter your email Id</p>
          <input onChange={(e) => setFgEmail(e.target.value)} type="text" placeholder='Enter email here' style={{width:'90%',border:'2px solid black',borderRadius:'5px',marginBottom:'15px'}}/>
          <br/>
          <p style={{fontSize:'18px', fontWeight:'500',marginBottom:'0'}}>What is the name of the street that you live in?</p>
          <input onChange={(e) => setAns(e.target.value)} type="text" placeholder='Enter security answer here' style={{width:'90%',border:'2px solid black',borderRadius:'5px',marginBottom:'15px'}}/>
          <button className='submit-btn' onClick={handleModalSubmit}>Submit</button>
          </>}
        </Box>
      </Modal>
    </div>
  )
}

export default Login