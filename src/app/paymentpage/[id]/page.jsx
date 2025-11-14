"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const PaymentResultPage = () => {
  const params = useParams();
  const { id } = params; // Extract payment ID from the route
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    if (!id ) return;

    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const tokenUserId = decodedToken.userId;
        const tokenUserType = decodedToken.userType;
        if (tokenUserId) {
          setUserId(tokenUserId);
          setUserType(tokenUserType);
        } else {
          console.error("UserId not found in token");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      console.error("No token found");
    }

    const fetchPaymentDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/payments/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch payment details");
        }
        const data = await response.json();
        console.log(data);
        setPaymentDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentDetails();
  }, [id]);

  const retryPayment = async () => {
    if (!paymentDetails) return;

    try {
      const response = await fetch("http://localhost:8000/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: paymentDetails.amount,
          description: paymentDetails.description,
          redirectUrl: `http://localhost:3000/payment-result/${id}`,
          paymentMethod: paymentDetails.paymentMethod,
          userId: paymentDetails.user._id,
          planName: paymentDetails.planDetails.name,
          billingCycle: paymentDetails.planDetails.billingCycle,
        }),
      });

      const data = await response.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error("Failed to create new payment");
      }
    } catch (err) {
      console.error("Error retrying payment:", err);
      setError("Failed to retry payment. Please try again later.");
    }
  };

  if (userType && userType !== "craftsman") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-xl font-semibold text-red-600">
            Alleen ambachtslieden kunnen betalingsgegevens bekijken.
          </p>
          <Link
            href="/pricing"
            className="mt-4 inline-block px-4 py-2 bg-[#27AAE2] text-white rounded hover:bg-[#27AAE2]/90"
          >
            Terug naar Abonnementen
          </Link>
        </div>
      </div>
    );
  }
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-xl font-semibold">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-xl font-semibold text-red-600">Error: {error}</p>
          <Link href="/pricing" className="mt-4 inline-block px-4 py-2 bg-[#27AAE2] text-white rounded hover:bg-[#27AAE2]/90">
            Back to Pricing
          </Link>
        </div>
      </div>
    );
  }

  // If user ID from token doesn't match the payment's user ID
  if (userId !== paymentDetails.user._id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <p className="text-xl font-semibold text-red-600">
            You are not authorized to view this payment.
          </p>
          <Link href="/pricing" className="mt-4 inline-block px-4 py-2 bg-[#27AAE2] text-white rounded hover:bg-[#27AAE2]/90">
            Back to Pricing
          </Link>
        </div>
      </div>
    );
  }

  const { paymentStatus, amount, description, planDetails, subscription, user, checkoutUrl } = paymentDetails;
  const formatDate = (date) => new Date(date).toLocaleDateString("nl-NL");


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#27AAE2]/10 to-white py-8 sm:py-12 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6 text-[#27AAE2]">Betalingsresultaat</h1>

        <div className="mb-6 space-y-2">
          <p><strong>Gebruiker:</strong> {user.firstName} {user.lastName} ({user.email})</p>
          <p><strong>Plan:</strong> {planDetails.name}</p>
          <p><strong>Cyclus:</strong> {planDetails.billingCycle === "monthly" ? "Maandelijks" : "Jaarlijks"}</p>
          <p><strong>Beschrijving:</strong> {description}</p>
          <p><strong>Bedrag:</strong> €{amount.toFixed(2)}</p>
          <p><strong>Status:</strong> {paymentStatus}</p>
          <p><strong>Startdatum:</strong> {formatDate(subscription.startDate)}</p>
          <p><strong>Einddatum:</strong> {formatDate(subscription.endDate)}</p>
          {/* <p><strong>Automatisch verlengen:</strong> {subscription.autoRenew ? "Ja" : "Nee"}</p> */}
        </div>

        {paymentStatus === "open" && (
          <div>
            <p className="text-yellow-600 mb-4">
              Uw betaling is nog niet voltooid. Klik op de knop hieronder om de betaling af te ronden.
            </p>
            <Link
              href={checkoutUrl}
              className="px-6 py-3 bg-[#27AAE2] text-white rounded-lg font-medium hover:bg-[#27AAE2]/90 transition-all inline-block"
            >
              Ga naar de betaalpagina
            </Link>
          </div>
        )}

        {paymentStatus === "completed" && (
          <div>
            <p className="text-green-600 mb-4">
              Uw betaling is succesvol afgerond. Bedankt voor uw bestelling!
            </p>
            <Link
              href="/dashboard/craftsman"
              className="px-6 py-3 bg-[#27AAE2] text-white rounded-lg font-medium hover:bg-[#27AAE2]/90 transition-all inline-block"
            >
              Ga naar Dashboard
            </Link>
          </div>
        )}

        {(paymentStatus === "failed" || paymentStatus === "expired") && (
          <div>
            <p className="text-red-600 mb-4">Uw betaling is mislukt of verlopen.</p>
            <button
              onClick={retryPayment}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-500 transition-all"
            >
              Probeer opnieuw
            </button>
          </div>
        )}

        {paymentStatus === "canceled" && (
          <div>
            <p className="text-gray-600 mb-4">
              Uw betaling is geannuleerd. U kunt teruggaan naar de abonnementspagina om een andere betaalmethode te kiezen.
            </p>
            <Link
              href="/pricing"
              className="px-6 py-3 bg-[#27AAE2] text-white rounded-lg font-medium hover:bg-[#27AAE2]/90 transition-all inline-block"
            >
              Terug naar Abonnementen
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentResultPage;
