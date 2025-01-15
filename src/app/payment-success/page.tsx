'use client';
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Loading from "../../../Loading";

export default function PaymentSuccess({
  searchParams: {
    amount,
    redirect_status,
    parent_first_name,
    parent_last_name,
    child_first_name,
    child_last_name,
    child_grade,
    email,
    phone,
    SchoolName,
    RequestFinancialAssistance,
  },
}: {
  searchParams: {
    amount: string;
    redirect_status: string;
    parent_first_name: string;
    parent_last_name: string;
    child_first_name: string;
    child_last_name: string;
    child_grade: string;
    email: string;
    phone: string;
    SchoolName: string;
    RequestFinancialAssistance: boolean;
  };
}) {
  const [loading, setLoading] = useState(true);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const hasExecuted = useRef(false); // Use a ref to track execution

  useEffect(() => {
    const sendFormData = async () => {
      if (!hasExecuted.current) {
        hasExecuted.current = true; // Mark as executed

        console.log('Executing API calls');

        setLoading(true); // Start loading

        try {
          const formData = {
            parent_first_name,
            parent_last_name,
            child_first_name,
            child_last_name,
            child_grade,
            email,
            phone,
            SchoolName,
            RequestFinancialAssistance,
            redirect_status,
          };

          // Send first request
          await axios.post('https://backend-chess-tau.vercel.app/send-email-form-mpes', formData);

          // Send second request and track response status
          const response2 = await axios.post('https://backend-chess-tau.vercel.app/form_Basics_Of_Chess_bp_submit', formData);
          setResponseStatus(response2.status);

          // Only set loading to false after getting the response
          if (response2.status === 201) {
            setLoading(false);
          }
        } catch (error) {
          console.error('There was an error submitting the form!', error);
          setLoading(false); // Ensure loading is false on error
        }
      } else {
        // setLoading(false); // Ensure loading is false if not executed
      }
    };

    sendFormData();
  }, [redirect_status]); // Only track redirect_status

  return (
    <div className="text-center text-white">
      {loading && (
        <Loading />
      )}

      {responseStatus === 201 ? (
        <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
          <div className="mb-10">
            <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
            <h2 className="text-2xl">You successfully sent</h2>
            <div className="bg-white p-2 rounded-md text-purple-500 mt-5 text-4xl font-bold">
              ${amount}
            </div>
            <div className="mt-5 text-xl">
              Payment Status: <span className="font-bold">{redirect_status}</span>
            </div>
          </div>
        </main>
      ) : (
        <div>Something went wrong. Please try again.</div>
      )}
    </div>
  );
}
