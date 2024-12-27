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
      <img src='/images/chessproo.png' alt="Chess Champs Logo" className="logo" />

      <h1>Privacy Policy for Chess Champs LLC</h1>
      <p><strong>Effective Date:</strong> 01-Jan-2025</p>
      <p>
        Chess Champs LLC (“we,” “our,” or “us”) is committed to protecting the privacy and personal
        information of our participants, their parents/guardians, and visitors to our website. This
        Privacy Policy outlines how we collect, use, store, and protect your personal information.
        By using our services, you agree to the terms of this Privacy Policy.
      </p>

      <h2>1. Information We Collect</h2>
      <h3>A. Personal Information</h3>
      {/* <ul> */}
        <li>Participant Information: Name, age, grade level, school name, and any relevant health or allergy details provided during registration.</li>
        <li>Parent/Guardian Information: Name, contact details (email address, phone number), and payment information.</li>
      {/* </ul> */}
      <h3>B. Non-Personal Information</h3>
      <p>
        Information about your interaction with our website, such as browser type, IP address, and
        pages visited.
      </p>
      <h3>C. Media</h3>
      <p>
        Photographs and videos taken during our programs, which may include images of participants.
      </p>

      <h2>2. How We Use the Information</h2>
      {/* <ul> */}
        <li>To register participants for our programs and manage attendance.</li>
        <li>To communicate program updates, schedules, and important notices.</li>
        <li>To process payments securely.</li>
        <li>To improve our services and tailor program materials.</li>
        <li>To promote Chess Champs LLC through photographs and videos (with prior consent or opportunity to object).</li>
        <li>To comply with legal and regulatory obligations.</li>
      {/* </ul> */}

      <h2>3. Sharing Your Information</h2>
      {/* <ul> */}
        <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist in processing payments, managing communications, or delivering services on our behalf.</li>
        <li><strong>Legal Requirements:</strong> We may disclose information if required by law, regulation, or legal process.</li>
        <li><strong>Safety Concerns:</strong> To protect the safety of our participants, staff, or the public.</li>
      {/* </ul> */}

      <h2>4. Protecting Your Information</h2>
      <p>
        We take reasonable steps to protect your personal information from unauthorized access,
        alteration, disclosure, or destruction, including:
      </p>
      {/* <ul> */}
        <li>Secure servers and encrypted payment processing.</li>
        <li>Restricted access to personal information to authorized personnel only.</li>
        <li>Regular review of our security practices and technology.</li>
      {/* </ul> */}

      <h2>5. Your Choices and Rights</h2>
      <ul>
        <li><strong>Access and Update:</strong> You may request access to or correction of your personal information at any time by contacting us.</li>
        <li><strong>Opt-Out:</strong> You can opt out of receiving promotional emails or communications by following the unsubscribe link in our emails or contacting us directly.</li>
        <li><strong>Media Consent:</strong> If you object to your or your child’s photographs or videos being used, please notify us in writing.</li>
      </ul>

      <h2>6. Cookies and Online Tracking</h2>
      <p>
        Our website may use cookies and similar tracking technologies to enhance your browsing
        experience. You can control cookies through your browser settings.
      </p>

      <h2>7. Retention of Information</h2>
      <p>
        We retain personal information only as long as necessary for program purposes, legal
        compliance, and legitimate business needs.
      </p>

      <h2>8. Children’s Privacy</h2>
      <p>
        Chess Champs LLC does not knowingly collect personal information from children under 13
        without parental consent. Parents/guardians provide all necessary information during
        registration.
      </p>

      <h2>9. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on our
        website with an updated effective date.
      </p>

      <h2>10. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy or how your information is
        handled, please contact us:
      </p>
      <p>Chess Champs LLC</p>
      <p>Email: connect@chesschamps.us</p>

      <button className="go-back-button" onClick={handleGoBack}>Go Back</button>
    </div>
  );
};

export default TermsAndConditions;
