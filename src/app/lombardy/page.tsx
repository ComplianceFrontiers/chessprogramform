/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useState } from 'react';
import axios from 'axios';
import './lombardy.scss';

const ChessRegistration = () => {
  const [formData, setFormData] = useState({
    parent_first_name: '',
    parent_last_name: '',
    child_first_name: '',
    child_last_name: '',
    child_grade: '',
    email: '',
    phone: '',
    acceptTerms: false, // Added for checkbox
    RequestFinancialAssistance: false,
    SchoolName: "Lombardy Elementary School",
  });

  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
  
    // Explicitly handle the type of the target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert("You must accept the terms and conditions to proceed.");
      return;
    }

    setLoading(true);
    formData.RequestFinancialAssistance = false;

    try {
      const response1 = await axios.post('https://backend-chess-tau.vercel.app/send-email-form-lombardy', formData);
      if (response1.status === 200) {
        const response2 = await axios.post('https://backend-chess-tau.vercel.app/submit_form', formData);
        if (response2.status === 201) {
          window.location.href = 'https://buy.stripe.com/6oE8zMaG6ePGfmM28c';
        }
      }
    } catch (error) {
      console.error('There was an error requesting financial assistance or submitting the form!', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFinancialAssistance = async () => {
    setLoading(true);
    formData.RequestFinancialAssistance = true;

    try {
      // First API call
      const response1 = await axios.post('https://backend-chess-tau.vercel.app/send-email-form-lombardy', formData);
      if (response1.status === 200) {
        
        // Second API call
        const response2 = await axios.post('https://backend-chess-tau.vercel.app/submit_form', formData);
        if (response2.status === 201) {
          setShowThankYou(true);
          setTimeout(() => {
            setShowThankYou(false);
          }, 6000);
        }
      }
    } catch (error) {
      console.error('There was an error requesting financial assistance or submitting the form!', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      {loading && (
        <div className="loading-overlay">
          <img src="/images/loading.gif" alt="Loading..." />
        </div>
      )}

{showThankYou && (
  <div className="thank-you-overlay">
     <p className="thank-you-message">
      <span>Thank you!</span> We’re excited about your interest in enrolling your child in our chess program. We understand that you are seeking financial assistance, and we appreciate your inquiry. Please allow us some time to review your request, and we will get back to you shortly.
      <br />
      <br />
      Rest assured, we are fully committed to supporting your child's development and helping them explore the many benefits that chess offers during these formative years. We look forward to providing a fun, enriching experience that will help nurture their skills and growth.
    </p>
  </div>
)}





      {!loading && !showThankYou && (
        <>
          <div className="header">
            <img
              src="/images/chesspro.png"
              alt="Delaware Chess Champs Logo"
              className="logo"
              width="150"
              height="150"
            />
            <img
              src="/images/schoolname1.png"
              alt="Mount Pleasant Elementary School"
              className="school-title"
              width="200"
              height="150"
            />
          </div>

          <h2>Chess Program: Fall 2024</h2>

          <p className="program-description">
            The Chess After-School Program gives students a fun and engaging way to learn the game while building critical thinking and problem-solving skills.
            Through interactive lessons and games, students will master key strategies, improve focus, and boost confidence, all in a supportive environment.
          </p>

          <div className="training-info">
            <p><strong>10 Week Training [K-5 Students]</strong></p>
            <p>26 Oct 2024 to 19 Oct 2024</p>
            <p>[classes on 9/26; 10/10, 10/17, 10/31, 11/14, 11/21, 11/28 ; 12/5 and 12/12 .No class on 10/3 and 10/24 Oct-2024]</p>
            <p>3:30 PM - 4:30 PM</p>
          </div>

          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Parent's Name</label>
              <div className="input-row">
                <input 
                  type="text" 
                  name="parent_first_name" 
                  placeholder="First" 
                  value={formData.parent_first_name} 
                  onChange={handleChange}
                  required
                />
                <input 
                  type="text" 
                  name="parent_last_name" 
                  placeholder="Last" 
                  value={formData.parent_last_name} 
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Child's Name</label>
              <div className="input-row">
                <input 
                  type="text" 
                  name="child_first_name" 
                  placeholder="First" 
                  value={formData.child_first_name} 
                  onChange={handleChange}
                  required
                />
                <input 
                  type="text" 
                  name="child_last_name" 
                  placeholder="Last" 
                  value={formData.child_last_name} 
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <label>Child's Grade</label>
              <select 
                name="child_grade" 
                value={formData.child_grade} 
                onChange={handleChange}
                required
              >
                <option value="">Dropdown</option>
                <option value="K">K</option>
                <option value="1">1st Grade</option>
                <option value="2">2nd Grade</option>
                <option value="3">3rd Grade</option>
                <option value="4">4th Grade</option>
                <option value="5">5th Grade</option>
              </select>
            </div>

            <div className="input-group">
              <label>Email</label>
              <input 
                type="email" 
                name="email" 
                placeholder="Enter Email" 
                value={formData.email} 
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <label>Phone</label>
              <input 
                type="tel" 
                name="phone" 
                placeholder="Enter Phone Number" 
                value={formData.phone} 
                onChange={handleChange}
              />
            </div>

            <div className="training-info">
              <p><strong>10 Week Program $150.00</strong></p>
            </div>
            <div className="terms-container">
              <input 
                type="checkbox" 
                id="terms" 
                name="acceptTerms" 
                checked={formData.acceptTerms} 
                onChange={handleChange} 
              />
              <label htmlFor="terms">
                I accept the <a href="https://chess-club-frontend.vercel.app/terms-and-conditions" target="_blank" rel="noopener noreferrer">terms and conditions</a>
              </label>
            </div>

            {/* Make Payment button */}
            <div className="button-group">
              <button type="submit" className="payment-button" disabled={loading}>Make Payment</button>
            </div>
          </form>

          <p className="note">
            <strong>Note:</strong> Financial Assistance is available for this program. Click <a href="#" className="request-link" onClick={handleFinancialAssistance}> here </a> to register your request.
          </p>
        </>
      )}
    </div>
  );
};

export default ChessRegistration;
