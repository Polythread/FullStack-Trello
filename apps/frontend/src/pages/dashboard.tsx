import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createOrg, getOrg } from "../api/organisation";

export const Dashboard = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const query = useQuery({ queryKey: ["organization"], queryFn: getOrg });

  const mutation = useMutation({
    mutationFn: createOrg,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organization"] });
    },
  });

  function handleSubmit() {
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;

    if (!name || !description) {
      alert("All fields should be filled");
      return;
    }

    mutation.mutate({
      name,
      description,
    });
  }

  return (
    <>
      <div>
        <input
          placeholder="name"
          ref={nameRef}
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
          Create Organization
        </button>
      </div>

      <div>
        <ul>
          {query.data?.orgs?.map((org) => (
            <li key={org.id}>
              {org.name} - {org.description}
              <button
                onClick={() => {
                  navigate(`/organization/${org.id}`);
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
