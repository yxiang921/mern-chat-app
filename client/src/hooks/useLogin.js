import { React, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();

  const login = async ({ username, password }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await res.json();

      if (result.error) {
        throw new Error(result.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(result));
      setAuthUser(result);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formValidation = ({ username, password }) => {
    if (!username || !password) {
      toast.error("Please Fill In All The Required Fields");
      return false;
    }

    return true;
  };

  return { login, formValidation, loading };
};

export default useLogin;
