import axios from "axios";
import { BACKEND_URL } from "../config/constant";
import type { Section } from "@repo/common";

const token = localStorage.getItem("token");

export const createSection = async (boardId: string, data: Section) => {
  const res = await axios.post(`${BACKEND_URL}/api/section/${boardId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getSections = async (boardId: string) => {
  const res = await axios.get(`${BACKEND_URL}/api/section/${boardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};
