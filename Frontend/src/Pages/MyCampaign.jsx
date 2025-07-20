import React, { useEffect, useState } from 'react';
import Navbar from "../components/Navbar"; // ✅ Assuming same Navbar as Create
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion"; // ✅ Optional for smooth animations

const MyCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyCampaigns = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/campaigns/mycampaign", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!res.ok) throw new Error("Failed to fetch my campaigns");

        const data = await res.json();
        setCampaigns(data);
      } catch (err) {
        console.error(err.message);
        setError("Could not load your campaigns.");
      }
    };

    fetchMyCampaigns();
  }, []);

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#162013] overflow-x-hidden"
      style={{ fontFamily: "Manrope, 'Noto Sans', sans-serif" }}
    >
      <div className="layout-container flex flex-col grow h-full">
        <Navbar />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="px-40 py-5"
        >
          <h2 className="text-white text-[28px] font-bold px-4 pb-3">My Campaigns</h2>
          {error && <p className="text-red-400 px-4">{error}</p>}

          {campaigns.length === 0 ? (
            <p className="text-white px-4">No campaigns found.</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
              {campaigns.map((c) => (
                <motion.li
                  key={c._id}
                  className="border border-[#416039] bg-[#21301c] p-4 rounded-2xl shadow-md text-white"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-2">{c.title}</h3>
                  <p>Type: {c.type}</p>
                  <p>Goal: ₹{c.goalAmount}</p>
                  {c.imageUrl && (
                    <img
                      src={c.imageUrl}
                      alt={c.title}
                      className="w-full h-40 object-cover rounded mt-3"
                    />
                  )}
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MyCampaigns;
