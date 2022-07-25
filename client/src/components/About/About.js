import React, { useState } from 'react';
import './About.css'
import Navbar from '../Navbar/Navbar'
import { Link } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {postProfilePic} from '../../actions/Images'

function About() {
    var User = JSON.parse(localStorage.getItem('Profile'));
    const userId = User?.result?._id
    const dispatch = useDispatch()

    const [data, setData] = useState('')
    const handleFile = (e) => {
        e.preventDefault();
        const data = URL.createObjectURL(e.target.files[0])
        console.log(data)
    
        const fileData = new FormData();
        fileData.append("fileupload", JSON.stringify(data));

        const formData = fileData.get("fileupload");
        
        dispatch(postProfilePic(userId, e.target.files[0]))
    }
    
  return (
    <div className='about-container container'>
        <Navbar/>
        {User === null ? <>
        <h2 style={{marginTop:'25px'}}>You Need to login first</h2>
        <Link to="/login">
            <button className='about-login-btn'>Login</button>
        </Link>
        </> : <>
        <div style={{marginTop:'25px'}}>
            
            <h2>User Details</h2>
            <form encType="multipart/form-data">
            <input type="file" name='file' onChange={handleFile}/>
            
            </form>
            
            <div style={{width:'50%', margin:'auto',marginTop:'45px'}}>
                <div style={{display:'flex'}}>
                    <h4>Name:</h4>
                    <span style={{fontSize:'20px', marginLeft:'8px'}}>{User?.result?.name}</span>
                </div>
                <br/>
                <div style={{display:'flex'}}>
                    <h4>Email:</h4>
                    <span style={{fontSize:'20px', marginLeft:'8px'}}>{User?.result?.email}</span>
                </div>
                <br/>
                <div style={{display:'flex'}}>
                    <h4>Mobile:</h4>
                    <span style={{fontSize:'20px', marginLeft:'8px'}}>{User?.result?.mobile}</span>
                </div>
                <br/>
                <div style={{display:'flex'}}>
                    <h4>Address:</h4>
                    <span style={{fontSize:'20px', marginLeft:'8px'}}>{User?.result?.address}</span>
                </div>
            </div>
        </div>
        </>}
    </div>
  )
}

export default About