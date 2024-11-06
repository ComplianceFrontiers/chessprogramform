/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState } from 'react';
import axios from 'axios';
import './mpes.scss';
import Link from 'next/link';
import Loading from '../../../Loading';

const ChessRegistration = () => {
  const [formData, setFormData] = useState({
    parent_first_name: '',
    parent_last_name: '',
    child_first_name: '',
    child_last_name: '',
    child_grade: '',
    email: '',
    phone: '',
    acceptTerms: false,
    RequestFinancialAssistance: false,
    SchoolName: "JCC_Chess_champs",
  });

  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert("You must accept the terms and conditions to proceed.");
      return;
    }

    setLoading(true);
    formData.RequestFinancialAssistance = false;

    try {
      const response1 = await axios.post('https://backend-chess-tau.vercel.app/send-email-form-jcc', formData);
      if (response1.status === 200) {
        const response2 = await axios.post('https://backend-chess-tau.vercel.app/submit_form', formData);
        if (response2.status === 201) {
          setShowThankYou(true);
          setTimeout(() => setShowThankYou(false), 6000);
        }
      }
    } catch (error) {
      console.error('Error submitting the form!', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-container">
      {loading && <Loading />}

      {showThankYou && (
        <div className="thank-you-overlay">
          <p className="thank-you-message">
          <span>Thank you!</span> We’re excited about your interest in enrolling your child in our chess program. Please allow us some time to review your request, and we will get back to you shortly.
          </p>
        </div>
      )}

      {!loading && !showThankYou && (
        <>
          <div className="header">
            <img src="/images/chessproo.png" alt="Logo" className="logo" />
          </div>

          <h2>Chess Program For Kids</h2>
          <p className="program-description">
            The Chess Champs Program gives students a fun and engaging way to learn the game while building critical thinking and problem-solving skills.
            Through interactive lessons and games, students will master key strategies, improve focus, and boost confidence, all in a supportive environment.
          </p>

          <form className="registration-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Parent's Name <span className="required">*</span></label>
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
              <label>Child's Name <span className="required">*</span></label>
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
  <label htmlFor="child_grade">Child's Grade</label>
  <input
    type="text"
    name="child_grade"
    id="child_grade"
    value={formData.child_grade}
    onChange={handleChange}
    required
    placeholder="Enter child's grade"
  />
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
              <label>Phone</label>
              <input 
                type="tel" 
                name="phone" 
                placeholder="Enter Phone Number" 
                value={formData.phone} 
                onChange={handleChange}
              />
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
                I accept the <Link href="/terms-and-conditions">terms and conditions</Link>
              </label>
            </div>

            <div className="button-group">
              <button type="submit" className="payment-button" disabled={loading}>Submit</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ChessRegistration;
