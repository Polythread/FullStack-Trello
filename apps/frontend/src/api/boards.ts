import axios from "axios";
import { BACKEND_URL } from "../config/constant";
import type { Board } from "@repo/common";

const token = localStorage.getItem("token");

export const createBoard = async (orgId: string, data: Board) => {
  const res = await axios.post(
    `${BACKEND_URL} / api / board / ${orgId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return res.data;
};

export const getAllBoard = async (orgId: string) => {
  const res = await axios.get(`${BACKEND_URL}/api/board/${orgId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
