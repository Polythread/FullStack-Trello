import axios from "axios";
import { BACKEND_URL } from "../config/constant";
import type { Organization } from "@repo/common";

const token = localStorage.getItem("token");

export const createOrg = async (data: Organization) => {
  const res = await axios.post(`${BACKEND_URL}/api/organisation`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getOrg = async () => {
  const res = await axios.get(`${BACKEND_URL}/api/organisation`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
