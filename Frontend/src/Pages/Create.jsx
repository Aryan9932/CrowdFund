import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Create = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    description: "",
    reward: "",
    goalAmount: "",
    collectedAmount: "",
    imageUrl: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Campaign Created Successfully!");
        setFormData({
          type: "",
          title: "",
          description: "",
          reward: "",
          goalAmount: "",
          collectedAmount: "",
          imageUrl: ""
        });
        navigate("/");
      } else {
        alert(result.message || "Failed to create campaign.");
      }
    } catch (err) {
      console.error("Error submitting campaign:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#162013] overflow-x-hidden"
      style={{ fontFamily: "Manrope, 'Noto Sans', sans-serif" }}
    >
      <div className="layout-container flex flex-col grow h-full">
        <Navbar />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-40 py-5 flex justify-center"
        >
          <div className="max-w-[960px] w-full flex flex-col gap-3">
            <h2 className="text-white text-[28px] font-bold px-4 pb-3 pt-5">Campaign Setup</h2>

            {/* Category */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="px-4 py-3 max-w-[480px]"
            >
              <label className="flex flex-col w-full">
                <p className="text-white text-base font-medium pb-2">Category</p>
                <select
                  name="type"
                  onChange={handleChange}
                  value={formData.type}
                  className="rounded-xl h-14 bg-[#21301c] border border-[#416039] text-white p-4"
                >
                  <option value="">Select a category</option>
                  <option value="medical">Donation</option>
                  <option value="education">Reward Based</option>
                  <option value="startup">Equity-Based</option>
                  <option value="ngo">Debt-Based</option>
                </select>
              </label>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="px-4 py-3 max-w-[480px]"
            >
              <label className="flex flex-col w-full">
                <p className="text-white text-base font-medium pb-2">Title</p>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="rounded-xl h-14 bg-[#21301c] border border-[#416039] text-white p-4"
                  placeholder="Campaign Title"
                />
              </label>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="px-4 py-3 max-w-[720px]"
            >
              <label className="flex flex-col w-full">
                <p className="text-white text-base font-medium pb-2">Description</p>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="rounded-xl min-h-[120px] bg-[#21301c] border border-[#416039] text-white p-4"
                  placeholder="Describe your campaign..."
                />
              </label>
            </motion.div>

            {/* Reward */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="px-4 py-3 max-w-[480px]"
            >
              <label className="flex flex-col w-full">
                <p className="text-white text-base font-medium pb-2">Reward</p>
                <input
                  name="reward"
                  value={formData.reward}
                  onChange={handleChange}
                  className="rounded-xl h-14 bg-[#21301c] border border-[#416039] text-white p-4"
                  placeholder="Mention any donor reward"
                />
              </label>
            </motion.div>

            {/* Goal Amount */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="px-4 py-3 max-w-[480px]"
            >
              <label className="flex flex-col w-full">
                <p className="text-white text-base font-medium pb-2">Funding Goal (INR)</p>
                <input
                  name="goalAmount"
                  value={formData.goalAmount}
                  onChange={handleChange}
                  type="number"
                  className="rounded-xl h-14 bg-[#21301c] border border-[#416039] text-white p-4"
                  placeholder="Enter goal amount"
                />
              </label>
            </motion.div>

            {/* Collected Amount */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="px-4 py-3 max-w-[480px]"
            >
              <label className="flex flex-col w-full">
                <p className="text-white text-base font-medium pb-2">Collected Amount (INR)</p>
                <input
                  name="collectedAmount"
                  value={formData.collectedAmount}
                  onChange={handleChange}
                  type="number"
                  className="rounded-xl h-14 bg-[#21301c] border border-[#416039] text-white p-4"
                  placeholder="Amount collected so far"
                />
              </label>
            </motion.div>

            {/* Image URL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="px-4 py-3 max-w-[720px]"
            >
              <label className="flex flex-col w-full">
                <p className="text-white text-base font-medium pb-2">Image URL</p>
                <input
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="rounded-xl h-14 bg-[#21301c] border border-[#416039] text-white p-4"
                  placeholder="https://example.com/image.jpg"
                />
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="flex px-4 py-3 justify-end"
            >
              <button
                onClick={handleNext}
                className="rounded-full bg-[#50d22c] text-[#162013] font-bold text-sm h-10 px-6"
              >
                Next
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Create;
