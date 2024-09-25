import axios from "axios";

export const axiosInstance = async (method, endpoint, payload) => {
  try {
    console.log(method,endpoint,payload)
    console.log("jkljds")
    const response = await axios({
      method,
      url: endpoint,
      data: payload,
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      
    });
    
    return response.data;
  } catch (error) {
    return error;
  }
};
