/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState } from 'react';
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
    USCF_Rating: '',
    email: '',
    phone: '',
    acceptTerms: true,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.acceptTerms) {
      alert("You must accept the Terms and Conditions to proceed.");
      return;
    }

    setLoading(true);

    try {
    
        const response2 = await axios.post('https://backend-chess-tau.vercel.app/form_Wilmington_Chess_Coaching_bp_submit', formData);
        if (response2.status === 201||response2.status === 200) {
          window.location.href = 'https://buy.stripe.com/5kA8zMdSi36Ya2s8wJ';
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

     

      {!loading  && (
        <>
          <div className="header">
            <img src="/images/chessproo.png" alt="Logo" className="logo" />
          </div>

          <h2>Chess Champs Academy - Wilmington</h2>
          <p className="program-description">
          The Chess Coaching Program offered by Champs Champs Academy gives students a fun and engaging way to learn the game while building critical thinking and problem-solving skills. Through interactive lessons and games, students will master key strategies, improve focus, and boost confidence, all in a supportive environment.

           
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
                placeholder="Enter child's grade"
              />
            </div>

            <div className="input-group">
              <label>Player Level <span className="required">*</span></label>
              <select
                name="program"
                value={formData.program}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="beginner">Absolute Beginner</option>
                <option value="intermediate">Intermediate Player</option>
              </select>
            </div>

            <div className="input-group">
              <label>USCF Rating</label>
              <input
                type="text"
                name="USCF_Rating"
                placeholder="Enter USCF Rating"
                value={formData.USCF_Rating}
                onChange={handleChange}
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

            <div className="terms-container">
              <input
                type="checkbox"
                id="terms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
              />
              <label htmlFor="terms">
                I accept the <Link href="/terms-and-conditions_jcc">Terms and Conditions  </Link> and <Link href="/privacy_policy_jcc"> Privacy Policy</Link>
              </label>
            </div>

            <div className="button-group">
              <button type="submit" className="payment-button" disabled={loading}>
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default ChessRegistration;
