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
              <img src='/images/chesspro.png' alt="Delaware Chess Champs Logo" className="logo" />

      <h1>Terms and Conditions for Participation in the Chess Champs LLC After-School Chess Program at Mount Pleasant Elementary School</h1>
      <p>Welcome to Chess Champs LLC’s after-school chess program. By registering your child for this program, you acknowledge and agree to the following terms and conditions.</p>
      
      <h2>1. Program Overview</h2>
      <p>The Mount Pleasant Elementary (MPE) After-School Chess Program is an educational initiative designed to introduce children in grades K-5 to the game of chess in a fun and engaging manner.</p>
      <p>While Chess Champs LLC makes every effort to provide a quality learning experience, no guarantee is made that participants will become conversant with the game of chess by the end of the program.</p>
      <p>Regular practice at home is highly encouraged to maximize the program's benefits.</p>
      
      <h2>2. Proprietary Program Materials</h2>
      <p>The program, including its design and materials, is the intellectual property of Chess Champs LLC.</p>
      <p>The program, including its design and materials, is the intellectual property of Chess Champs LLC.</p>
      
      <h2>3. Software Access</h2>
      <p>Chess Champs LLC may, at its discretion, provide access to proprietary software to enhance the learning experience.</p>
      <p>Login credentials provided are for individual use only and must not be shared with others.</p>
      
      <h2>4. Candies and Merchandise</h2>
      <p>During the program, Chess Champs LLC may distribute items such as candies, stickers, or T-shirts.</p>
      <p>Parents/guardians must notify Chess Champs LLC in writing of any objections regarding these distributions.</p>
      <p>Chess Champs LLC assumes no liability for issues arising from the distribution of these items.</p>
      
      <h2>5. Photograph and Video Usage</h2>
      <p>Photographs and videos may be taken during the program and shared on Chess Champs LLC’s social media or promotional materials.</p>
      <p>Parents/guardians should notify Chess Champs LLC in writing if they object to their child’s inclusion in such media.</p>

      <h2>6. Fees and Refund Policy</h2>
      <p>Program fees are non-refundable after one week before the program start date.</p>
      <p>Fees are for the entire program duration and cover all sessions, irrespective of attendance.</p>
      <p>In rare cases of class cancellation or postponement, efforts will be made to schedule substitute classes. No refunds will be issued if a student cannot attend the rescheduled session.</p>

      <h2>7. Disclaimer and Liability Waiver</h2>
      <h3>Acknowledgment of Risk</h3>
      <p>Participation in the program involves inherent risks, including potential injury. These risks cannot be entirely eliminated.</p>

      <h3>Assumption of Risk</h3>
      <p>Parents/guardians voluntarily assume all risks associated with their child’s participation.</p>

      <h3>Release of Liability</h3>
      <p>Parents/guardians release Chess Champs LLC, its instructors, and associated parties from all claims or liabilities arising from participation in the program.</p>

      <h3>Indemnification</h3>
      <p>Parents/guardians agree to indemnify Chess Champs LLC against any claims resulting from their child’s participation.</p>

      <h3>Medical Consent</h3>
      <p>In case of injury or illness, emergency medical treatment may be administered, and parents/guardians will be responsible for associated costs.</p>

      <h2>8. Attendance and Punctuality</h2>
      <p>Parents/guardians are responsible for ensuring timely attendance and pick-up.</p>
      <p>Late pick-ups may incur additional charges.</p>

      <h2>9. Communication</h2>
      <p>Program updates will be shared via email or phone. Parents/guardians must ensure contact details are accurate and up-to-date.</p>
      <p>Parents/guardians consent to receive program-related communications, which may include promotional materials.</p>

      <h2>10. Publicity Disclaimer</h2>
      <p>By providing email addresses and phone numbers, parents/guardians consent to receive updates and promotional materials from Chess Champs LLC.</p>
      <p>Contact information will be handled in accordance with Chess Champs LLC’s privacy policy.</p>

      <p>Thank you for enrolling your child in Chess Champs LLC’s after-school chess program. We are excited to provide a fun and educational experience!</p>
      <p>For questions or concerns, please contact us at [insert contact information].</p>

      
      <p>By submitting this form, I agree to the terms and conditions outlined in the Disclaimer and Liability Waiver. By providing your email address and phone number, you acknowledge that you have read and understood the terms of this publicity disclaimer and consent to receive communications from Delaware Chess Champs and Chess Champs LLC.</p>
      <button className="go-back-button" onClick={handleGoBack}>Go Back</button>

    </div>
  );
};

export default TermsAndConditions;
