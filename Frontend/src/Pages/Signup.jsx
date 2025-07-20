import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
        window.location.reload();
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      alert("Signup error");
      console.error(err);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#162013] overflow-x-hidden" style={{ fontFamily: "Manrope, 'Noto Sans', sans-serif" }}>
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="flex flex-col w-full max-w-[512px] py-5">
          <h2 className="text-white text-[28px] font-bold px-4 text-center pb-3 pt-5">Create your account</h2>
          <div className="px-4 py-3">
            <label className="flex flex-col w-full">
              <p className="text-white text-base font-medium pb-2">Name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="rounded-xl h-14 bg-[#21301c] border border-[#416039] text-white placeholder:text-[#a1c398] p-[15px]"
              />
            </label>
          </div>
          <div className="px-4 py-3">
            <label className="flex flex-col w-full">
              <p className="text-white text-base font-medium pb-2">Email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="rounded-xl h-14 bg-[#21301c] border border-[#416039] text-white placeholder:text-[#a1c398] p-[15px]"
              />
            </label>
          </div>
          <div className="px-4 py-3">
            <label className="flex flex-col w-full">
              <p className="text-white text-base font-medium pb-2">Password</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="rounded-xl h-14 bg-[#21301c] border border-[#416039] text-white placeholder:text-[#a1c398] p-[15px]"
              />
            </label>
          </div>
          <div className="flex px-4 py-3">
            <button onClick={handleSignup} className="flex-1 rounded-full h-12 px-5 bg-[#50d22c] text-[#162013] text-base font-bold">Sign up</button>
          </div>
          <p className="text-[#a1c398] text-sm text-center underline cursor-pointer" onClick={() => navigate("/login")}>Already have an account? Log in</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
