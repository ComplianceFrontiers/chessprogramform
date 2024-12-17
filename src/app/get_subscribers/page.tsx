'use client'
import React, { useEffect, useState } from 'react';
import './get_subscribers.scss';
import SendEmail from '../../app/SendEmail'; // Import SendEmail component

// Define the Subscriber interface
interface Subscriber {
  profile_id: string;
  name: string;
  email: string;
  phone: string;
  subscriber: boolean;
  app: boolean;
  tournament: boolean;
  [key: string]: string | boolean; // Flexible for additional fields
}

const GetSubscribers: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState<Subscriber[]>([]);
  const [error, setError] = useState<string>('');

  // Selection states
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  // Filter states
  const [emailFilter, setEmailFilter] = useState<string>('');
  const [profileIdFilter, setProfileIdFilter] = useState<string>('');
  const [nameFilter, setNameFilter] = useState<string>('');
  const [phoneFilter, setPhoneFilter] = useState<string>('');
  const [booleanFilters, setBooleanFilters] = useState<{ [key: string]: string }>({
    app: 'All',
    tournament: 'All',
  });

  // Modal state for SendEmail
  const [showEmailModal, setShowEmailModal] = useState(false);

  // State to store selected subscribers' data for SendEmail
  const [selectedSubscribersData, setSelectedSubscribersData] = useState<{ name: string; email: string }[]>([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const response = await fetch('https://backend-chess-tau.vercel.app/get_master_list');
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
    const filtered = subscribers.filter((subscriber) =>
      (emailFilter ? subscriber.email.includes(emailFilter) : true) &&
      (profileIdFilter ? subscriber.profile_id.includes(profileIdFilter) : true) &&
      (nameFilter ? subscriber.name.includes(nameFilter) : true) &&
      (phoneFilter ? subscriber.phone.includes(phoneFilter) : true) &&
      Object.entries(booleanFilters).every(([key, value]) =>
        value === 'All' ? true : subscriber[key]?.toString() === value
      )
    );
    setFilteredSubscribers(filtered);
  }, [emailFilter, profileIdFilter, nameFilter, phoneFilter, booleanFilters, subscribers]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedSubscribers(!selectAll ? filteredSubscribers.map((sub) => sub.profile_id) : []);
  };

  const handleRowSelect = (profile_id: string) => {
    setSelectedSubscribers((prevSelected) =>
      prevSelected.includes(profile_id)
        ? prevSelected.filter((id) => id !== profile_id)
        : [...prevSelected, profile_id]
    );
  };

  const handleBooleanFilterChange = (key: string, value: string) => {
    setBooleanFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const handleOpenEmailModal = () => {
    const selectedData = filteredSubscribers
      .filter((subscriber) => selectedSubscribers.includes(subscriber.profile_id))
      .map(({ name, email }) => ({ name, email }));
    setShowEmailModal(true);
    setSelectedSubscribersData(selectedData);
  };

  const handleCloseEmailModal = () => {
    setShowEmailModal(false);
    setSelectedSubscribers([]);
  };

  return (
    <div className="subscribers-container">
    {!showEmailModal && <h2>Subscribers List</h2>}

      {error && <p className="error">{error}</p>}

      {/* Filter Inputs */}
      {!showEmailModal && (
        <div className="filters">
          <input type="text" placeholder="Filter by Name" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
          <input type="text" placeholder="Filter by Email" value={emailFilter} onChange={(e) => setEmailFilter(e.target.value)} />
          <input type="text" placeholder="Filter by Phone" value={phoneFilter} onChange={(e) => setPhoneFilter(e.target.value)} />
          <input type="text" placeholder="Filter by Profile ID" value={profileIdFilter} onChange={(e) => setProfileIdFilter(e.target.value)} />
          {['app', 'tournament'].map((key) => (
            <select
              key={key}
              value={booleanFilters[key]}
              onChange={(e) => handleBooleanFilterChange(key, e.target.value)}
            >
              <option value="All">All {key}</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          ))}
        </div>
      )}

      {!showEmailModal && filteredSubscribers.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>App</th>
                <th>Tournament</th>
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
                  <td>{subscriber.name}</td>
                  <td>{subscriber.email}</td>
                  <td>{subscriber.phone}</td>
                  <td>{subscriber.app ? 'Yes' : 'No'}</td>
                  <td>{subscriber.tournament ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="next-button" onClick={handleOpenEmailModal}>
            Next
          </button>
        </>
      ) : (
        !error && !showEmailModal && <p>No subscribers found.</p>
      )}

      {showEmailModal && (
        <SendEmail selectedRecords={selectedSubscribersData} onBack={handleCloseEmailModal} />
      )}
    </div>
  );
};

export default GetSubscribers;
