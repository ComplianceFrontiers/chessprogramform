/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './SendEmail.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFacebook, faYoutube, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faCoffee, faHome, faUser, faSearch } from '@fortawesome/free-solid-svg-icons'; // Add any icons you need

// Add icons to the library
library.add(faFacebook, faYoutube, faTwitter, faInstagram, faLinkedin, faCoffee, faHome, faUser, faSearch);


interface SendEmailProps {
  selectedRecords: { name: string; email: string }[];
  onBack: () => void;
}

const SendEmail: React.FC<SendEmailProps> = ({ selectedRecords, onBack }) => {
  const router = useRouter();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [apiLink, setApiLink] = useState('');

  const emailBody = `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; text-align: center;">
    <div style="text-align: center;">
      <img src="./images/image.png" alt="J Dance Banner" style="max-width: 100%; height: auto;">
    </div>
    <h1 style="color: #000; text-align: left; font-size: 14px; font-weight: bold; margin-bottom: 20px;margin-top: 20px;">
      Now enrolling for the 2025 Winter/Spring Session of J DANCE, beginning January 21, 2025, and concluding with a showcase on Sunday, April 27, 2025, at 3 PM.
    </h1>
    <p style="font-size: 14px; line-height: 1.6; margin-top: 20px; margin-bottom: 10px; text-align: left; max-width: 800px; margin-left: auto; margin-right: auto;">
      This program, run by our talented JCoaches, is designed to inspire dancers of all levels. Whether you're just starting out or looking to build upon your existing skills, our classes offer something for everyone.
    </p>

    <!-- Programs -->
    <h2 style="text-align: left; color: #f53db8; margin-bottom: 10px;">Programs:</h2>
   <ul style="text-align: left; padding-left: 50px; font-size: 14px; line-height: 1.6; list-style-type: disc;">
  <li><strong>Creative Movement</strong> (Ages 4 - 6)</li>
  <li><strong>Ballet 1</strong> (Ages 7 - 9)</li>
  <li><strong>Ballet 2</strong> (Ages 10 - 12)</li>
  <li><strong>Jazz</strong> (Ages 7 - 12)</li>
  <li><strong>Adult Beginner Ballet</strong> (Ages 18+)</li>
  <li><strong>Adult Intermediate Ballet</strong> (Ages 18+)</li>
</ul>

    <p style="font-size: 14px; line-height: 1.6; margin-top: 20px; margin-bottom: 10px; text-align: left; max-width: 800px; margin-left: auto; margin-right: auto;">
   Check out our schedule & class descriptions below. Join us and discover the joy of dance in a supportive and creative environment. We can’t wait to see you there!
    </p>

    <h2 style="text-align: left; color: #f53db8; margin-bottom: 10px;">Cost:</h2>
    <ul style="text-align: left;list-style-type: disc; padding-left: 50px; font-size: 14px; line-height: 1.6;">
      <li>Once weekly programs: $150/Member, $200/Non-Member</li>
      <li>Twice weekly programs: $250/Member, $300/Non-Member</li>
    </ul>

    <div style="text-align: center; margin-top: 30px;">
      <a href="${apiLink}" style="display: inline-block; padding: 12px 25px; background-color: #f53db8; color: white; text-align: center; border-radius: 5px; text-decoration: none; font-size: 16px;">
        REGISTER HERE
      </a>
    </div>

    <h2 style="text-align: left; color: #f53db8; margin-top: 20px; margin-bottom: 10px;">SHOWCASE:</h2>
    <p style="font-size: 14px; line-height: 1.6; margin-top: 20px; margin-bottom: 10px; text-align: left; max-width: 800px; margin-left: auto; margin-right: auto;">
Interested in getting a sneak peek at our program? Come check out the Showcase for the current session! It will be held on <strong>Sunday, December 22 at 3 PM</strong> in the <strong>Auditorium</strong>.
</p>


    <!-- Schedule -->
    <h2 style="text-align: left; color: #ffffff; padding:10px; margin-top: 20px; margin-bottom: 10px; background-color: #000000;">Schedule:</h2>
   <ul style="text-align: left; padding-left: 0px; font-size: 14px; line-height: 1.6; list-style: disc;">
 <b style="color: #f53db8; font-size: 16px;">Creative Movement (Ages 4 - 6)</b>
<ul style="padding-left: 30px; list-style-type: disc;">
  <li style="padding-left: 10px;">
    <strong><a href="#" style="color: blue; text-decoration: underline;">K/1st Graders on Tuesdays</a></strong>, 
    Jan 21-Apr 22, 4:45-5:30 PM with Ms. Brenna in Studio 2
  </li>
  <li style="padding-left: 10px;">
    <strong><a href="#" style="color: blue; text-decoration: underline;">Pre-K on Thursdays</a></strong>: 
    Jan 23-Apr 24, 4:45-5:30 PM with Ms. Sam in Studio 2
  </li>
  <li style="padding-left: 10px;">
    <strong><a href="#" style="color: blue; text-decoration: underline;">Combined Ages 4-6 on Saturdays</a></strong>: 
    Jan 25-Apr 26, 9:15-10 AM with Ms. Sarah in the Mercaz
  </li>
</ul>

<b style="color: #f53db8; font-size: 16px;">Ballet 1 (Ages 7 - 9)</b>
<ul style="padding-left: 30px; list-style-type: disc;">
  <li style="padding-left: 10px;">
    <strong><a href="#" style="color: blue; text-decoration: underline;">Tuesdays</a></strong>, 
    Jan 21-Apr 22, 5:45-6:45 PM with Ms. Brenna in the Mercaz
  </li>
  <li style="padding-left: 10px;">
    <strong><a href="#" style="color: blue; text-decoration: underline;">Saturdays</a></strong>, 
    Jan 25-Apr 26: 11:15 AM-12:15 PM with Ms. Sarah in the Mercaz
  </li>
</ul>

<b style="color: #f53db8; font-size: 16px;">Ballet 2 (Ages 10 - 12)</b>
<ul style="padding-left: 30px; list-style-type: disc;">
  <li style="padding-left: 10px;">
    <strong><a href="#" style="color: blue; text-decoration: underline;">Thursdays & Sundays</a></strong>, 
    Jan 23-Apr 20: 6:45-8 PM Thursdays & 11 AM-12:15 PM Sundays with Mr. Leo in the Mercaz
  </li>
</ul>

<b style="color: #f53db8; font-size: 16px;">Jazz (Ages 7 - 12)</b>
<ul style="padding-left: 30px; list-style-type: disc;">
  <li style="padding-left: 10px;">
    <strong><a href="#" style="color: blue; text-decoration: underline;">Tuesdays</a></strong>, 
    Jan 21-Apr 22: 7-8 PM with Ms. Brenna in the Mercaz
  </li>
  <li style="padding-left: 10px;">
    <strong><a href="#" style="color: blue; text-decoration: underline;">Saturdays</a></strong>, 
    Jan 25-Apr 26: 10-11 AM with Ms. Sarah in the Mercaz
  </li>
</ul>

<b style="color: #f53db8; font-size: 16px;">Adult Ballet (Ages 18+)</b>
<ul style="padding-left: 30px; list-style-type: disc;">
  <li style="padding-left: 10px;">
    <strong><a href="#" style="color: blue; text-decoration: underline;">Beginner on Wednesdays</a></strong>, 
    Jan 22-Apr 23, 7-8 PM with Mr. Leo in Studio 2
  </li>
  <li style="padding-left: 10px;">
    <strong><a href="#" style="color: blue; text-decoration: underline;">Intermediate on Sundays</a></strong>, 
    Jan 26-Apr 20, 8:45-9:45 AM with Mr. Leo in the Mercaz
  </li>
</ul>
<div style="text-align: center; margin-top: 30px;">
      <a href="${apiLink}" style="display: inline-block; padding: 12px 25px; background-color: #f53db8; color: white; text-align: center; border-radius: 5px; text-decoration: none; font-size: 16px;">
        REGISTER HERE
      </a>
    </div>


    <!-- Descriptions -->
<h2 style="text-align: left; color: #ffffff; padding:10px; margin-top: 20px; margin-bottom: 10px; background-color: #000000;">Class Descriptions:</h2>    <ul style="text-align: left; padding-left: 20px; font-size: 14px; line-height: 1.6;">
     <ul style="text-align: left; padding-left: 20px; font-size: 14px; line-height: 1.6; list-style-type: disc;>
  <li>
    <strong>Creative Movement (Ages 4 - 6):</strong> A prerequisite dance class. Students learn basics of stretching, foundational dance steps, and musical phrasing through a series of guided "imagination games." A great way to learn the foundations of dance that apply for any future dance classes.
  </li>
  <li>
    <strong>Ballet 1 (Ages 7 - 9):</strong> Students learn the foundational steps of ballet. Classes include stretching and conditioning, barre and center exercises, and basics of ballet jumps and turns.
  </li>
  <li>
    <strong>Ballet 2 (Ages 10 - 12):</strong> Students begin learning intermediate level barre, center, and across the floor combinations emphasizing musical phrasing, correct placement, and coordination. Students also begin learning the basics of pointe technique (in flat shoes until they are ready for pointe shoes).
  </li>
  <li>
    <strong>Jazz (Ages 7 - 12):</strong> A combination of ballet and modern dance technique blended with current popular dance steps, Broadway-style dance, and classic American dance forms and music.
  </li>
  <li>
    <strong>Adult Beginner Ballet (Ages 18+):</strong> A ballet basics class intended for adults with little or no experience, ages 18 and up.
  </li>
  <li>
    <strong>Adult Intermediate Ballet (Ages 18+):</strong> A ballet class intended for adults with some ballet experience, ages 18 and up.
  </li>
</ul>

<p style="text-align:center; margin-top:10px;">
  For more info, please contact 
  <a href="#" style="text-decoration: underline; color: blue;">
    Steph Kegelman
  </a>.
</p>



    <!-- Footer -->
    <div style="color: white; padding: 20px; margin-top: 30px;">   

    <div style="margin-top: 20px;">
        <div style="background-color: #343a40; color: #fff; padding: 20px; border-radius: 5px 5px 0 0;">
            <h1 style="margin-bottom: 10px;">About the J</h1>
            <p style="margin-bottom: 10px; font-size:10px">The Siegel JCC is a non-profit Jewish community center where people of all faiths and backgrounds come together to learn, share, play, and celebrate. Our 32-acre campus houses an Early Childhood Center, Youth & Teen Programs, and Summer Camp, as well as a state-of-the-art Fitness Center, Indoor & Outdoor Pools, Sports, and Community Events.</p>
        </div>

        <div style="background-color: #007BFF; color: #fff; padding: 20px; border-radius: 0 0 5px 5px; text-align: center;">
            <div style="margin-bottom: 15px; font-size:10px">
                <a href="#" target="_blank" style={{ margin: '0 10px' }}>
  <FontAwesomeIcon icon={faFacebook} style={{ fontSize: '20px', color: 'white' }} />
</a>
<a href="#" target="_blank" style={{ margin: '0 10px' }}>
  <FontAwesomeIcon icon={faYoutube} style={{ fontSize: '10px', color: 'white' }} />
</a>
<a href="#" target="_blank" style={{ margin: '0 10px' }}>
  <FontAwesomeIcon icon={faTwitter} style={{ fontSize: '10px', color: 'white' }} />
</a>
<a href="#" target="_blank" style={{ margin: '0 10px' }}>
  <FontAwesomeIcon icon={faInstagram} style={{ fontSize: '10px', color: 'white' }} />
</a>
<a href="#" target="_blank" style={{ margin: '0 10px' }}>
  <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '20px', color: 'white' }} />
</a>
            </div>

            <div>
                <p style="margin: 0;">SIEGEL JCC</p>
               <p style="margin: 0;font-size:10px">
  <a href="https://www.google.com/maps?q=101+Garden+of+Eden+Road,+Wilmington,+DE+19803" target="_blank" style="text-decoration: underline;">101 Garden of Eden Road</a> | 
  <a href="tel:+13024785660" style="text-decoration: underline;font-size:10px">Wilmington, DE 19803</a> | 
  <a href="tel:+13024785660">302-478-5660</a>
</p>


            </div>

            <div>
                <p style="font-size: 11px; margin-top: 10px;">We like to connect in ways that work for you: <a href="#" style="color: #fff; text-decoration: none;">Update Profile</a></p>
            </div>
        </div>
    </div>
</div>

  </div>
`;


  const handleSendEmail = async () => {
    if (!subject || !message || !apiLink) {
      setErrorMessage('Subject, message, and API link are required.');
      setShowPopup(true);
      return;
    }
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const bccEmails = selectedRecords.map(record => record.email).join(', ');

    const formData = new FormData();
    formData.append('name', 'Default Name');
    formData.append('bcc', bccEmails);
    formData.append('subject', subject);
    formData.append('message', emailBody); 
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch('/api/submitform', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error sending email');
      }

      const data = await response.json();
      setSuccessMessage(data.message);
      setShowPopup(true);
    } catch (error) {
      setErrorMessage('Error sending email: ' + error);
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="containerSendEmail">
      <div className="formSection">
        <h2 >Send Email</h2>
        <label className="label">
          Subject:
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            required
            className="input"
          />
        </label>
        <label className="label">
          Message:
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
            className="textarea"
          />
        </label>
        <label className="label">
          API Link:
          <input
            type="url"
            value={apiLink}
            onChange={e => setApiLink(e.target.value)}
            required
            className="input"
          />
        </label>
        <label className="label">
          Upload Image (Optional):
          <input
            type="file"
            accept="image/*"
            onChange={e => setImage(e.target.files![0])}
            className="input"
          />
        </label>
        <div className="buttonContainer">
  <button onClick={handleSendEmail} disabled={loading} className="button">
    {loading ? 'Sending...' : 'Send Email'}
  </button>
  <button onClick={onBack} className="backButton">Back</button>
</div>

      </div>
      <div className="previewSection">
        <h2 className="previewTitle">Email Preview</h2>
        <div className="emailPreview" dangerouslySetInnerHTML={{ __html: emailBody }} />
      </div>
    </div>
  );
};

export default SendEmail;
