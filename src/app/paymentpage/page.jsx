"use client";

import React, { useState, useEffect } from "react";
import { PaymentMethod } from "@/components/pricing/PaymentMethod";
import { AdvantageItem } from "@/components/pricing/AdvantageItem";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const advantages = {
  PRO: [
    { text: "Verhoogde zichtbaarheid voor meer exposure" },
    { text: "15 privé contacten per maand voor meer kansen" },
    { text: "Uitgebreid profiel met portfolio showcase" },
    { text: "Bespaar €48 met jaarlijks abonnement" },
  ],
  PREMIUM: [
    { text: "Maximale zichtbaarheid voor optimaal bereik" },
    { text: "Onbeperkt contact voor grenzeloze mogelijkheden" },
    { text: "Prioriteit in zoekresultaten voor maximale exposure" },
    { text: "Bespaar €120 met jaarlijks abonnement" },
  ],
};

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState("ideal");
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("PRO");
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const plan = searchParams.get("plan");
    const period = searchParams.get("period");

    if (plan) {
      setSelectedPlan(plan);
    }

    if (period && period.includes("jaar")) {
      setIsYearly(true);
    }

    // Get user details from token
    const token = Cookies.get('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const tokenUserId = decodedToken.userId;
        const tokenUserType = decodedToken.userType;
        if (tokenUserId) {
          setUserId(tokenUserId);
          setUserType(tokenUserType);
          checkExistingSubscription(tokenUserId);
        } else {
          console.error('UserId not found in token');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.error('No token found');
    }
  }, [searchParams]);

  const planPrices = {
    PRO: {
      monthly: 19.99,
      yearly: 191.90,
    },
    PREMIUM: {
      monthly: 49.99,
      yearly: 479.90,
    },
  };

  const currentPrice = planPrices[selectedPlan][isYearly ? "yearly" : "monthly"];
  const period = isYearly ? "per jaar" : "per maand";

  const handlePayment = async () => {
    if (!userId) {
      console.error('User ID is required for payment');
      return;
    }

    try {
      const response = await fetch("https://api.fastnfresh.app/proconnect/api/create-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: currentPrice,
          description: `Abonnement: ${selectedPlan} (${isYearly ? 'Jaarlijks' : 'Maandelijks'})`,
          redirectUrl: `http://localhost:3000/paymentpage`,
          paymentMethod: selectedPayment,
          userId: userId,
          planName: selectedPlan,
          billingCycle: isYearly ? 'yearly' : 'monthly'
        }),
      });

      const data = await response.json();
      if (data.paymentId && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        console.error("Invalid response from payment creation");
      }
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };
  const checkExistingSubscription = async (userId) => {
    try {
      const response = await fetch(`https://api.fastnfresh.app/proconnect/api/payments/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.payments && data.payments.length > 0) {
          const latestPayment = data.payments[0];
          console.log("latestPayment:", latestPayment);
          const res2 = await fetch(`https://api.fastnfresh.app/proconnect/api/payments/${latestPayment.customId}`);
          if (res2.ok) {
            const data2 = await res2.json();
            const currentDate = new Date();
            const endDate = new Date(data2.subscription?.endDate);
            if(!(endDate < currentDate)) {
              router.push(`/paymentpage/${latestPayment.customId}`);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error checking existing subscription:", error);
    } finally {
      setLoading(false);
    }
  };

  if (userType !== 'craftsman') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#27AAE2]/10 to-white flex items-center justify-center p-4">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-[#27AAE2] mb-4">Alleen voor vakmensen</h2>
          <p className="text-gray-600 mb-6">
            Abonnementen zijn alleen beschikbaar voor geregistreerde professionele vakmensen. Bent u een professional en ziet u dit bericht, neem dan contact op met onze klantenservice.
          </p>
          <Link
            href="/pricing"
            className="px-4 sm:px-6 py-2 bg-[#27AAE2] text-white rounded-lg font-medium hover:bg-[#27AAE2]/90 transition-all inline-block"
          >
            Terug naar prijzen
          </Link>
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#27AAE2]/10 to-white flex items-center justify-center p-4">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-[#27AAE2] mb-4">Laden...</h2>
          <p className="text-gray-600">Even geduld alstublieft terwijl we uw gegevens ophalen.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#27AAE2]/10 to-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block px-3 sm:px-4 py-1 bg-[#27AAE2]/10 text-[#27AAE2] rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-4">
            Bevestig uw {selectedPlan} abonnement
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4">
            <span className="text-[#27AAE2]">Betaling</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Kies uw gewenste betaalmethode en bevestig uw bestelling
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Plan Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8">
              <div className="space-y-2 mb-4 sm:mb-0">
                <h2 className="text-xl sm:text-2xl font-semibold">Gekozen abonnement</h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <select
                    value={selectedPlan}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="bg-[#27AAE2]/10 text-[#27AAE2] px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base"
                  >
                    <option value="PRO">PRO</option>
                    <option value="PREMIUM">PREMIUM</option>
                  </select>
                  <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-full">
                    <button
                      onClick={() => setIsYearly(false)}
                      className={`px-3 sm:px-4 py-1 rounded-full transition-all text-xs sm:text-sm ${
                        !isYearly ? "bg-white shadow-sm" : ""
                      }`}
                    >
                      Maandelijks
                    </button>
                    <button
                      onClick={() => setIsYearly(true)}
                      className={`px-3 sm:px-4 py-1 rounded-full transition-all text-xs sm:text-sm ${
                        isYearly ? "bg-white shadow-sm" : ""
                      }`}
                    >
                      Jaarlijks
                    </button>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-bold text-[#27AAE2]">
                  €{currentPrice.toFixed(2)}
                  <span className="text-sm sm:text-base font-normal text-gray-600 ml-1">
                    {period}
                  </span>
                </div>
                {isYearly && (
                  <span className="text-green-500 text-xs sm:text-sm font-medium">
                    20% korting
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {advantages[selectedPlan].map((advantage, index) => (
                <AdvantageItem key={index} text={advantage.text} />
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Betaalmethode</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              <PaymentMethod
                title="iDEAL"
                isSelected={selectedPayment === "ideal"}
                onClick={() => setSelectedPayment("ideal")}
              />
              <PaymentMethod
                title="PayPal"
                isSelected={selectedPayment === "paypal"}
                onClick={() => setSelectedPayment("paypal")}
              />
              <PaymentMethod
                title="Bancontact"
                isSelected={selectedPayment === "bancontact"}
                onClick={() => setSelectedPayment("bancontact")}
              />
              <PaymentMethod
                title="Visa/Mastercard"
                isSelected={selectedPayment === "creditcard"}
                onClick={() => setSelectedPayment("creditcard")}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <Link
              href="/pricing"
              className="text-gray-600 hover:text-[#27AAE2] transition-colors text-sm sm:text-base"
            >
              ← Terug naar abonnementen
            </Link>
            <button
              onClick={handlePayment}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#27AAE2] text-white rounded-lg font-medium hover:bg-[#27AAE2]/90 transition-all text-sm sm:text-base"
            >
              Bevestig betaling
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;