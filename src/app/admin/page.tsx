/* eslint-disable react/no-unescaped-entities */
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.scss';

// Define interfaces
interface ParentName {
  first: string;
  last: string;
}

interface ChildName {
  first: string;
  last: string;
}

interface Address {
  line_1: string;
  line_2: string;
  city: string;
  state: string;
  zip_code: string;
}

interface FormData {
  parent_name: ParentName;
  child_name: ChildName;
  child_grade: string;
  email: string;
  phone: string;
  address: Address;
}

const Admin: React.FC = () => {
  const [formData, setFormData] = useState<FormData[]>([]); // Set the state with FormData type

  // Fetch the form data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<FormData[]>('http://127.0.0.1:80/get_forms');
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="admin-container">
      <h2>School Form Submissions</h2>
      
      {/* Check if there's data to display */}
      {formData.length > 0 ? (
        <table className="form-table">
          <thead>
            <tr>
              <th>Parent's Name</th>
              <th>Child's Name</th>
              <th>Grade</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {formData.map((form, index) => (
              <tr key={index}>
                <td>{form.parent_name.first} {form.parent_name.last}</td>
                <td>{form.child_name.first} {form.child_name.last}</td>
                <td>{form.child_grade}</td>
                <td>{form.email}</td>
                <td>{form.phone}</td>
                <td>
                  {form.address.line_1}, {form.address.line_2} <br />
                  {form.address.city}, {form.address.state} - {form.address.zip_code}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No form submissions yet.</p>
      )}
    </div>
  );
};

export default Admin;
