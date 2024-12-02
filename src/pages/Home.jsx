import React from "react";
import Header from "../components/Header";
import Collections from "../components/Collections";
import TrendingPhotos from "../components/TrendingPhotos";
const Home = () => {
  return (
    <div>
      <Header
        imageSrc="https://cdn.pixabay.com/photo/2022/09/28/10/26/japanese-snowball-7484699_960_720.jpg" // Change this to your home header image path
        title="Explore and Download Beautiful Stock Photos Effortlessly" // Change this to your desired title for Home
        description="Browse, Select, and Download Premium Stock Photos with Ease" // Change this to your desired description for Home
      />
      <Collections />
      <TrendingPhotos />
    </div>
  );
};

export default Home;
