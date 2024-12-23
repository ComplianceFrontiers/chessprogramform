/* eslint-disable react/no-unescaped-entities */
'use client';
import React from 'react';
 import './TermsAndConditions.scss';

const TermsAndConditions = () => {
 
  // Handler function for the Go Back button
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div className="terms-and-conditions">
              <img src='/images/jcc.png' alt="Chess Champs Logo" className="logo" />

      <h1>Disclaimer and Liability Waiver for Chess Champs</h1>
      <p>By participating in the Chess Champs activities, you acknowledge and agree to the following terms:</p>
      
      <h2>Acknowledgment of Risk</h2>
      <p>I understand that participation in Chess Champs activities, including chess games and physical activities, involves inherent risks, including the risk of injury. These risks cannot be entirely eliminated regardless of the care taken to avoid injuries.</p>
      
      <h2>Assumption of Risk</h2>
      <p>I voluntarily assume all risks associated with participation in Chess Champs activities. I accept full responsibility for any injury or damage that may result from my or my child's participation, whether caused by the negligence of Chess Champs, or otherwise.</p>
      
      <h2>Release of Liability</h2>
      <p>In consideration of being allowed to participate in Chess Champs activities, I hereby release, waive, discharge, and covenant not to sue Chess Champs, its directors, officers, employees, volunteers, and agents, from any and all claims, demands, actions, or causes of action for any injury or damage that I or my child may suffer as a result of participation in Chess Champs activities.</p>
      
      <h2>Indemnification</h2>
      <p>I agree to indemnify and hold harmless Chess Champs from any and all claims, demands, actions, or causes of action, including attorneys' fees, that may be brought against them as a result of my or my child's participation in Chess Champs activities.</p>
      
      <h2>Medical Consent</h2>
      <p>I give consent for emergency medical treatment to be administered to my child in the event of an injury or illness while participating in Chess Champs activities. I understand that I will be responsible for any medical expenses incurred as a result of my child's participation.</p>
      
      <h2>Understanding of Waiver</h2>
      <p>I have read and fully understand the terms of this Disclaimer and Liability Waiver. By participating in Chess Champs activities, I am giving up substantial rights, including the right to sue Chess Champs the  for any injury or damage my child or I may suffer.</p>
      <p></p>
      <h2>Publicity Disclaimer for Chess Champs</h2>
      
      <h2>Communication Consent</h2>
      <p>You consent to receive communication from Chess Champs and Chess Champs LLC regarding updates, announcements, and other relevant information related to chess activities and events.</p>
      
      <h2>Use of Contact Information</h2>
      <p>Your email address and phone number may be used by Chess Champs and Chess Champs LLC to send promotional materials, newsletters, and event invitations.</p>
      
      <h2>Opt-out Option</h2>
      <p>You have the option to unsubscribe or opt-out from receiving communications at any time by contacting Chess Champs directly.</p>
      
      <h2>Privacy Policy</h2>
      <p>Your contact information will be handled in accordance with the privacy policy of Chess Champs and Chess Champs LLC, ensuring confidentiality and security.</p>
      
      <p>By submitting this form, I agree to the terms and conditions outlined in the Disclaimer and Liability Waiver. By providing your email address and phone number, you acknowledge that you have read and understood the terms of this publicity disclaimer and consent to receive communications from Chess Champs and Chess Champs LLC.</p>
      <button className="go-back-button" onClick={handleGoBack}>Go Back</button>

    </div>
  );
};

export default TermsAndConditions;
