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
      <img src="/images/chessproo.png" alt="Chess Champs Logo" className="logo" />

      <h1>Terms and Conditions for Participation in the Chess Champs LLC Chess Coaching Program</h1>

      <p>Welcome to Chess Champs LLC’s chess coaching program. By registering your child for this program, you acknowledge and agree to the following terms and conditions.</p>

      <h2>1. Program Overview</h2>
      <p>The Chess Coaching Program is an educational initiative designed to teach the game of chess in a fun and engaging manner. While Chess Champs LLC makes every effort to provide a quality learning experience, no guarantee is made that participants will become conversant with the game of chess by the end of the program. Regular practice at home is highly encouraged to maximize the program's benefits.</p>

      <h2>2. Proprietary Program Materials</h2>
      <p>The program, including its design and materials, is the intellectual property of Chess Champs LLC. Unauthorized use or distribution of these materials is strictly prohibited.</p>

      <h2>3. Expectations for Participants</h2>
      <p>Chess Champs LLC is committed to creating a positive and respectful environment for all participants.</p>
      <ul>
        <li><strong>Behavioral Expectations:</strong> Participants are expected to be respectful, cooperative, and mindful of their peers, instructors, and the learning environment.</li>
        <li><strong>Disruptive Behavior:</strong> If a participant engages in behavior that is deemed disruptive, harmful, or detrimental to the progress of the class or the well-being of others, Chess Champs LLC reserves the right to take appropriate disciplinary action. This includes temporary removal from a class or expulsion from the program altogether.</li>
        <li><strong>Authority and Decision:</strong> The decision of Chess Champs LLC regarding such matters will be final and binding.</li>
        <li><strong>Refund Policy for Expulsions:</strong> No refunds will be issued if a participant is removed from the program due to disruptive behavior or failure to adhere to these expectations.</li>
        <li><strong>Legal Recourse:</strong> By registering for our program, parents/guardians agree that no legal claims or consequences will be pursued against Chess Champs LLC or its associates in such cases.</li>
      </ul>

      <h2>4. Software Access</h2>
      <p>Chess Champs LLC may, at its discretion, provide access to proprietary software to enhance the learning experience. Login credentials provided are for individual use only and must not be shared with others.</p>

      <h2>5. Candies and Merchandise</h2>
      <p>During the program, Chess Champs LLC may distribute items such as candies, stickers, or T-shirts. Parents/guardians must notify Chess Champs LLC in writing of any objections regarding these distributions. Chess Champs LLC assumes no liability for issues arising from the distribution of these items.</p>

      <h2>6. Photograph and Video Usage</h2>
      <p>Photographs and videos may be taken during the program and shared on Chess Champs LLC’s social media or promotional materials. Parents/guardians should notify Chess Champs LLC in writing if they object to their child’s inclusion in such media.</p>

      <h2>7. Fees and Refund Policy</h2>
      <ul>
        <li>Program fees are non-refundable after one week before the program start date.</li>
        <li>Fees are for the entire program duration and cover all sessions, irrespective of attendance.</li>
        <li>In rare cases of class cancellation or postponement, efforts will be made to schedule substitute classes. No refunds will be issued if a student cannot attend the rescheduled session.</li>
      </ul>

      <h2>8. Disclaimer and Liability Waiver</h2>
      <ul>
        <li><strong>Acknowledgment of Risk:</strong> Participation in the program involves inherent risks, including potential injury. These risks cannot be entirely eliminated.</li>
        <li><strong>Assumption of Risk:</strong> Parents/guardians voluntarily assume all risks associated with their child’s participation.</li>
        <li><strong>Release of Liability:</strong> Parents/guardians release Chess Champs LLC, its instructors, and associated parties from all claims or liabilities arising from participation in the program.</li>
        <li><strong>Indemnification:</strong> Parents/guardians agree to indemnify Chess Champs LLC against any claims resulting from their child’s participation.</li>
        <li><strong>Medical Consent:</strong> In case of injury or illness, emergency medical treatment may be administered, and parents/guardians will be responsible for associated costs.</li>
      </ul>

      <h2>9. Attendance and Punctuality</h2>
      <p>Parents/guardians are responsible for ensuring timely attendance and pick-up. Late pick-ups may incur additional charges.</p>

      <h2>10. Communication</h2>
      <p>Program updates will be shared via email or phone. Parents/guardians must ensure contact details are accurate and up-to-date. Parents/guardians consent to receive program-related communications, which may include promotional materials.</p>

      <h2>11. Publicity Disclaimer</h2>
      <p>By providing email addresses and phone numbers, parents/guardians consent to receive updates and promotional materials from Chess Champs LLC. Contact information will be handled in accordance with Chess Champs LLC’s privacy policy.</p>

      <p>Thank you for enrolling your child in Chess Champs LLC’s after-school chess program. We are excited to provide a fun and educational experience!</p>
      <p>For questions or concerns, please contact us at connect@chesschamps.us.</p>
      <p>By submitting this form, I agree to the terms and conditions outlined in the Disclaimer and Liability Waiver. By providing your email address and phone number, you acknowledge that you have read and understood the terms of this publicity disclaimer and consent to receive communications from Chess Champs LLC and its associates.</p>

      <button className="go-back-button" onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default TermsAndConditions;
