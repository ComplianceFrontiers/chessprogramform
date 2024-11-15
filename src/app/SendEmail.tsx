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

    // Insert the API link into the email message
    const linkButton = `
      <a href="${apiLink}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-align: center; border-radius: 5px; text-decoration: none;">
        Click here to access the link
      </a>
    `;

    const formData = new FormData();
    formData.append('name', selectedRecords.map(record => record.name).join(', '));
    formData.append('bcc', bccEmails);
    formData.append('subject', subject);
    formData.append('message', message + linkButton); // Append the API link button to the message
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
