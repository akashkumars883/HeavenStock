import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

// Replace with your actual Pixabay API key
const API_KEY = "23102215-483401647597ecd040735b5ed";
const TRENDING_API_URL = `https://pixabay.com/api/?key=${API_KEY}&order=popular&per_page=20`;
const LATEST_API_URL = `https://pixabay.com/api/?key=${API_KEY}&order=latest&per_page=20`;

const TrendingPhotos = () => {
  const [data, setData] = useState({ img: "", i: 0 });
  const [images, setImages] = useState([]);

  const viewImage = (img, i) => {
    setData({ img, i });
  };

  const closeModal = () => {
    setData({ img: "", i: 0 });
  };

  // Fetch images from Pixabay API
  const fetchImages = async () => {
    try {
      const [trendingResponse, latestResponse] = await Promise.all([
        fetch(TRENDING_API_URL),
        fetch(LATEST_API_URL),
      ]);

      if (!trendingResponse.ok || !latestResponse.ok) {
        throw new Error("Failed to fetch images");
      }

      const trendingImages = await trendingResponse.json();
      const latestImages = await latestResponse.json();

      // Combine the images from both responses with user and tags
      const imageDetails = [
        ...trendingImages.hits.map((hit) => ({
          url: hit.largeImageURL,
          user: hit.user,
          tags: hit.tags.split(", "), // Split tags into an array
        })),
        ...latestImages.hits.map((hit) => ({
          url: hit.largeImageURL,
          user: hit.user,
          tags: hit.tags.split(", "), // Split tags into an array
        })),
      ];

      setImages(imageDetails);
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("Failed to load images. Please try again later."); // User-friendly message
    }
  };

  // Effect to fetch trending and latest images from Pixabay API
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="py-6 px-4 sm:py-12 sm:px-8">
      {data.img && (
        <div
          className="w-full h-full bg-black fixed flex justify-center items-center overflow-hidden"
          onClick={closeModal} // Close modal on background click
        >
          <img
            src={data.img}
            className="w-auto max-w-[90%] max-h-[90%] cursor-pointer"
          />
        </div>
      )}
      <h1 className="text-xl sm:text-2xl">
        Our curated trending and latest photos
      </h1>
      <p className="text-stone-500">
        High-Quality Stock Photos at Your Fingertips
      </p>
      <div className="mt-6">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}>
          <Masonry gutter="5px">
            {images.map((image, i) => (
              <div className="relative group" key={i}>
                <img
                  src={image.url}
                  style={{ width: "100%", display: "block" }}
                  alt=""
                  className="rounded-lg cursor-pointer"
                  onClick={() => viewImage(image.url, i)}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <h2 className="font-semibold text-white absolute bottom-9 left-4 invisible group-hover:visible">
                  {image.user}
                </h2>
                <p className="text-stone-300 font-light absolute bottom-4 left-4 invisible group-hover:visible">
                  Tags: {image.tags.join(", ")}
                </p>
              </div>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};

export default TrendingPhotos;