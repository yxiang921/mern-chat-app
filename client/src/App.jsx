import "./App.css";
import { Toaster } from "react-hot-toast";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    setAuthUser(JSON.parse(localStorage.getItem("chat-user")));
  }, []);

  const { authUser, setAuthUser } = useAuthContext();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Toaster />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Login />} />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/register"
          element={authUser ? <Navigate to={"/"} /> : <Register />}
        />
      </Routes>
    </div>
  );
}

export default App;
