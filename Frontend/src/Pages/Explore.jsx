import React from "react";
import Navbar from "../components/Navbar";
import TopLiked from "../components/TopLiked";
import AllProjects from "../components/AllProjects";

const Explore = () => {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#162013] font-[Manrope,\_Noto\_Sans,sans-serif] overflow-x-hidden">
      <div className="flex h-full grow flex-col">
        {/*  */}
        <Navbar />
        <TopLiked />
        <AllProjects/>
      </div>
    </div>
  );
};

export default Explore;
