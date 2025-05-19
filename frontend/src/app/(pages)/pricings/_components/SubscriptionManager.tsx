/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUserStore } from "../../../../store/userStore"
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

interface Subscription {
  stripeSubscriptionId: string;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd?: boolean;
}

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

export const SubscriptionManager = () => {
  return (
    <Elements stripe={stripePromise}>
      <SubscriptionForm />
    </Elements>
  );
};

const SubscriptionForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { profile, getUserProfile } = useUserStore();
  
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [prices] = useState([{ id: "price_monthly", name: "Monthly Subscription", amount: 299.0, interval: "month" }]);
  const [selectedPrice, setSelectedPrice] = useState("price_monthly");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [hasDefaultPaymentMethod, setHasDefaultPaymentMethod] = useState(false);

  useEffect(() => {
    if (!profile) getUserProfile();
    else {
      fetchSubscriptions();
      fetchPaymentMethods();
    }
  }, [profile]);

  const fetchSubscriptions = async () => {
    if (!profile) return;

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:2000/api/subscriptions/user/${profile._id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch subscriptions");

      const data = await response.json();
      setSubscriptions(data.subscriptions || []);
    } catch (err: any) {
      console.error(err);
      setError("Could not load subscription information");
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentMethods = async () => {
    if (!profile) return;

    try {
      const response = await fetch("http://localhost:2000/api/payments/payment-methods", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch payment methods");

      const data = await response.json();
      setPaymentMethods(data.paymentMethods || []);
      const hasDefault = data.paymentMethods?.some((method: PaymentMethod) => method.isDefault);
      setHasDefaultPaymentMethod(hasDefault);
    } catch (err) {
      console.error("Error fetching payment methods:", err);
    }
  };

  const startSubscription = async () => {
    if (!profile || !hasDefaultPaymentMethod || !stripe) {
      setError("Please ensure you're logged in and have a default payment method");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("http://localhost:2000/api/subscriptions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: profile._id, priceId: selectedPrice }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create subscription");
      }

      const result = await response.json();

      if (result.clientSecret) {
        const { error } = await stripe.confirmCardPayment(result.clientSecret);
        if (error) throw new Error(error.message);
      }

      setMessage("Subscription started successfully");
      fetchSubscriptions();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to start subscription");
    } finally {
      setLoading(false);
    }
  };

  const cancelSubscription = async (subscriptionId: string) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:2000/api/subscriptions/${subscriptionId}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to cancel subscription");
      }

      setMessage("Subscription canceled successfully");
      fetchSubscriptions();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to cancel subscription");
    } finally {
      setLoading(false);
    }
  };

  const hasActiveSubscription = subscriptions.some(sub =>
    ["active", "trialing"].includes(sub.status)
  );

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Subscription Management</h2>

      {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{message}</div>}
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

      {loading ? (
        <p>Loading subscription information...</p>
      ) : (
        <>
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-3 text-gray-700">Your Subscriptions</h3>
            {subscriptions.length > 0 ? (
              subscriptions.map(subscription => (
                <div key={subscription.stripeSubscriptionId} className="p-4 border rounded-md mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Subscription</span>
                    <span className={`px-2 py-1 rounded text-sm ${subscription.status === "active"
                        ? "bg-green-100 text-green-800"
                        : subscription.status === "canceled"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"}`}>
                      {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>Current period: {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}</p>
                    {subscription.cancelAtPeriodEnd && (
                      <p className="text-amber-600">Will cancel at period end</p>
                    )}
                  </div>
                  {["active", "trialing"].includes(subscription.status) && !subscription.cancelAtPeriodEnd && (
                    <div className="mt-3">
                      <Button onClick={() => cancelSubscription(subscription.stripeSubscriptionId)} disabled={loading} variant="destructive" size="sm">
                        Cancel Subscription
                      </Button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No active subscriptions found.</p>
            )}
          </div>

          {!hasActiveSubscription && (
            <div className="border-t pt-6 mt-6">
              <h3 className="text-lg font-semibold mb-3 text-gray-700">Start New Subscription</h3>
              <div className="p-4 border rounded-md mb-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Monthly Subscription</h4>
                    <p className="text-gray-600">$299.00 / month</p>
                    <p className="text-sm text-gray-500 mt-1">Auto-renews monthly, cancel anytime</p>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="price_monthly"
                      name="price"
                      value="price_monthly"
                      checked={selectedPrice === "price_monthly"}
                      onChange={() => setSelectedPrice("price_monthly")}
                      className="mr-2"
                    />
                    <label htmlFor="price_monthly">Select</label>
                  </div>
                </div>
              </div>

              {!hasDefaultPaymentMethod && (
                <div className="mb-4 p-3 bg-yellow-100 text-yellow-700 rounded">
                  Please add a default payment method before subscribing.
                </div>
              )}

              <Button onClick={startSubscription} disabled={loading || !hasDefaultPaymentMethod} className="bg-[#00A5CF] hover:bg-[#0090B8] text-white">
                {loading ? "Processing..." : "Start Subscription"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SubscriptionManager;
