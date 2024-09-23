/* eslint-disable @typescript-eslint/no-var-requires */
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

interface FormData {
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
}

export async function POST(request: NextRequest) {
  try {
    const { amount, formData }: { amount: number; formData: FormData } = await request.json();

    // Create a unique idempotency key (e.g., using a combination of email and timestamp)
    const idempotencyKey = `payment_${formData.email}_${Date.now()}`;

    // Create customer in Stripe
    const customer = await stripe.customers.create({
      email: formData.email,
      name: `${formData.parent_first_name} ${formData.parent_last_name}`, // Combining first and last name
      phone: formData.phone, // Optional: You can add other details like phone, etc.
      metadata: {
        child_name: `${formData.child_first_name} ${formData.child_last_name}`,
        child_grade: formData.child_grade,
        school_name: formData.SchoolName,
        request_financial_assistance: formData.RequestFinancialAssistance,
        accept_terms: formData.acceptTerms
      }
    });

    // Create a Payment Intent for the customer
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      customer: customer.id,
      automatic_payment_methods: { enabled: true },
      receipt_email: formData.email,
    }, {
      idempotencyKey: idempotencyKey,   
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
}
