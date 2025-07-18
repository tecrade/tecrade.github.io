import React, { useEffect, useState } from 'react'
import '../contact/Contact.css'
import '../navbar/sidenav/Sidebar'
import Sidebar from '../navbar/sidenav/Sidebar'
import Aos from 'aos'
import 'aos/dist/aos.css'

function Contact() {
    useEffect(()=>{
       Aos.init();
    },[])
    const[form,setform]=useState({name:'',email:'',message:''})
    
    const handlechanges=(e)=>{
       const {name,value}=e.target;
       setform((preform)=>({...preform,[name]:value})) 
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
    
        // Send email using SMTP.js
        window.Email.send({
          SecureToken: 'YOUR_ELASTIC_EMAIL_API_KEY', // Replace with your Elastic Email API key
          To: 'your_email@example.com', // Replace with your email address
          From: formData.email,
          Subject: `Contact form submission from ${formData.name}`,
          Body: `Name: ${formData.name} <br> Email: ${formData.email} <br> Message: ${formData.message}`
        })
        .then((response) => {
          if (response === 'OK') {
            alert('Email sent successfully!');
          } else {
            alert('Failed to send email: ' + response);
          }
        })
    }
    return (
        <div className='container contactcontainer'>
            <div className='contactdiv'data-aos="fade-up-right" data-aos-duration="1000" id='contactbox'>
            <h1>Connect with me</h1>

            <div class="mb-3">
            <label for="floatingInput" class="form-label"><i className="fa-solid fa-user me-2"></i>Name</label>
            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="John Doe"/>
            </div>

            <div class="mb-3">
            <label for="floatingInput"><i class="fa-solid fa-envelope me-2"></i>Email</label>
                <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
            </div>
            
            <div class="mb-3">
            <label for="floatingInput" class="form-label">Message</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Your message...'></textarea>
            </div>
            <div class="mb-3">
                <button type="submit" className='btn contactbtn'>Send<i class="fa-solid fa-paper-plane ms-2"></i></button>
            </div>
            </div>
            <hr></hr>
         <div className='d-lg-none footericon'><Sidebar customclass='menuicons'/></div>
        </div>
    )
}

export default Contact