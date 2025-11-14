"use client";
import { useState, useEffect, createContext } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header1 from "@/components/header/header1";
import Header2 from "@/components/header/header2";
import Footer from "@/components/footer/footer";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Providers from "@/store/Provider";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname
import axiosInstance from "@/utils/axios";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const UserContext = createContext();

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [userType, setUserType] = useState("");
  const [planName, setPlanName] = useState("");
  const [loading, setLoading] = useState(true);
  const [subscriptionExpired, setSubscriptionExpired] = useState(false);
  const [subscriptionExist, setSubscriptionExist] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Get current route

  useEffect(() => {
    const handleTokenChange = async () => {
      const existingToken = Cookies.get("token"); // Check if a token exists first
      if (!existingToken) return; // Stop execution if no token
    
      try {
        const { data } = await axiosInstance.post(`/api/users/getnewtoken`);
        const token = data.token;
        Cookies.set("token", token, { expires: 7 });
        localStorage.setItem("token", token);
        document.dispatchEvent(new Event("authChange"));
      } catch (error) {
        console.error("Failed to refresh token:", error);
        Cookies.remove("token"); // Ensure no invalid token remains
        localStorage.removeItem("token");
      }
    };    
    // handleTokenChange();
    const handleAuthChange = () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setFirstName(decodedToken.firstName || "User");
          setProfilePicture(decodedToken.profilePicture);
          setUserType(decodedToken.userType);

          const currentDate = new Date();
          const endDate = new Date(decodedToken.subscription?.endDate);
          console.log(currentDate);
          console.log(endDate);
          if (!decodedToken.subscription?.endDate || isNaN(endDate)) {
            //console.error("Invalid or missing subscription end date.");
            setSubscriptionExist(false);
            console.log("heh");
          }

          // Check subscription expiration
          else if (decodedToken.userType === "craftsman" && endDate < currentDate) {
            setSubscriptionExpired(true);
            if (pathname !== "/paymentpage") {
              //router.push("/paymentpage");
            }
          } else {
            setSubscriptionExpired(false);
            setSubscriptionExist(true);
          }
          setPlanName(decodedToken.subscription?.planName || "Individual");
          setIsLoggedIn(true);
        } catch (error) {
          console.error("Failed to decode token:", error);
          setFirstName("User");
        }
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    };

    const monitorToken = () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const expiry = decodedToken.exp;
          if (expiry < Date.now() / 1000) {
            Cookies.remove("token");
            localStorage.removeItem("token");
            document.dispatchEvent(new Event("authChange"));
          }
        } catch (error) {
          console.error("Failed to decode token:", error);
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    setInterval(monitorToken, 60 * 1000);
    document.addEventListener("authChange", handleAuthChange);
    handleAuthChange();

    return () => document.removeEventListener("authChange", handleAuthChange);
  }, [router, pathname]); // Include pathname in dependency array

  const userContextValue = {
    isLoggedIn,
    firstName,
    profilePicture,
    userType,
    planName,
    subscriptionExpired,
    subscriptionExist,
  };

  return (
    <Providers>
      <html lang="en" className={`${poppins.variable} font-sans`}>
        <body className="antialiased">
          {loading ? (
            <></>
          ) : subscriptionExpired && !pathname.startsWith("/paymentpage") ? ( // Exclude modal on /paymentpage
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h2 className="text-2xl font-semibold mb-4">
                  Subscription Expired
                </h2>
                <p className="mb-4">
                  Your subscription has expired. Please renew to continue using
                  the service.
                </p>
                <button
                  className="bg-blue-600 text-white py-2 px-4 rounded"
                  onClick={() => router.push("/paymentpage")}
                >
                  Renew Subscription
                </button>
              </div>
            </div>
          ) : (
            <>
              {isLoggedIn ? (
                <Header2
                  firstName={firstName}
                  profilePicture={profilePicture}
                  userType={userType}
                  planName={planName}
                />
              ) : (
                <Header1 />
              )}
              <UserContext.Provider value={userContextValue}>
                <main>{children}</main>
              </UserContext.Provider>
              <Footer />
            </>
          )}
        </body>
      </html>
    </Providers>
  );
}
