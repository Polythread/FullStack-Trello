import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSection, getSections } from "../api/sections";
import type { Issue, Section } from "@repo/common";
import { createIssue } from "../api/issues";
import { SectionColumn } from "../components/sectionColumn";

export const Board = () => {
  const [live, setLive] = useState([]);
  const { boardId } = useParams();
  const queryClient = useQueryClient();
  const sectionTitleRef = useRef<HTMLInputElement | null>(null);
  const issueTitleRef = useRef<HTMLInputElement | null>(null);
  const issueDescriptionRef = useRef<HTMLInputElement | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const sectionQuery = useQuery({
    queryFn: () => getSections(boardId),
    queryKey: ["sections", boardId],
  });

  const sectionMutation = useMutation({
    mutationFn: (data: Section) => createSection(boardId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sections"] });
    },
  });

  const firstSectionId = sectionQuery.data?.sections?.[0]?.id;

  const issueMutation = useMutation({
    mutationFn: (data: Issue) => createIssue(firstSectionId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["issues", firstSectionId] });
    },
  });

  const token = localStorage.getItem("token");
  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8000/?token=${token}`);
    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({ event: "JOIN_BOARD", data: { boardId } }));
    };

    ws.onmessage = (ev) => {
      const parsed = JSON.parse(ev.data);

      if (parsed.event === "INITIAL_STATE") {
        setLive(parsed.users);
      }

      if (parsed.event === "JOIN_BOARD") {
        setLive((u) => [...u, { id: parsed.userId }]);
      }

      if (parsed.event === "LEAVE_BOARD") {
        setLive((live) => live.filter((x) => x.id !== parsed.userId));
      }

      if (parsed.event === "MOVE_ISSUE") {
        queryClient.invalidateQueries({
          queryKey: ["issues", parsed.data.fromSectionId],
        });
        queryClient.invalidateQueries({
          queryKey: ["issues", parsed.data.toSectionId],
        });
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <div className="flex space-x-4">
        <input
          placeholder="issue title"
          className="px-2 mx-1 border-2 border-black"
          ref={issueTitleRef}
        />
        <input
          placeholder="issue description"
          className="px-2 mx-1 border-2 border-black"
          ref={issueDescriptionRef}
        />
        <button
          className="px-2 mx-1 border-2 border-black"
          onClick={() => {
            issueMutation.mutate({
              title: issueTitleRef.current.value,
              description: issueDescriptionRef.current.value,
            });

            issueTitleRef.current.value = "";
            issueDescriptionRef.current.value = "";
          }}
        >
          Create Issue
        </button>
        <input
          placeholder="section title ..."
          className="px-2 mx-1 border-2 border-black"
          ref={sectionTitleRef}
        />
        <button
          className="px-2 mx-1 border-2 border-black"
          onClick={() => {
            sectionMutation.mutate({
              title: sectionTitleRef.current.value,
            });
            sectionTitleRef.current.value = "";
          }}
        >
          Create Section
        </button>
        <div>Currently Live - {JSON.stringify(live.map((x) => x.id))}</div>
      </div>
      <div className="flex">
        {sectionQuery.data?.sections?.map((s, index) => (
          <SectionColumn
            key={s.id}
            section={s}
            index={index}
            sections={sectionQuery.data.sections}
            ws={wsRef.current}
          />
        ))}
      </div>
    </>
  );
};
