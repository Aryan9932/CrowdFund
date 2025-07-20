import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []); // Run once on mount

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.reload(); // optional: navigate("/") instead
  };

  return (
    <header className="flex justify-between items-center px-10 py-3 bg-[#162013] text-white">
      <h1 onClick={() => navigate("/")} className="text-xl font-bold cursor-pointer">CrowdFund</h1>

      <nav className="flex items-center gap-6">
        <button onClick={() => navigate("/explore")} className="font-medium">Explore</button>
        <button onClick={() => navigate("/create")} className="font-medium">Create a Campaign</button>
        {isLoggedIn && (
          <button onClick={() => navigate("/my-campaigns")} className="font-medium">My Campaigns</button>
        )}
        {!isLoggedIn ? (
          <>
            <button onClick={() => navigate("/signup")} className="bg-green-500 text-black px-4 py-2 rounded-full font-bold">Sign Up</button>
            <button onClick={() => navigate("/login")} className="bg-[#2e4328] px-4 py-2 rounded-full font-bold">Log In</button>
          </>
        ) : (
          <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded-full font-bold">Logout</button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
