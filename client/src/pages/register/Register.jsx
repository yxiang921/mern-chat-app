import React, { useState } from "react";
import useSignup from "../../hooks/useSignup";

const Register = () => {
  const { signup, formValidation, loading } = useSignup();

  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const validation = formValidation(inputs);
    if (!validation) {
      return;
    }
    signup(inputs);
  };

  return (
    <div className="flex flex-col items-center justify-center w-2/6 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500">YX ChatApp</span>
        </h1>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text text-gray-300">
                Full Name
              </span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full input input-bordered  h-12"
              value={inputs.fullname}
              onChange={(e) => {
                setInputs({ ...inputs, fullname: e.target.value });
              }}
            />
          </div>

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

          <div>
            <label className="label">
              <span className="text-base label-text text-gray-300">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-12"
              value={inputs.confirmPassword}
              onChange={(e) => {
                setInputs({ ...inputs, confirmPassword: e.target.value });
              }}
            />
          </div>

          {/* Gender Selection */}
          <div className="flex">
            <div className="form-control">
              <label className={`label gap-2 cursor-pointer`}>
                <span className="label-text text-gray-300">Male</span>
                <input
                  type="checkbox"
                  className="checkbox border-slate-900"
                  checked={inputs.gender === "male"}
                  onChange={() => {
                    setInputs({ ...inputs, gender: "male" });
                  }}
                />
              </label>
            </div>
            <div className="form-control">
              <label className={`label gap-2 cursor-pointer`}>
                <span className="label-text text-gray-300">Female</span>
                <input
                  type="checkbox"
                  className="checkbox border-slate-900"
                  checked={inputs.gender === "female"}
                  onChange={() => {
                    setInputs({ ...inputs, gender: "female" });
                  }}
                />
              </label>
            </div>
          </div>

          <a
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-gray-300"
            href="/login"
          >
            Already have an account?
          </a>

          <div>
            <button className="btn btn-block btn-sm mt-2 border border-slate-700 h-12">
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
