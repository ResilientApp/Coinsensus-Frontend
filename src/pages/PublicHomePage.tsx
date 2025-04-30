import React, { useState } from 'react';
import imageToAdd from "./coinsensus_illustration.svg";
import StatCard from '../components/StatCard';
import GroupItem from '../components/GroupItem';
import { TrendingUp, Users, CreditCard, ShieldCheck, TimerReset, Wallet } from 'lucide-react';
import ActivityPage from './ActivityPage';
import { useNavigate } from 'react-router-dom';
import "./HomePage.css";
import { Menu, X } from "lucide-react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import ClickSpark from './ClickSpark';

const PublicHomePage = ({ onLoginClick }: { onLoginClick: () => void }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleGetStartedClick = () => {
    navigate('/add-expense');
  }

  return (
    <ClickSpark sparkColor='green' sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
    <div className="min-h-screen bg-gradient-to-br from-white via-teal-50 to-teal-100 flex flex-col justify-center items-center text-center px-4">
      <nav id="nav" className=" flex items-center justify-between py-4 px-6  shadow-md relative" style={{ borderRadius: '2px', boxShadow: '200px', position: 'sticky' }}>
        <div className="text-xl font-bold" style={{ color: 'white' }}>Coinsensus</div>

        {/* Desktop links */}
        <div className="hidden sm:flex space-x-6 text-sm text-white" style={{ fontSize: '18px' }}>
          <a
            href="#features" className="hover:scale-110 hover:underline underline-offset-4 transition-all duration-300 ease-in-out" style={{ textDecorationColor: 'yellow' }}
          >
            Features
          </a>

          <a href="#about" className="hover:scale-110 hover:underline underline-offset-4 transition-all duration-300 ease-in-out" style={{ textDecorationColor: 'yellow' }}>About</a>
          <a href="#contact" className="hover:scale-110 hover:underline underline-offset-4 transition-all duration-300 ease-in-out" style={{ textDecorationColor: 'yellow' }}>Contact</a>
        </div>

        {/* Login button (always visible) */}
        <button
          onClick={onLoginClick}
          className="hidden sm:block  text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-700 transition"
          style={{ fontSize: '18px' }}
        >
          Login / Sign Up
        </button>

        {/* Mobile menu toggle */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden text-teal-700">
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile menu dropdown */}
        {menuOpen && (
          <div className="absolute top-16 left-0 w-full bg-white border-t border-gray-200 flex flex-col items-center space-y-4 py-4 sm:hidden z-10">
            <a href="#features" className="text-gray-700 hover:text-teal-600">Features</a>
            <a href="#about" className="text-gray-700 hover:text-teal-600">About</a>
            <a href="#contact" className="text-gray-700 hover:text-teal-600">Contact</a>
            <button
              onClick={onLoginClick}
              className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition"
            >
              Login / Sign Up
            </button>
          </div>
        )}
      </nav>

      <div className="max-w-2xl">
        <img
          src={imageToAdd}
          alt="Group expenses illustration"
          className="w-64 mx-auto mb-6"
          style={{ alignContent: 'center', marginTop: '180px' }}
        />
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-teal-600">Coinsensus</span> 💸
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Simplifying group expenses with <span className="font-semibold text-teal-700">decentralized trust</span>.
        </p>
        {/* <button onClick={handleGetStartedClick} className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition">
          Get Started
        </button> */}
        <button
          onClick={onLoginClick}
          className="px-5 py-3 bg-teal-600 text-white text-lg rounded-full shadow hover:bg-teal-700 transition duration-300"
        >
          {/* Login / Sign Up */}
          Get Started
        </button>
      </div>

      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-16">
        <div className="p-6 rounded-2xl shadow-md border hover:shadow-xl transition">
          <ShieldCheck size={28} className="mx-auto text-indigo-600 mb-3" />
          <h3 className="font-semibold text-lg">Secure & Private</h3>
          <p className="text-sm text-gray-600">Blockchain-powered backend ensures immutable records and tamper-proof trust.</p>
        </div>
        <div className="p-6 rounded-2xl shadow-md border hover:shadow-xl transition">
          <Wallet size={28} className="mx-auto text-indigo-600 mb-3" />
          <h3 className="font-semibold text-lg">Automated Balances</h3>
          <p className="text-sm text-gray-600">Real-time balance updates across group expenses without manual calculations.</p>
        </div>
        <div className="p-6 rounded-2xl shadow-md border hover:shadow-xl transition">
          <TimerReset size={28} className="mx-auto text-indigo-600 mb-3" />
          <h3 className="font-semibold text-lg">Always Synced</h3>
          <p className="text-sm text-gray-600">No refresh needed. Every action reflects instantly across your groups.</p>
        </div>
      </div>
      {/* About Section */}
      <section id="about" className="py-20 w-full px-6">
        <div className="max-w-4xl mx-auto text-center" >
          <h2 className="text-3xl sm:text-4xl font-bold text-teal-700 mb-6">About Coinsensus</h2>
          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            Coinsensus was developed to address the frustrations people face when managing shared expenses — especially in group travel, roommate situations, or collaborative projects.
            While apps like Splitwise help with basic splitting, they often rely on centralized control, lack transparency, or don’t accommodate custom rules or decentralized decision-making.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-6 text-justify">
            Coinsensus reimagines group finance by focusing on <span className="font-semibold text-teal-700">decentralized trust</span>, allowing all members to track, approve, and settle expenses fairly — without relying on a single party’s accuracy.
            It blends intuitive design with strong accountability, empowering groups to manage money transparently and efficiently.
          </p>
        </div>
      </section>

      <section className="py-20 w-full px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-teal-700 mb-6">Vision & Technology</h2>
          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            Coinsensus isn’t just another expense tracker — it’s a decentralized financial coordination layer designed with the resilience of blockchain technology. Inspired by the cutting-edge research at UC Davis, Coinsensus is powered by the <span className="font-semibold text-teal-700">ResilientDB</span> ecosystem, enabling high-throughput consensus protocols like HotStuff and Streamlet to manage and verify group financial data.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-6 text-justify">
            The platform ensures <span className="font-semibold text-teal-700">Byzantine fault tolerance</span>, meaning your expense records stay secure and accurate even in the face of malicious activity. Through a consensus-first architecture, Coinsensus guarantees that every transaction — whether it's a bill split or a debt settlement — is approved by a quorum of group members and written immutably.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-6 text-justify">
            Coinsensus redefines trust for financial collaboration — where every group becomes a self-governing economic entity without depending on intermediaries. It is an open, research-driven initiative that aims to revolutionize how we coordinate and reach agreements in shared financial responsibilities.
          </p>
        </div>
      </section>
      {/* Footer */}
      {/* <footer className="w-full py-4 bg-white text-sm text-gray-500 border-t border-gray-200" style={{ width: '1527px' }}>
        <div className="max-w-4xl mx-auto flex justify-between items-center px-4">
          <span>© {new Date().getFullYear()} Coinsensus. All rights reserved.</span>
          <div className="space-x-4">
            <a href="#privacy" className="hover:text-teal-600">Privacy</a>
            <a href="#terms" className="hover:text-teal-600">Terms</a>
            <a href="#contact" className="hover:text-teal-600">Contact</a>
          </div>
        </div>
      </footer> */}
      <footer className="w-full py-4 bg-white text-sm text-gray-500 border-t border-gray-200">
        <div className="w-full max-w-[90rem] mx-auto px-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <span>© {new Date().getFullYear()} Coinsensus. All rights reserved.</span>
          <div className="space-x-4">
            <a href="#privacy" className="hover:text-teal-600">Privacy</a>
            <a href="#terms" className="hover:text-teal-600">Terms</a>
            <a href="#contact" className="hover:text-teal-600">Contact</a>
          </div>
        </div>
      </footer>
    </div >
    </ClickSpark>

  );
};

export default PublicHomePage;
