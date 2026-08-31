import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBoard, getAllBoard } from "../api/boards";
import type { Board } from "@repo/common";

export const Organization = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const { orgId } = useParams();
  const navigate = useNavigate();

  const query = useQuery({
    queryKey: ["boards", orgId],
    queryFn: () => getAllBoard(orgId),
  });

  const mutation = useMutation({
    mutationFn: (data: Board) => createBoard(orgId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });

  function handleSubmit() {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

    if (!title || !description) {
      alert("All fields should be filled!");
      return;
    }

    mutation.mutate({
      title,
      description,
    });
  }

  return (
    <>
      <h1>Organization Page</h1>
      <div>
        <input
          placeholder="title"
          ref={titleRef}
          className="px-2 mx-1 border-2 border-black"
        />

        <input
          placeholder="description"
          ref={descriptionRef}
          className="px-2 mx-1 border-2 border-black"
        />

        <button
          onClick={handleSubmit}
          className="px-2 mx-1 border-2 border-black"
        >
          Create Button
        </button>
      </div>

      <div>
        <ul>
          {query.data?.boards.map((b) => (
            <li key={b.id}>
              {b.title} -{b.description}
              <button
                onClick={() => {
                  navigate(`/board/${b.id}`);
                }}
                className="px-2 mx-1 border-2 border-black"
              >
                Open
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
