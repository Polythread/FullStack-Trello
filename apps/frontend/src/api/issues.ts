import type { Issue } from "@repo/common";
import axios from "axios";
import { BACKEND_URL } from "../config/constant";

const token = localStorage.getItem("token");

export const createIssue = async (sectionId: string, data: Issue) => {
  const res = await axios.post(`${BACKEND_URL}/api/issue/${sectionId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getIssues = async (sectionId: string) => {
  const res = await axios.get(`${BACKEND_URL}/api/issue/${sectionId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};
