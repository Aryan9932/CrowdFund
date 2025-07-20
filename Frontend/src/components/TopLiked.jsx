// src/components/TopLiked.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const TopLiked = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopLiked = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/campaigns/topliked?limit=5");
        setCampaigns(res.data);
        console.log("Fetched campaigns:", res.data);
      } catch (err) {
        console.error("Error fetching top liked campaigns:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopLiked();
  }, []);

  return (
    <div className="px-10 md:px-40 flex flex-1 justify-center py-5 bg-[#162013] min-h-[300px]">
      <div className="flex flex-col max-w-[1050px] w-full">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Top Liked Projects
        </h2>

        {loading ? (
          <p className="text-white text-center">Loading...</p>
        ) : campaigns.length === 0 ? (
          <p className="text-white text-center">No top liked campaigns found.</p>
        ) : (
          <div
            className="flex overflow-x-auto gap-4 px-4 custom-scrollbar"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#416039 #162013",
              msOverflowStyle: "none"
            }}
          >
            <style>
              {`
                .custom-scrollbar::-webkit-scrollbar {
                  height: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: #162013;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background-color: #416039;
                  border-radius: 4px;
                }
              `}
            </style>
            {campaigns.map((campaign, index) => (
              <motion.div
                key={campaign._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                className="flex h-full flex-col gap-4 rounded-lg min-w-[240px] max-w-[260px] bg-[#1f2a1b] p-3 shadow-md"
              >
                <div
                  className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl"
                  style={{ backgroundImage: `url(${campaign.imageUrl || 'https://via.placeholder.com/300x180'})` }}
                ></div>
                <div>
                  <p className="text-white text-base font-semibold truncate">
                    {campaign.title}
                  </p>
                  <p className="text-[#a1c398] text-sm">Goal: ₹{campaign.goalAmount}</p>
                  <p className="text-[#a1c398] text-sm">Likes: {campaign.likes}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TopLiked;
