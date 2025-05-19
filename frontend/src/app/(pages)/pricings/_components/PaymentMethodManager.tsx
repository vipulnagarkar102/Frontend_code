"use client";

import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import { useUserStore } from "../../../../store/userStore"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

interface PaymentMethod {
  id: string;
  card: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
  isDefault?: boolean;
}

export const PaymentMethodManager = () => (
  <Elements stripe={stripePromise}>
    <PaymentMethodForm />
  </Elements>
);

const PaymentMethodForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { profile, getUserProfile } = useUserStore();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!profile) {
      getUserProfile();
    } else {
      fetchPaymentMethods();
    }
  }, [profile]);

  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch("http://localhost:2000/api/payments/payment-methods", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch payment methods");

      const data = await response.json();
      setPaymentMethods(data.paymentMethods || []);
    } catch (err) {
      console.error("Error fetching payment methods:", err);
    }
  };

  const handleAddPaymentMethod = async () => {
    if (!stripe || !elements || !profile) {
      setError("Please ensure you are logged in and Stripe is loaded.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError("Card element not found");
      setLoading(false);
      return;
    }

    try {
      const { setupIntent, error } = await stripe.confirmCardSetup(
        process.env.NEXT_PUBLIC_STRIPE_SETUP_INTENT_CLIENT_SECRET || "",
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        setError(error.message || "An error occurred while adding your payment method.");
        return;
      }

      if (!setupIntent) {
        setError("Setup intent not completed.");
        return;
      }

      const response = await fetch("http://localhost:2000/api/payments/add-payment-method", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId: profile._id,
          paymentMethodId: setupIntent.payment_method,
        }),
      });

      if (!response.ok) throw new Error("Failed to save payment method");

      setMessage("Payment method added successfully.");
      fetchPaymentMethods();
    } catch (err: any) {
      setError(err.message || "Failed to add payment method.");
    } finally {
      setLoading(false);
    }
  };

  const handleSetDefault = async (paymentMethodId: string) => {
    if (!profile) return;

    try {
      const response = await fetch("http://localhost:2000/api/payments/set-default", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId: profile._id,
          paymentMethodId,
        }),
      });

      if (!response.ok) throw new Error("Failed to set default payment method");

      setMessage("Default payment method updated.");
      fetchPaymentMethods();
    } catch (err: any) {
      setError(err.message || "Failed to update default payment method.");
    }
  };

  const handleRemove = async (paymentMethodId: string) => {
    try {
      const response = await fetch("http://localhost:2000/api/payments/remove-payment-method", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ paymentMethodId }),
      });

      if (!response.ok) throw new Error("Failed to remove payment method");

      setMessage("Payment method removed.");
      fetchPaymentMethods();
    } catch (err: any) {
      setError(err.message || "Error removing payment method.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Payment Method Management</h2>

      {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{message}</div>}
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Your Payment Methods</h3>
        {paymentMethods.length > 0 ? (
          paymentMethods.map((method) => (
            <div key={method.id} className="p-4 border rounded-md mb-4 flex justify-between items-center">
              <div>
                <p className="font-medium">
                  {method.card.brand.toUpperCase()} **** {method.card.last4}
                </p>
                <p className="text-gray-600 text-sm">
                  Expires {method.card.exp_month}/{method.card.exp_year}
                </p>
                {method.isDefault && (
                  <p className="text-green-600 font-semibold text-sm">Default</p>
                )}
              </div>
              <div className="space-x-2">
                {!method.isDefault && (
                  <Button
                    onClick={() => handleSetDefault(method.id)}
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Set as Default
                  </Button>
                )}
                <Button
                  onClick={() => handleRemove(method.id)}
                  size="sm"
                  variant="destructive"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No saved payment methods.</p>
        )}
      </div>

      <div className="border-t pt-6 mt-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Add New Payment Method</h3>
        <div className="p-4 border rounded-md mb-4">
          <CardElement className="p-2 border rounded" />
        </div>
        <Button
          onClick={handleAddPaymentMethod}
          disabled={loading}
          className="bg-[#00A5CF] hover:bg-[#0090B8] text-white"
        >
          {loading ? "Adding..." : "Add Payment Method"}
        </Button>
      </div>
    </div>
  );
};

export default PaymentMethodManager;
