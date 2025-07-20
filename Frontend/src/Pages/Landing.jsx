import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import HeroImage from '../assets/image.png';
import { useNavigate } from "react-router-dom";
import { ChevronRight, Target, DollarSign, Users, Globe, Lightbulb, Shield, Heart, TrendingUp, Award, Play, ArrowRight, CheckCircle } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // Stats Data
  const stats = [
    { number: "50,000+", label: "Successful Projects", icon: Target },
    { number: "$100M+", label: "Funds Raised", icon: DollarSign },
    { number: "1M+", label: "Active Backers", icon: Users },
    { number: "180+", label: "Countries", icon: Globe }
  ];

  const features = [
    {
      icon: Lightbulb,
      title: "Creative Freedom",
      description: "Control your project with flexible funding and creative tools.",
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Bank-level security and fraud protection.",
      gradient: "from-blue-400 to-purple-500"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Global community of creators and supporters.",
      gradient: "from-green-400 to-blue-500"
    },
    {
      icon: TrendingUp,
      title: "Smart Analytics",
      description: "Optimize your campaign with real-time insights.",
      gradient: "from-purple-400 to-pink-500"
    }
  ];

  const howItWorks = [
    { step: "1", title: "Create Your Campaign", description: "Set up your project with visuals and funding goals.", icon: Lightbulb },
    { step: "2", title: "Build Your Community", description: "Connect with backers through sharing.", icon: Users },
    { step: "3", title: "Launch & Promote", description: "Go live and drive support.", icon: TrendingUp },
    { step: "4", title: "Achieve Success", description: "Receive funding and deliver results.", icon: Award }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#171f14] overflow-x-hidden" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-cover bg-center bg-no-repeat min-h-[480px] flex flex-col items-center justify-center gap-6 rounded-xl p-4 mx-6 my-8"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6)), url(${HeroImage})`
        }}
      >
        <div className="flex flex-col gap-2 text-center max-w-3xl">
          <h1 className="text-white text-4xl font-black leading-tight tracking-tight">
            Empowering Creators, Fueling Innovation
          </h1>
          <p className="text-white text-base font-normal">
            FundIt is a crowdfunding platform designed to connect creators with backers who believe in their vision.
            We provide the tools and support to bring your creative projects to life, from concept to completion.
          </p>
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 pb-10">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`text-center transition-all ${currentStat === i ? "scale-110" : "scale-100 opacity-70"}`}>
              <div className="flex items-center justify-center mb-2">
                <Icon className="w-8 h-8 text-[#8cd279]" />
              </div>
              <div className="text-2xl font-bold text-white">{stat.number}</div>
              <div className="text-[#a4be9d]">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Mission Section */}
      <div className="text-center px-6 pb-10">
        <h2 className="text-white text-[22px] font-bold pb-3">Our Mission</h2>
        <p className="text-white text-base font-normal max-w-3xl mx-auto">
          At FundIt, we believe in the power of creativity and the potential of every idea. Our mission is to provide a platform 
          where creators can find the resources and community support they need to succeed.
        </p>
      </div>

      {/* How it Works Section */}
      <section className="px-6 pb-12">
        <h2 className="text-2xl font-bold text-white text-center pb-6">How FundIt Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {howItWorks.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                data-animate
                id={`step-${i}`}
                className={`p-6 bg-[#1f2a1b] border border-[#8cd279]/30 rounded-xl text-center transition-all duration-700 ${
                  isVisible[`step-${i}`] ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                <div className="mb-4">
                  <Icon className="w-10 h-10 text-[#8cd279]" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-[#a4be9d]">{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 pb-12">
        <h2 className="text-2xl font-bold text-white text-center pb-6">Why Choose FundIt?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                data-animate
                id={`feature-${i}`}
                className={`p-6 bg-[#1f2a1b] border border-[#8cd279]/30 rounded-xl transition-all duration-700 ${
                  isVisible[`feature-${i}`] ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
                }`}
              >
                <div className={`w-14 h-14 mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br ${feature.gradient}`}>
                  <Icon className="text-white w-6 h-6" />
                </div>
                <h3 className="text-white text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-[#a4be9d]">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call To Action */}
      <section className="text-center px-6 py-12">
        <h2 className="text-white text-[22px] font-bold pb-3">Get Started Today</h2>
        <p className="text-[#a4be9d] max-w-xl mx-auto pb-4">
          Join thousands of creators who are turning ideas into reality.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button onClick={() => navigate("/create")} className="rounded-full h-10 px-5 bg-[#8cd279] text-[#171f14] text-sm font-bold">
            Start a Campaign
          </button>
          <button onClick={() => navigate("/explore")} className="rounded-full h-10 px-5 bg-[#2f402b] text-white text-sm font-bold">
            Browse Projects
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#101510] px-6 py-10 text-center">
        <div className="flex flex-wrap justify-center gap-6 pb-4">
          <a className="text-[#a4be9d]" href="#">About</a>
          <a className="text-[#a4be9d]" href="#">Contact</a>
          <a className="text-[#a4be9d]" href="#">Terms of Service</a>
          <a className="text-[#a4be9d]" href="#">Privacy Policy</a>
        </div>
        <div className="text-[#a4be9d] flex justify-center items-center gap-2">
          <CheckCircle className="w-4 h-4" />
          <span>© 2024 FundIt. Trusted by 50,000+ creators</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
