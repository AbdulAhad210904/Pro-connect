'use client';

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Header1 from "@/components/header/header1";
import Header2 from "@/components/header/header2";

export default function HeaderWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setFirstName(decodedToken.firstName || "User");
        setProfilePicture(decodedToken.profilePicture);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setFirstName("User");
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return isLoggedIn ? (
    <Header2 firstName={firstName} profilePicture={profilePicture} />
  ) : (
    <Header1 />
  );
}