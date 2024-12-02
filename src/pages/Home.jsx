import React from "react";
import Header from "../components/Header";
import Collections from "../components/Collections";
import TrendingPhotos from "../components/TrendingPhotos";
const Home = () => {
  return (
    <div>
      <Header
        imageSrc="src/assets/japanese-snowball-7484699_1920.jpg" // Change this to your home header image path
        title="Explore and Download Beautiful Stock Photos Effortlessly" // Change this to your desired title for Home
        description="Browse, Select, and Download Premium Stock Photos with Ease" // Change this to your desired description for Home
      />
      <Collections />
      <TrendingPhotos />
    </div>
  );
};

export default Home;
