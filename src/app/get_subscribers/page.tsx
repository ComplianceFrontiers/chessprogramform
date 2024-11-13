'use client';
import React, { useEffect, useState } from 'react';
import './get_subscribers.scss';
import SendEmail from '../../app/SendEmail';  // Import SendEmail component

// Define the Subscriber interface
interface Subscriber {
  profile_id: string;
  email: string;
  subscriber: boolean;
}

const GetSubscribers: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([]);
  const [error, setError] = useState<string>('');

  // Selection states
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);  // Selected subscribers as profile_ids
  const [selectAll, setSelectAll] = useState(false);

  // Filter states
  const [emailFilter, setEmailFilter] = useState<string>('');
  const [profileIdFilter, setProfileIdFilter] = useState<string>('');
  const [subscriberFilter, setSubscriberFilter] = useState<string>('All');

  // Modal state for SendEmail
  const [showEmailModal, setShowEmailModal] = useState(false);

  // State to store selected subscribers' data for SendEmail
  const [selectedSubscribersData, setSelectedSubscribersData] = useState<{ name: string; email: string }[]>([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch('https://backend-chess-tau.vercel.app/get_forms2');
        if (response.ok) {
          const data: Subscriber[] = await response.json();
          setSubscribers(data);
          setFilteredSubscribers(data);
        } else {
          setError('Failed to fetch subscribers');
        }
      } catch (error) {
        setError('Error occurred while fetching data');
      }
    };

    fetchSubscribers();
  }, []);

  // Update filtered list based on filters
  useEffect(() => {
    const filtered = subscribers.filter(subscriber =>
      (emailFilter ? subscriber.email.includes(emailFilter) : true) &&
      (profileIdFilter ? subscriber.profile_id.includes(profileIdFilter) : true) &&
      (subscriberFilter === 'All' ? true : subscriber.subscriber.toString() === subscriberFilter)
    );
    setFilteredSubscribers(filtered);
  }, [emailFilter, profileIdFilter, subscriberFilter, subscribers]);

  // Handle select all toggle
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedSubscribers(filteredSubscribers.map((subscriber) => subscriber.profile_id));
    } else {
      setSelectedSubscribers([]);
    }
  };

  // Handle individual row selection
  const handleRowSelect = (profile_id: string) => {
    setSelectedSubscribers((prevSelected) =>
      prevSelected.includes(profile_id)
        ? prevSelected.filter((id) => id !== profile_id)
        : [...prevSelected, profile_id]
    );
  };

  const handleOpenEmailModal = () => {
    const selectedData = filteredSubscribers.filter(subscriber =>
      selectedSubscribers.includes(subscriber.profile_id)
    ).map(subscriber => ({
      name: subscriber.profile_id,  // or another field if needed
      email: subscriber.email,
    }));
  
    setShowEmailModal(true);
    setSelectedSubscribersData(selectedData);  // Store the selected subscribers' data
  };
  

  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
    setSelectedSubscribers([]);  // Reset selected subscribers
  };

  return (
    <div className="subscribers-container">
      <h2>Subscribers List</h2>
      {error && <p className="error">{error}</p>}
      
      {/* Filter Inputs */}
      {!showEmailModal && (
        <div className="filters">
          <input 
            type="text" 
            placeholder="Filter by email" 
            value={emailFilter} 
            onChange={(e) => setEmailFilter(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Filter by Profile ID" 
            value={profileIdFilter} 
            onChange={(e) => setProfileIdFilter(e.target.value)}
          />
          <select value={subscriberFilter} onChange={(e) => setSubscriberFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      )}

      {!showEmailModal && filteredSubscribers.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>
                  <input 
                    type="checkbox" 
                    checked={selectAll} 
                    onChange={handleSelectAll} 
                  />
                </th>
                <th>Email</th>
                <th>Profile ID</th>
                <th>Is Subscriber</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscribers.map((subscriber) => (
                <tr key={subscriber.profile_id}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedSubscribers.includes(subscriber.profile_id)} 
                      onChange={() => handleRowSelect(subscriber.profile_id)} 
                    />
                  </td>
                  <td>{subscriber.email}</td>
                  <td>{subscriber.profile_id}</td>
                  <td>{subscriber.subscriber ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="next-button" onClick={handleOpenEmailModal}>Next</button>
        </>
      ) : (
        !error && !showEmailModal && <p>No subscribers found.</p>
      )}

      {/* Show SendEmail Modal */}
      {showEmailModal && (
        <SendEmail
          selectedRecords={selectedSubscribersData}  // Passing the selected subscribers' data
          onBack={handleCloseEmailModal}  // Callback to close the modal
        />
      )}
    </div>
  );
};

export default GetSubscribers;
