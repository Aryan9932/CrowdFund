import React from "react";
import { Route, Routes } from "react-router-dom";

import Create from "./Pages/Create";
import LandingPage from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Explore from "./Pages/Explore";
import CampaignDetails from "./Pages/CampaignDetails";
import MyCampaigns from "./Pages/MyCampaign";
import PaymentButton from "./components/PaymentButton";



const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/payment" element={<PaymentButton/>} />
        <Route path="/explore" element={<Explore />} />
         <Route path="/campaign/:id" element={<CampaignDetails />} />
         <Route path="/my-campaigns" element={<MyCampaigns />} />

        
 
       
      </Routes>
    </div>
  );
};

export default App;
