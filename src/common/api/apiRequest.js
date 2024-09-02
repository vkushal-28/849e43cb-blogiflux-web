import axios from "axios";
import { lookInSession } from "../session";

const apiRequest = async (method, url, payload = null, config = {}) => {
  const userInSession = lookInSession("user");

  const userData = JSON.parse(userInSession);

  if (config == true) {
    config = {
      headers: { Authorization: `Bearer ${userData.access_token}` },
    };
  } else {
    config = {};
  }

  try {
    const response = await axios({
      method: method,
      url: url,
      data: payload,
      ...config, // Spread additional configuration options
    });
    return response; // Return the data directly
  } catch (error) {
    console.error("API Request Error:", error);
    // Handle the error as needed, or throw it to be handled elsewhere
    throw error;
  }
};

export default apiRequest;
