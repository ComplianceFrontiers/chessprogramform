/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './mpes.scss';
import Link from 'next/link';
import Loading from '../../../Loading';

const ChessRegistration = () => {
  const initialFormData = {
    parent_first_name: '',
    parent_last_name: '',
    child_first_name: '',
    child_last_name: '',
    child_grade: '',
    program: '',
    email: '',
    phone: '',
    year: 2025,
    acceptTerms: false,
    RequestFinancialAssistance: false,
    SchoolName: "Mount Pleasant Elementary School",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for payment popup
  const [showThankYou, setShowThankYou] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

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
    setLoading(true);
    e.preventDefault();
    if (!formData.program) {
      alert("Select Your Program to proceed.");
      return;
    }
    
    if (!formData.acceptTerms) {
      setLoading(false);
      alert("You must accept the terms and conditions to proceed.");
      return;
    }
    if (!formData.email && !formData.phone) {
      setLoading(false);
      alert("Please Fill Required Fields");
      return;
    }

    formData.RequestFinancialAssistance = false;

    try {
      const response1 = await axios.post('https://backend-chess-tau.vercel.app/send-email-form-mpes', formData);
      if (response1.status === 200) {
        const response2 = await axios.post('https://backend-chess-tau.vercel.app/submit_form', formData);
        if (response2.status === 201) {
          setLoading(false);
          setShowPopup(true);
        }
      }
    } catch (error) {
      console.error('There was an error requesting financial assistance or submitting the form!', error);
    }
    finally{
      setLoading(false);
    }
  };

  const handleFinancialAssistance = async (e: React.FormEvent) => {
    if (!formData.email) {
      alert("Email is required to proceed.");
      return;
    }
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert("You must accept the terms and conditions to proceed.");
      return;
    }
    if (!formData.program) {
      alert("Select Your Program to proceed.");
      return;
    }
    setLoading(true);
    formData.RequestFinancialAssistance = true;

    try {
      const response1 = await axios.post('https://backend-chess-tau.vercel.app/send-email-form-mpes', formData);
      if (response1.status === 200) {
        const response2 = await axios.post('https://backend-chess-tau.vercel.app/submit_form', formData);

        if (response2.status === 201) {
          setShowThankYou(true);
        }
      }
    } catch (error) {
      console.error('There was an error requesting financial assistance or submitting the form!', error);
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false); // Close popup
  };

  // Effect to refresh form data
  useEffect(() => {
    if (showThankYou || showPopup) {
      setFormData(initialFormData);
    }
  }, [showThankYou, showPopup]);

  return (
    <div className="registration-container">
      {loading && <Loading />}
      {showPopup && (
        
        <div className="popup-overlay">
          <div className="popup-box">
            <button className="close-button" onClick={closePopup}>
              ✖
            </button>
            <h3>Payment Options</h3>
            <ul>
              <li>
                <strong>PayPal:</strong> Transfer $150 to <em >Sumit.compliance@gmail.com</em>
              </li>
              <li>
                <strong>Zelle:</strong> Transfer $150 to <em >+1 302-256-4141</em>
              </li>
              <li>
  <strong>Stripe:</strong>{' '}
  <a
    href="https://buy.stripe.com/5kA03g15wazq0rS8wE"
    target="_blank"
    rel="noopener noreferrer"
    className="payment-link"
    style={{ textDecoration: 'none' }}  // Removes the underline from the link itself
  >
    <button className="payment-button">
      Pay using Credit/Debit Card: $150 (Program fees) + $5 (Payment processing charges)
    </button>
  </a>
</li>

            </ul>
          </div>
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
    <button
      className="close-button"
      onClick={() => setShowThankYou(false)}
    >
      X
    </button>
  </div>
)}
       {!loading && !showThankYou && (
        <>
         <div className="header">
            <img src="/images/chessproo1.png" alt="Delaware Chess Champs Logo" className="logo" width="200" height="150" />
            <a
              href="https://chesschamps.us"
              target="_blank"
              rel="noopener noreferrer"
              className="chess-champs-link"
            >
              https://chesschamps.us
            </a>
            <img
              src="/images/schoolname.png"
              alt="Mount Pleasant Elementary School"
              className="school-title"
              width="200"
              height="150"
            />
          </div>
      <h2>Chess Program: Winter 2025</h2>

      <p className="program-description">
        The Chess After-School Program gives students a fun and engaging way to learn the game while building critical thinking and problem-solving skills.
        Through interactive lessons and games, students will master key strategies, improve focus, and boost confidence, all in a supportive environment.
      </p>

      <div className="training-info">
        <p><strong>10 Weeks Training on Tuesdays [K-5 Students]</strong></p>
        <p>Program Dates: 14-Jan 2025 to 18-Mar-2025</p>
        <p>[Classes on 01/14, 01/21, 01/28, 02/04, 02/11, 02/18, 02/25, 03/04, 03/11 and 03/18]</p>
        <p>Time: 3:30 PM – 04:30 PM. [Student Pick Up Time: 4:35 PM from Main Entrance | The children in the Y Program will be escorted by us after the session]</p>
      </div>

      <form className="registration-form" onSubmit={handleSubmit}>
         {/* New Dropdown for Program Selection */}
         <div className="input-group">
         <label>Select your Program <span className="required">*</span></label>
          <select
            name="program"
            value={formData.program}
            onChange={handleChange}
            required
          >
            <option value="">Dropdown</option>
            <option value="beginner">Beginner [New Students Only]</option>
            <option value="intermediate">Intermediate [Returning Students]</option>
          </select>
        </div>
        <div className="input-group">
          <label>Parent's Name</label>

          <div className="input-row">
            <input 
              type="text" 
              name="parent_first_name" 
              placeholder="First" 
              value={formData.parent_first_name} 
              onChange={handleChange}
            />
            <input 
              type="text" 
              name="parent_last_name" 
              placeholder="Last" 
              value={formData.parent_last_name} 
              onChange={handleChange}
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
            />
            <input 
              type="text" 
              name="child_last_name" 
              placeholder="Last" 
              value={formData.child_last_name} 
              onChange={handleChange}
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
              <label>Email <span className="required">*</span></label>
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
              <label>Phone <span className="required">*</span></label>
          <input 
            type="tel" 
            name="phone" 
            placeholder="Enter Phone Number" 
            value={formData.phone} 
            onChange={handleChange}
                required
          />
        </div>
        
        <div className="training-info">
          <p><strong>10 Week Program $150.00 *</strong></p>
          <p>*Program fee is non-refundable either partially or fully after 07-Jan-2025 | Processing charges apply if using Payment Gateway | Please read the Terms & Conditions*</p>
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
                I accept the <Link href="/terms-and-conditions">Terms and Conditions</Link> and <Link href="/terms-and-conditions1">Privacy Policy</Link>
              </label>
        </div>

        <div className="button-group">
        <button
              type="submit"
              className="payment-button"
              onClick={handleSubmit}
              disabled={loading}
            >
              Make Payment
            </button>
         <button type="button" className="payment-button1" onClick={handleFinancialAssistance}>Request Financial Assistance</button>
        </div>
      </form>
        </>
      )}
    </div>
  );
};

export default ChessRegistration;
