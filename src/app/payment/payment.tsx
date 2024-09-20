import CheckoutPage from "@/components/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

interface PaymentProps {
  formData: {
    parent_first_name: string;
    parent_last_name: string;
    child_first_name: string;
    child_last_name: string;
    child_grade: string;
    email: string;
    phone: string;
    acceptTerms: boolean;
    RequestFinancialAssistance: boolean;
    SchoolName: string;
  };
}

const Payment: React.FC<PaymentProps> = ({ formData }) => {
  const amount = 150; // This can be dynamic based on formData if needed

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h2 className="text-2xl">
          has requested
          <span className="font-bold"> ${amount}</span> for {formData.child_first_name} registration.
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} formData={formData} />
      </Elements>
    </main>
  );
};

export default Payment;
