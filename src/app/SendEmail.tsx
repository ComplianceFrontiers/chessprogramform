import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './SendEmail.scss';

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
  const [showPopup, setShowPopup] = useState(false); // State for showing popup
  const [apiLink, setApiLink] = useState(''); // State for the API link

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

    // Construct the email message body with the design
    const emailBody = `
  <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; text-align: center;">
    <div style="text-align: center;">
      <img src="https://your-hosted-image-url.com/image.png" alt="J Dance Banner" style="max-width: 100%; height: auto;">
    </div>

    <h1 style="color: #2a9d8f; font-size: 24px; margin-bottom: 20px;">Now Enrolling for the 2025 Winter/Spring Session of J DANCE!</h1>
    
    <p style="font-size: 16px; line-height: 1.6; margin-top: 20px; text-align: left; max-width: 800px; margin-left: auto; margin-right: auto;">
      Beginning January 21, 2025, and concluding with a showcase on Sunday, April 27, 2025, at 3 PM, J DANCE offers a program designed to inspire dancers of all levels. Whether you're just starting out or looking to build upon your existing skills, our talented JCoaches ensure that our classes offer something for everyone.
    </p>
    
    <p style="font-size: 16px; line-height: 1.6; text-align: left; max-width: 800px; margin-left: auto; margin-right: auto;">
      <b style="color: #d72c2c;">Programs:</b>
    </p>
    <ul style="font-size: 16px; line-height: 1.6; text-align: left; max-width: 800px; margin-left: auto; margin-right: auto; padding-left: 20px; list-style-type: disc;">
      <li>Creative Movement (Ages 4 - 6)</li>
      <li>Ballet 1 (Ages 7 - 9)</li>
      <li>Ballet 2 (Ages 10 - 12)</li>
      <li>Jazz (Ages 7 - 12)</li>
      <li>Adult Beginner Ballet (Ages 18+)</li>
      <li>Adult Intermediate Ballet (Ages 18+)</li>
    </ul>
    
    <p style="font-size: 16px; line-height: 1.6; text-align: left; max-width: 800px; margin-left: auto; margin-right: auto;">
      Check out our schedule & class descriptions below. Join us and discover the joy of dance in a supportive and creative environment. We can’t wait to see you there!
    </p>
    
    <p style="font-size: 16px; line-height: 1.6; text-align: left; max-width: 800px; margin-left: auto; margin-right: auto;">
      <b style="color: #d72c2c;">Cost:</b>
    </p>
    <ul style="font-size: 16px; line-height: 1.6; text-align: left; max-width: 800px; margin-left: auto; margin-right: auto; padding-left: 20px; list-style-type: disc;">
      <li>Once weekly programs: $150/Member, $200/Non-Member</li>
      <li>Twice weekly programs: $250/Member, $300/Non-Member</li>
    </ul>
    
    <div style="text-align: center; margin-top: 30px;">
      <a href="${apiLink}" style="display: inline-block; padding: 12px 25px; background-color: #4CAF50; color: white; text-align: center; border-radius: 5px; text-decoration: none; font-size: 16px;">
        REGISTER HERE
      </a>
    </div>
    
    <footer style="background-color: #7fcfff; padding: 15px; font-size: 12px; text-align: center; color: #333; width: 80%; margin: 20px auto; border-radius: 8px;">
      <p>Follow us:</p>
      <p>
        <a href="#">Facebook</a> | <a href="#">Instagram</a> | <a href="#">YouTube</a> | <a href="#">Website</a> | <a href="#">E-Mail</a>
      </p>
      <p>SIEGEL JCC, 101 Garden of Eden Road, Wilmington, DE 19803 | 302-478-5660</p>
    </footer>
  </div>
`;



    const formData = new FormData();
    formData.append(
      'name','Default Name');
      formData.append('bcc', bccEmails);
    formData.append('subject', subject);
    formData.append('message', emailBody); // Send the formatted message with the image and link
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
      setShowPopup(true); // Show popup on success
    } catch (error) {
      setErrorMessage('Error sending email: ' + error);
      setShowPopup(true); // Show popup on error
    } finally {
      setLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    router.push('/get_subscribers'); // Redirect to /get_subscribers
  };

  return (
    <div className="containerSendEmail">
      <h1 className="title">Send Email</h1>

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
          placeholder="Enter the API link"
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

      <button onClick={handleSendEmail} disabled={loading} className="button">
        {loading ? 'Sending...' : 'Send Email'}
      </button>

      <button onClick={onBack} className="backButton">Back</button>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup">
          <div className="popupContent">
            {successMessage && <p className="successMessage">{successMessage}</p>}
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
            <button onClick={handleClosePopup} className="popupButton">
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendEmail;
