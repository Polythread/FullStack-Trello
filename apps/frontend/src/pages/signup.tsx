import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api/auth";

export const Signup = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      navigate("/signin");
    },
  });

  function handleSubmit() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      alert("All fields shouold be filled!");
      return;
    }

    mutation.mutate({
      email,
      password,
    });
  }

  return (
    <div>
      <input placeholder="youremail@gmail.com" ref={emailRef} />

      <input placeholder="yourpassword" ref={passwordRef} />

      <button onClick={handleSubmit}>Signup</button>
    </div>
  );
};
