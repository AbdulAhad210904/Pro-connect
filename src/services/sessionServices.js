import axiosInstance from "../utils/axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

// Get connected browsers service
export const getConnectedBrowsersService = async () => {
  try {
    const response = await axiosInstance.get("api/getConnectedBrowsers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data; 
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "An error occurred while fetching connected browser sessions."
    );
  }
};

// Disconnect session service
export const disconnectSessionService = async (sessionId) => {
    try {
      const response = await axiosInstance.post(
        "api/disconnectSessionData", 
        { sessionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return response.data; 
    } catch (error) {
      throw new Error(
        error.response?.data?.message || 
          "An error occurred while disconnecting the session."
      );
    }
  };