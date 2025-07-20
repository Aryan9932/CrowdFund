// src/pages/AllProjectsFlipUp.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const AllProjectsFlipUp = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState("All");

  const fetchCampaigns = async (type = "All") => {
    setLoading(true);
    try {
      const url =
        type === "All"
          ? "http://localhost:5000/api/campaigns"
          : `http://localhost:5000/api/campaigns/type/${encodeURIComponent(type)}`;
      const res = await axios.get(url);
      setCampaigns(res.data);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
      setCampaigns([]); // fallback to empty
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns(selectedType);
  }, [selectedType]);

  const campaignTypes = [
    "All",
    "Donation Funding",
    "Reward Funding",
    "Equity Funding",
    "Debt Based Funding",
  ];

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#162013] overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 py-5">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 p-3">
            {campaignTypes.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedType(category)}
                className={`flex h-8 items-center justify-center gap-x-2 rounded-full pl-4 pr-2 ${
                  selectedType === category
                    ? "bg-[#8cd279] text-[#162013]"
                    : "bg-[#2e4328] text-white"
                }`}
              >
                <p className="text-sm font-medium">{category}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                </svg>
              </button>
            ))}
          </div>

          {/* Campaign Cards */}
          {loading ? (
            <p className="text-white text-center mt-10">Loading...</p>
          ) : campaigns.length === 0 ? (
            <p className="text-white text-center mt-10">No campaigns found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {campaigns.map((campaign, index) => (
                <motion.div
                  key={campaign._id}
                  initial={{ opacity: 0, rotateX: 90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <Link
                    to={`/campaign/${campaign._id}`}
                    className="flex h-full flex-col gap-4 rounded-lg bg-[#1f2a1b] p-3 shadow-md hover:shadow-lg transition"
                  >
                    <div
                      className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                      style={{
                        backgroundImage: `url(${
                          campaign.imageUrl || "https://via.placeholder.com/300x180"
                        })`,
                      }}
                    ></div>
                    <div>
                      <p className="text-white text-base font-semibold truncate">
                        {campaign.title}
                      </p>
                      <p className="text-[#a1c398] text-sm">
                        Goal: ₹{campaign.goalAmount}
                      </p>
                      <p className="text-[#a1c398] text-sm">
                        Likes: {campaign.likes}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProjectsFlipUp;
