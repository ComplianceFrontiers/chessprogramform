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
          <h1 style="color: #2a9d8f; font-size: 24px; margin-bottom: 20px;">Practice Archery at the J!</h1>
          
          <img src="https://res.cloudinary.com/duvifszan/image/upload/v1732174269/bulkemail/aajea5vrkgfgbixf71qp.jpg" alt="Archery Program" style="width: 100%; max-width: 600px; border-radius: 8px; margin-bottom: 20px;" />
          
          <p style="font-size: 16px; line-height: 1.6; margin-top: 20px; text-align: left; max-width: 800px; margin-left: auto; margin-right: auto;">
            Join Coach Jeffers for a 5-week INDOOR archery program in the Auditorium. The first session begins Tonight! All the equipment used on our Outdoor Range will be moved inside. These sessions are for experienced archers* ages 8+ (youth and adults who have shot on a range in the last year). Sessions will include supervised shooting with instruction in real time and will be capped at 12 participants to give everyone plenty of practice time.
          </p>
          
         <p style="font-size: 16px; line-height: 1.6; text-align: left; max-width: 800px; margin-left: auto; margin-right: auto;">
              <b style="color: #d72c2c;">Program Details:</b>
            </p>
            <ul style="font-size: 16px; line-height: 1.6; text-align: left; max-width: 800px; margin-left: auto; margin-right: auto; padding-left: 20px; list-style-type: disc;">
              <li><b style="color: #d72c2c;">Dates:</b> Tuesdays, November 19 (TONIGHT) - December 17</li>
              <li><b style="color: #d72c2c;">Time:</b> 5 - 6:30 PM or 6:30 - 8 PM</li>
              <li><b style="color: #d72c2c;">Location:</b> Siegel JCC Auditorium</li>
              <li><b style="color: #d72c2c;">Instructor:</b> Coach Jeffers, Camp Archery Specialist</li>
              <li><b style="color: #d72c2c;">Age Restrictions:</b> 8+</li>
              <li><b style="color: #d72c2c;">Cost:</b> $75/Member, $100/Non-Member</li>
            </ul>
            <p style="font-size: 16px; line-height: 1.6; text-align: left; max-width: 800px; margin-left: auto; margin-right: auto;">
              On Week 5 there will be a class tournament based on points!
          </p>

          
          <p style="font-size: 16px; line-height: 1.6; text-align: left; max-width: 800px; margin-left: auto; margin-right: auto;">
            For more information, please contact Steph Kegelman.<br />
            <b>Register Today!</b><br />
          </p>
          
          <p style="font-size: 16px; line-height: 1.6; text-align: left; max-width: 800px; margin-left: auto; margin-right: auto;">
            For additional practice, you can sign up for individual Saturday sessions on November 23rd, 9 - 10:30 AM and December 7th, 9 - 10:30 AM. Orientation sessions will be held 30 minutes before each of these sessions as well.
          </p>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="${apiLink}" style="display: inline-block; padding: 12px 25px; background-color: #4CAF50; color: white; text-align: center; border-radius: 5px; text-decoration: none; font-size: 16px;">
              Click here to access the link
            </a>
          </div>
          
          <div style="background-color: #f1646f; padding: 15px; color: white; text-align: center; width: 80%; margin: 20px auto; border-radius: 8px;">
            <p style="font-size: 10px; line-height: 1.6; text-align: left; max-width: 800px; margin-left: auto; margin-right: auto;">
              <b style="color: #fff;">About the J:</b><br />
              The Siegel JCC is a non-profit Jewish community center where people of all faiths and backgrounds come together to learn, share, play, and celebrate. Our 32-acre campus houses an Early Childhood Center, Youth & Teen Programs, and Summer Camp, as well as a state-of-the-art Fitness Center, Indoor & Outdoor Pools, Sports, and Community Events.
            </p>
          </div>

          <footer style="background-color: #7fcfff; padding: 15px; font-size: 10px; text-align: center; color: #333; width: 80%; margin: 20px auto; border-radius: 8px;">
            <p>Follow us:</p>
            <p>
              <a href="#">Facebook</a> | <a href="#">Instagram</a> | <a href="#">YouTube</a> | <a href="#">Website</a> | <a href="#">E-Mail</a>
            </p>
            <p>SIEGEL JCC, 101 Garden of Eden Road, Wilmington, DE 19803 | 302-478-5660</p>
          </footer>
        </div>
        `;


    const formData = new FormData();
    formData.append('name', selectedRecords.map(record => record.name).join(', '));
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
