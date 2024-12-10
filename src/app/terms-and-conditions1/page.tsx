/* eslint-disable react/no-unescaped-entities */
'use client';
import React from 'react';
 import './TermsAndConditions1.scss';

const TermsAndConditions1 = () => {
 
  // Handler function for the Go Back button
  const handleGoBack = () => {
    window.history.back();
  };
  return (
    <div className="terms-and-conditions">
              <img src='/images/chessproo.png' alt="Chess Champs Logo" className="logo" />

              <h2>Privacy Policy for Chess Champs LLC</h2>
<p>Effective Date: 01-Jan-2025</p>
<p>Chess Champs LLC (“we,” “our,” or “us”) is committed to protecting the privacy and personal information of our participants, their parents/guardians, and visitors to our website. This Privacy Policy outlines how we collect, use, store, and protect your personal information. By using our services, you agree to the terms of this Privacy Policy.</p>

<h2>1. Information We Collect</h2>
<h3>A. Personal Information</h3>
<p>Participant Information: Name, age, grade level, school name, and any relevant health or allergy details provided during registration.</p>
<p>Parent/Guardian Information: Name, contact details (email address, phone number), and payment information.</p>
<h3>B. Non-Personal Information</h3>
<p>Information about your interaction with our website, such as browser type, IP address, and pages visited.</p>
<h3>C. Media</h3>
<p>Photographs and videos taken during our programs, which may include images of participants.</p>

<h2>2. How We Use the Information</h2>
<p>We use your information for the following purposes:</p>
<ul>
  <li>To register participants for our programs and manage attendance.</li>
  <li>To communicate program updates, schedules, and important notices.</li>
  <li>To process payments securely.</li>
  <li>To improve our services and tailor program materials.</li>
  <li>To promote Chess Champs LLC through photographs and videos (with prior consent or opportunity to object).</li>
  <li>To comply with legal and regulatory obligations.</li>
</ul>

<h2>3. Sharing Your Information</h2>
<p>We respect your privacy and will not sell, rent, or share your personal information with third parties, except in the following circumstances:</p>
<ul>
  <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist in processing payments, managing communications, or delivering services on our behalf.</li>
  <li><strong>Legal Requirements:</strong> We may disclose information if required by law, regulation, or legal process.</li>
  <li>Safety Concerns: To protect the safety of our participants, staff, or the public.</li>
</ul>

<h2>4. Protecting Your Information</h2>
<p>We take reasonable steps to protect your personal information from unauthorized access, alteration, disclosure, or destruction, including:</p>
<p>Secure servers and encrypted payment processing.</p>
<p>Restricted access to personal information to authorized personnel only.</p>
<p>Regular review of our security practices and technology.</p>

<h2>5. Your Choices and Rights</h2>
<p><strong>Access and Update:</strong> You may request access to or correction of your personal information at any time by contacting us.</p>
<p><strong>Opt-Out:</strong> You can opt out of receiving promotional emails or communications by following the unsubscribe link in our emails or contacting us directly.</p>
<p><strong>Media Consent:</strong> If you object to your or your child’s photographs or videos being used, please notify us in writing.</p>

<h2>6. Cookies and Online Tracking</h2>
<p>Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can control cookies through your browser settings.</p>

<h2>7. Retention of Information</h2>
<p>We retain personal information only as long as necessary for program purposes, legal compliance, and legitimate business needs.</p>

<h2>8. Children’s Privacy</h2>
<p>Chess Champs LLC does not knowingly collect personal information from children under 13 without parental consent. Parents/guardians provide all necessary information during registration.</p>

<h2>9. Changes to This Privacy Policy</h2>
<p>We may update this Privacy Policy from time to time. Any changes will be posted on our website with an updated effective date.</p>

<h2>10. Contact Us</h2>
<p>If you have any questions or concerns about this Privacy Policy or how your information is handled, please contact us:</p>
<p>Chess Champs LLC</p>
<p><strong>Email:</strong>connect@chesschamps.us</p>

      
      <p>By submitting this form, I agree to the Privacy Policy outlined in the Disclaimer and Liability Waiver. By providing your email address and phone number, you acknowledge that you have read and understood the terms of this publicity disclaimer and consent to receive communications from Chess Champs and Chess Champs LLC.</p>
      <button className="go-back-button" onClick={handleGoBack}>Go Back</button>

    </div>
  );
};

export default TermsAndConditions1;
