import React, { useState } from "react";
import useLogin from "../../hooks/useLogin";

const Login = () => {
  const { login, formValidation, loading } = useLogin();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validation = formValidation(inputs);

    if (!validation) {
      return;
    }
    login(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center w-2/6 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login <span className="text-blue-500">YX ChatApp</span>
        </h1>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label className="label p-2 ">
              <span className="text-base label-text text-gray-300">
                Username
              </span>
            </label>
            <input
              type="text"
              placeholder="johndoe"
              className="w-full input input-bordered h-12"
              value={inputs.username}
              onChange={(e) => {
                setInputs({ ...inputs, username: e.target.value });
              }}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text text-gray-300">
                Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-12"
              value={inputs.password}
              onChange={(e) => {
                setInputs({ ...inputs, password: e.target.value });
              }}
            />
          </div>

          <a
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-gray-300"
            href="/register"
          >
            Register An Account
          </a>

          <div>
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700 h-12"
              type="submit"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
