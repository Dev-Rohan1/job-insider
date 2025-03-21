import React from "react";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import JobListing from "../components/JobListing";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <JobListing />
    </>
  );
};

export default Home;
