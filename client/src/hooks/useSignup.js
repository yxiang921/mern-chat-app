import { React, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullname,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });

      const result = await res.json();

      if (result.error) {
        throw new Error(result.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(result));
      setAuthUser(result);
      toast.success("Register Account Successful");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formValidation = ({
    fullname,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    if (!fullname || !username || !password || !confirmPassword || !gender) {
      toast.error("Please Fill In All The Required Fields");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Password Not Match");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password Should Atleast 6 Characters");
      return false;
    }

    return true;
  };

  return { signup, formValidation, loading };
};

export default useSignup;
