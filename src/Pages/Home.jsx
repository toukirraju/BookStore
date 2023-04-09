import React from "react";
import BooksGrid from "../components/BooksGrid";
import FilterSection from "../components/FilterSection";

const Home = () => {
  return (
    <main className="py-12 px-6 2xl:px-6 container">
      <div className="order-2 xl:-order-1">
        <FilterSection />
        <BooksGrid />
      </div>
    </main>
  );
};

export default Home;
