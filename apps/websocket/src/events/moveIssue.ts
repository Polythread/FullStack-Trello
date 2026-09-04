import type { CustomWebSocket } from "../types";
import { prisma } from "@repo/db";
import { WsError } from "../utilis/wsError";
import { BOARD } from "../store";

export const moveIssue = async (ws: CustomWebSocket, data: any) => {
  const { issueId, fromSectionId, toSectionId } = data;

  const updated = await prisma.issue.update({
    where: {
      id: issueId,
    },
    data: { sectionId: toSectionId },
  });

  const boardId = updated.boardId;

  if (!boardId) {
    ws.send(JSON.stringify(new WsError("Board ID is required")));
    return;
  }

  if (!BOARD[boardId]) {
    BOARD[boardId] = [];
  }

  BOARD[boardId].forEach(({ ws: clientWs }) => {
    clientWs.send(
      JSON.stringify({
        event: "MOVE_ISSUE",
        data: {
          fromSectionId,
          toSectionId,
        },
      }),
    );
  });
};
