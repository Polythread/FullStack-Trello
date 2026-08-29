import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../api/auth";

export const Signin = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: signin,
    onSuccess: (data) => {
      const token = data.data.token;
      localStorage.setItem("token", token);
      navigate("/organisation");
    },
  });

  function handleSubmit() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      alert("All fields should be filled!");
      return;
    }

    mutation.mutate({
      email,
      password,
    });
  }

  return (
    <div>
      <input placeholder="youemail@gmail.com" ref={emailRef} />

      <input placeholder="yourPassowrd..." ref={passwordRef} />

      <button onClick={handleSubmit}>Signin</button>
    </div>
  );
};
