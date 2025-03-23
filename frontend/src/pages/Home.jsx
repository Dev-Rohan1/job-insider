import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import JobListing from "../components/JobListing";
import Footer from "../components/Footer";
import Download from "../components/Download";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <JobListing />
      <Download />
      <Footer />
    </>
  );
};

export default Home;
