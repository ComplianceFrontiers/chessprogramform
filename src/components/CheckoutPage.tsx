import React, { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";

interface CheckoutPageProps {
  amount: number;
  formData: {
    parent_first_name: string;
    parent_last_name: string;
    child_first_name: string;
    child_last_name: string;
    child_grade: string;
    email: string;
    phone: string;
    SchoolName: string;
    RequestFinancialAssistance: boolean;
    acceptTerms: boolean;
   
  };
  disabled:boolean;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ amount, formData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Create payment intent only if clientSecret is null
    if (!clientSecret && formData.email&&formData.acceptTerms==true) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          amount: convertToSubcurrency(amount), 
          formData,
        }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch((error) => {
          setErrorMessage("Failed to create payment intent");
          console.error(error);
        });
    }
  }, [amount, formData.email,formData.acceptTerms]);

  const allFieldsFilled = () => {
    return Object.values(formData).every(
      (field) => field !== "" && field !== undefined && field !== null
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !clientSecret) {
      setErrorMessage("Stripe or Payment details are missing.");
      setLoading(false);
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    // Confirm payment
    const result = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `https://chesschampsus.vercel.app/payment-success?amount=${amount}&redirect_status=succeeded&parent_first_name=${encodeURIComponent(
          formData.parent_first_name
        )}&parent_last_name=${encodeURIComponent(
          formData.parent_last_name
        )}&child_first_name=${encodeURIComponent(
          formData.child_first_name
        )}&child_last_name=${encodeURIComponent(
          formData.child_last_name
        )}&child_grade=${encodeURIComponent(
          formData.child_grade
        )}&email=${encodeURIComponent(formData.email)}&phone=${encodeURIComponent(
          formData.phone
        )}&SchoolName=${encodeURIComponent(
          formData.SchoolName
        )}&RequestFinancialAssistance=${
          formData.RequestFinancialAssistance
        }`,
      },
    });

    // Handle payment result
    if (result.error) {
      setErrorMessage(result.error.message);
      setLoading(false);
      return;
    }
  };
  if (!formData.email || !allFieldsFilled()|| !formData.acceptTerms) {
    return (
      <div className="flex items-center justify-center h-14">
        <p className="text-red-500 text-xl font-semibold">
          Please enter all required details to make payment.
        </p>
      </div>
    );
  }
  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="sr-only">Loading....</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}
      {errorMessage && <div>{errorMessage}</div>}
      {!allFieldsFilled() && (
        <div className="text-red-500">
          Please fill all required fields.
        </div>
      )}
      <button
        disabled={!stripe || loading || !allFieldsFilled()}
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;