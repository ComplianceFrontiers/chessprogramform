/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import './admin.scss';
import * as XLSX from 'xlsx'; // Import the XLSX library
import withadminAuth from '../withadminAuth';

// Define interfaces
interface ParentName {
  first: string;
  last: string;
}

interface ChildName {
  first: string;
  last: string;
}

interface FormData {
  profile_id: string;
  parent_name: ParentName;
  child_name: ChildName;
  child_grade: string;
  email: string;
  phone: string;
  RequestFinancialAssistance: boolean;
  SchoolName: string;
  payment_status: string; // New field: Payment status
  group: string; // New field: Group
  level: string; // New field: Level
}

const Admin: React.FC = () => {
  const [formData, setFormData] = useState<FormData[]>([]); // Set the state with FormData type
  const router = useRouter(); // Use router for redirect

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    router.push('/adminsignin'); // Redirect to /admin after logout
  };

  // Fetch the form data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<FormData[]>('https://backend-chess-tau.vercel.app/get_forms');
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Function to handle updates for each row's data
  const handleUpdate = (index: number, field: string, value: string) => {
    const updatedFormData = [...formData];
    updatedFormData[index] = {
      ...updatedFormData[index],
      [field]: value,
    };
    setFormData(updatedFormData);
  };

  // Handle form submission (Save changes for all rows)
  const handleSubmit = async () => {
    try {
      const updatePayload = {
        updates: formData.map((form) => ({
          profile_id: form.profile_id,
          payment_status: form.payment_status,
          group: form.group,
          level: form.level,
        })),
      };

      const response = await axios.post('https://backend-chess-tau.vercel.app/update_forms', updatePayload);

      if (response.status === 200) {
        alert('Changes saved successfully!');
      } else {
        alert('Failed to save changes. Please try again.');
      }
    } catch (error) {
      alert('An error occurred while saving changes. Please try again.');
    }
  };

  // Function to handle export to Excel
  const handleExportToExcel = () => {
    const dataToExport = formData.map((form) => ({
      "profile_id": form.profile_id,
      "Parent's First Name": form.parent_name.first,
      "Parent's Last Name": form.parent_name.last,
      "Child's First Name": form.child_name.first,
      "Child's Last Name": form.child_name.last,
      "Child's Grade": form.child_grade,
      "Email": form.email,
      "Phone": form.phone,
      "Request Financial Assistance": form.RequestFinancialAssistance ? 'Yes' : 'No',
      "School Name": form.SchoolName,
      "Payment Status": form.payment_status,
      "Group": form.group,
      "Level": form.level,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Form Submissions');
    XLSX.writeFile(workbook, 'form_submissions.xlsx');
  };

  return (
    <div className="admin-container">
      <div className="button-container">
        <button className="logout-button" onClick={handleLogout}>
          Log Out
        </button>
        <button className="export-button" onClick={handleExportToExcel}>
          Export to Excel
        </button>
        <button className="save-button" onClick={handleSubmit}>
          Save All Changes
        </button>
      </div>

      <h2>School Form Submissions</h2>

      {formData.length > 0 ? (
        <table className="form-table">
          <thead>
            <tr>
              <th>Profile ID</th>
              <th>Parent's Name</th>
              <th>Child's Name</th>
              <th>Grade</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Financial Assistance</th>
              <th>School Name</th>
              <th>Payment Status</th>
              <th>Group</th>
              <th>Level</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((form, index) => (
              <tr key={index}>
                <td>{form.profile_id}</td>
                <td>{form.parent_name.first} {form.parent_name.last}</td>
                <td>{form.child_name.first} {form.child_name.last}</td>
                <td>{form.child_grade}</td>
                <td>{form.email}</td>
                <td>{form.phone}</td>
                <td>{form.RequestFinancialAssistance ? 'Yes' : 'No'}</td>
                <td>{form.SchoolName}</td>
                <td>
                  <div className="radio-buttons">
                    <label>
                      <input
                        type="radio"
                        value="Yes"
                        checked={form.payment_status === 'Yes'}
                        onChange={() => handleUpdate(index, 'payment_status', 'Yes')}
                      /> Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="No"
                        checked={form.payment_status === 'No'}
                        onChange={() => handleUpdate(index, 'payment_status', 'No')}
                      /> No
                    </label>
                  </div>
                </td>
                <td>
                  <select
                    value={form.group}
                    onChange={(e) => handleUpdate(index, 'group', e.target.value)}
                  >
                    <option value="">Select group</option>
                    <option value="After School Group 1">After School Group 1</option>
                    <option value="Club Group 2">Club Group 2</option>
                    {/* Add more groups as needed */}
                  </select>
                </td>
                <td>
                  <select
                    value={form.level}
                    onChange={(e) => handleUpdate(index, 'level', e.target.value)}
                  >
                    <option value="">Select level</option>
                    <option value="Level1">Level 1</option>
                    <option value="Level2">Level 2</option>
                    <option value="Level3">Level 3</option>
                    <option value="Level4">Level 4</option>
                    <option value="Level5">Level 5</option>
                    {/* Add more levels as needed */}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No form submissions found.</p>
      )}
    </div>
  );
};

export default withadminAuth(Admin);
