// src/pages/CampaignDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/campaigns/${id}`);
        setCampaign(res.data);
      } catch (err) {
        console.error("Error fetching campaign:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  if (loading) return <div className="text-white p-10">Loading...</div>;
  if (!campaign) return <div className="text-red-400 p-10">Campaign not found.</div>;

  const percentageFunded = Math.min(
    Math.floor((campaign.collectedAmount / campaign.goalAmount) * 100),
    100
  );

  return (
    <div className="min-h-screen bg-[#162013] text-white font-['Manrope','Noto Sans',sans-serif]">
      <main className="px-10 py-6 max-w-5xl mx-auto">
        {/* Title & Short Desc */}
        <div className="flex flex-col gap-2 mb-4">
          <button onClick={() => navigate(-1)} className="text-sm text-[#a1c398] underline mb-1">
            &larr; Back
          </button>
          <h1 className="text-3xl font-bold">{campaign.title}</h1>
          <p className="text-[#a1c398] text-sm">{campaign.description}</p>
        </div>

        {/* Image */}
        <div className="w-full rounded-xl overflow-hidden mb-4">
          <img
            src={campaign.imageUrl || "https://via.placeholder.com/600x300"}
            alt={campaign.title}
            className="w-full object-cover max-h-[400px]"
          />
        </div>

        {/* Progress */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex justify-between text-sm">
            <p>₹{campaign.collectedAmount} raised of ₹{campaign.goalAmount} goal</p>
            <p>{percentageFunded}% funded</p>
          </div>
          <div className="h-2 bg-[#416039] rounded-full overflow-hidden">
            <div className="h-2 bg-[#50d22c]" style={{ width: `${percentageFunded}%` }}></div>
          </div>
          <p className="text-sm text-[#a1c398]">Likes: {campaign.likes || 0}</p>
        </div>

        {/* About */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">About this project</h2>
          <p className="text-base">{campaign.description}</p>
        </div>

        {/* Reward */}
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-2">Reward</h2>
          <div className="flex flex-col md:flex-row items-stretch gap-4 rounded-xl bg-[#1f2a1b] p-4">
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <p className="text-white text-base font-bold mb-1">
                  {campaign.reward || "Early Supporter Reward"}
                </p>
                <p className="text-[#a1c398] text-sm">
                  Support the campaign and receive this reward.
                </p>
              </div>
              <button className="mt-4 w-fit bg-[#2e4328] px-4 py-2 rounded-full text-sm font-medium text-white">
                Pledge ₹{Math.floor(campaign.goalAmount / 10)}
              </button>
            </div>
            <div
              className="aspect-video w-full md:w-72 bg-center bg-cover rounded-xl"
              style={{
                backgroundImage: `url(${campaign.imageUrl || "https://via.placeholder.com/300"})`,
              }}
            ></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CampaignDetails;
