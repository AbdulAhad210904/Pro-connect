import axios from "axios";
import axiosInstance from "../utils/axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

// Update password service
export const updatePasswordService = async (currentPassword, newPassword) => {
  try {
    console.log(token);
    const response = await axiosInstance.put(
      "api/users/updatepassword",
      currentPassword,
      newPassword,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response?.data?.message === "Current password is not correct") {
      throw new Error("The current password is incorrect. Please try again.");
    } else {
      // Handle other errors
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while updating the password"
      );
    }
  }
};

export const updateDisableStatusService = async () => {
  try {
    const response = await axiosInstance.put("api/users/updatedisablestatus", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while updating the status"
    );
  }
};

export const updateDeleteStatusService = async () => {
  try {
    const response = await axiosInstance.put("api/users/updatedeletestatus", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while updating the status"
    );
  }
};

export const sendVerificationCodeService = async () => {
  try {
    const response = await axiosInstance.post(
      "api/users/sendEmailVerificationCode",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error.response?.data?.message === "Email is required") {
      throw new Error("Please provide a valid email address.");
    } else {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while sending the verification code."
      );
    }
  }
};

export const verifyCodeService = async (code) => {
  try {
    const response = await axiosInstance.post(
      "api/users/verifyEmailVerificationCode",
      { code },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (
      error.response?.data?.message === "Invalid or expired verification code"
    ) {
      throw new Error(
        "The verification code is invalid or has expired. Please try again."
      );
    } else {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while verifying the code."
      );
    }
  }
};

export const sendOTP = async (phoneNumber) => {
  try {
    const response = await axiosInstance.post(
      `api/users/sendPhoneVerificationCode`,
      { phoneNumber },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.message;
  } catch (error) {
    console.error(
      "Error sending OTP:",
      error.response?.data?.message || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to send OTP");
  }
};

export const verifyOTP = async (phoneNumber, verificationCode) => {
  try {
    const response = await axiosInstance.post(
      `api/users/verifyPhoneVerificationCode`,
      { phoneNumber, verificationCode },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.message;
  } catch (error) {
    console.error(
      "Error verifying OTP:",
      error.response?.data?.message || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to verify OTP");
  }
};

export const checkPhoneVerificationStatusService = async () => {
  try {
    const response = await axiosInstance.post(
      "api/users/checkPhoneVerificationStatus",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.message; // "Phone is verified"
  } catch (error) {
    console.error(
      "Error checking phone verification status:",
      error.response?.data?.message || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to check phone verification status"
    );
  }
};

export const checkEmailVerificationStatusService = async () => {
  try {
    const response = await axiosInstance.post(
      "api/users/checkEmailVerificationStatus",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data.message; // "Email is verified" or "Email is not verified"
  } catch (error) {
    console.error(
      "Error checking email verification status:",
      error.response?.data?.message || error.message
    );
    throw new Error(
      error.response?.data?.message ||
        "Failed to check email verification status"
    );
  }
};

export const sendPasswordUpdateVerificationCodeToEmail = async (email) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/users/sendpasswordcode",
      { email }
    );
    console.log("sdfsdfdss");
    return response.data;
  } catch (error) {
    if (error.response?.data?.message === "Email is required") {
      throw new Error("Please provide a valid email address.");
    } else if (
      error.response?.data?.message === "No user found with this email"
    ) {
      throw new Error("No user associated with the provided email address.");
    } else {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while sending the verification code."
      );
    }
  }
};


export const updatePasswordWithCodeService = async (email, verificationCode, newPassword) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/users/updatePasswordWithCode",
      { email, verificationCode, newPassword }
    );

    return response.data;
  } catch (error) {
    if (error.response?.data?.message === "Email is required") {
      throw new Error("Please provide a valid email address.");
    } else if (error.response?.data?.message === "Verification code is invalid or expired") {
      throw new Error("Invalid or expired verification code.");
    } else if (error.response?.data?.message === "User not found") {
      throw new Error("No user associated with the provided email address.");
    } else {
      throw new Error(
        error.response?.data?.message ||
          "An error occurred while updating the password."
      );
    }
  }
};
