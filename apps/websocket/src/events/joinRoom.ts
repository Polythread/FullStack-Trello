import { BOARD } from "../store";
import type { CustomWebSocket } from "../types";
import { WsError } from "../utilis/wsError";

export const joinRoom = async (ws: CustomWebSocket, data: any) => {
  const userId = ws.user.id;
  const boardId = data.boardId;

  if (!boardId) {
    ws.send(JSON.stringify(new WsError("Board ID is required")));
    return;
  }

  if (!BOARD[boardId]) {
    BOARD[boardId] = [];
  }

  const alreadyJoined = BOARD[boardId].some((x) => x.id === userId);

  if (!alreadyJoined) {
    BOARD[boardId].push({ id: ws.user.id, ws });
  }

  BOARD[boardId].forEach(({ ws: clientWs }) => {
    clientWs.send(
      JSON.stringify({
        event: "JOIN_BOARD",
        userId,
      }),
    );
  });

  ws.send(
    JSON.stringify({
      event: "INITIAL_STATE",
      users: BOARD[boardId].filter((user) => user.id !== userId),
    }),
  );
};
