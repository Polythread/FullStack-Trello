import axios from "axios";
import { BACKEND_URL } from "../config/constant";

type SignupPayload = {
  email: string;
  password: string;
};

type SigninPayload = {
  email: string;
  password: string;
};

type SigninResponse = {
  data: {
    token: string;
  };
};

export const signup = async (data: SignupPayload) => {
  const response = await axios.post(`${BACKEND_URL}/api/auth/signup`, data);
  return response.data;
};

export const signin = async (data: SigninPayload): Promise<SigninResponse> => {
  const response = await axios.post(`${BACKEND_URL}/api/auth/login`, data);
  return response.data;
};
