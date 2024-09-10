/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useState } from 'react';
import axios from 'axios';
import './page.scss';

const ChessRegistration = () => {
  const [formData, setFormData] = useState({
    parent_first_name: '',
    parent_last_name: '',
    child_first_name: '',
    child_last_name: '',
    child_grade: '',
    email: '',
    phone: '',
    address_line_1: '',
    address_line_2: '',
    city: '',
    state: '',
    zip_code: '',
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://backend-chess-tau.vercel.app/submit_form', formData);
      alert(response.data.message);
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  return (
    <div className="registration-container">
      <div className="header">
        <img
          src="/images/chesspro.png"
          alt="Delaware Chess Champs Logo"
          className="logo"
          width="150"
          height="150"
        />
        {/* <img
          src="/images/schoolname.png"
          alt="Mount Pleasant Elementary School"
          className="school-title"
          width="200"
          height="150"
        /> */}
      </div>

      <h2>Chess Program: Fall 2024</h2>

      <p className="program-description">
        The Chess After-School Program gives students a fun and engaging way to learn the game while building critical thinking and problem-solving skills.
        Through interactive lessons and games, students will master key strategies, improve focus, and boost confidence, all in a supportive environment.
      </p>

      <div className="training-info">
        <p><strong>10 Week Training [K-5 Students]</strong></p>
        <p>25 Sep 2024 to 18 Dec 2024</p>
        <p>[No classes on 27 Nov 2024]</p>
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

        <div className="input-group">
          <label>Address</label>
          <input 
            type="text" 
            name="address_line_1" 
            placeholder="Address Line 1" 
            value={formData.address_line_1} 
            onChange={handleChange}
          />
          <input 
            type="text" 
            name="address_line_2" 
            placeholder="Address Line 2" 
            value={formData.address_line_2} 
            onChange={handleChange}
          />
          <div className="input-row">
            <input 
              type="text" 
              name="city" 
              placeholder="City" 
              value={formData.city} 
              onChange={handleChange}
            />
            <input 
              type="text" 
              name="state" 
              placeholder="State" 
              value={formData.state} 
              onChange={handleChange}
            />
            <input 
              type="text" 
              name="zip_code" 
              placeholder="Zip Code" 
              value={formData.zip_code} 
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="training-info">
          <p><strong>10 Week Program $150.00</strong></p>
        </div>

        <div className="button-group">
          <button type="submit" className="payment-button">Make Payment</button>
          <button type="button" className="assistance-button">Request Financial Assistance</button>
        </div>
      </form>
    </div>
  );
};

export default ChessRegistration;
