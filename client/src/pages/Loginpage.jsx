import React, { useState, useEffect } from "react";
// import axios from "axios"; // Ensure axios is installed: npm install axios
import { useNavigate, Link } from "react-router-dom";
import { loginRoute, registerRoute } from "../utils/APIRoutes";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, email, password, confirmPassword } = values;
    if (!isLogin) {
      if (password !== confirmPassword) {
        alert("Password and Confirm Password should be same.");
        return false;
      }
      if (username.length < 3) {
        alert("Username should be greater than 3 characters.");
        return false;
      }
      if (email === "") {
        alert("Email is required.");
        return false;
      }
    }
    if (username === "" || password === "") {
      alert("Username and Password are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, email, password } = values;

      // Using fetch instead of axios to avoid dependency if not installed, 
      // but equivalent to axios.post
      const url = isLogin ? loginRoute : registerRoute;
      const body = isLogin ? { username, password } : { username, email, password };

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (data.status === false) {
          alert(data.msg);
        }
        if (data.status === true) {
          localStorage.setItem(
            "chat-app-user",
            JSON.stringify(data.user)
          );
          navigate("/");
        }
      } catch (error) {
        console.error("Error during authentication:", error);
        alert("Error connecting to server. Ensure backend is running.");
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center gap-4 items-center bg-[#131324]">
      <div className="bg-[#00000076] rounded-[2rem] p-[5rem] flex flex-col gap-8 w-full max-w-[500px]">
        <div className="flex items-center justify-center gap-4">
          <h1 className="text-white text-3xl font-bold uppercase">{isLogin ? "Login" : "Register"}</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
            min="3"
            className="p-4 bg-transparent border-[0.1rem] border-[#4e0eff] rounded-[0.4rem] text-white w-full text-lg focus:border-[#997af0] focus:outline-none"
          />
          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              className="p-4 bg-transparent border-[0.1rem] border-[#4e0eff] rounded-[0.4rem] text-white w-full text-lg focus:border-[#997af0] focus:outline-none"
            />
          )}
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="p-4 bg-transparent border-[0.1rem] border-[#4e0eff] rounded-[0.4rem] text-white w-full text-lg focus:border-[#997af0] focus:outline-none"
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={handleChange}
              className="p-4 bg-transparent border-[0.1rem] border-[#4e0eff] rounded-[0.4rem] text-white w-full text-lg focus:border-[#997af0] focus:outline-none"
            />
          )}
          <button type="submit" className="bg-[#4e0eff] text-white py-4 px-8 border-none font-bold cursor-pointer rounded-[0.4rem] text-lg uppercase hover:bg-[#4e0eff]">
            {isLogin ? "Log In" : "Create User"}
          </button>
          <span className="text-white uppercase text-center">
            {isLogin ? "Don't have an account ? " : "Already have an account ? "}
            <span className="text-[#4e0eff] font-bold cursor-pointer underline" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Register." : "Login."}
            </span>
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;