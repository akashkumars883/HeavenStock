import React, { useState, useEffect } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const API_KEY = "23102215-483401647597ecd040735b5ed";
const TRENDING_API_URL = `https://pixabay.com/api/?key=${API_KEY}&order=popular&per_page=20`;

const TrendingPhotos = ({ searchQuery }) => {
  const [data, setData] = useState({ img: "", i: 0 });
  const [images, setImages] = useState([]);

  const viewImage = (img, i) => {
    setData({ img, i });
  };

  const closeModal = () => {
    setData({ img: "", i: 0 });
  };

  const fetchImages = async () => {
    try {
      // Clear images before fetching new ones
      setImages([]);

      const url = searchQuery 
        ? `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(searchQuery)}&per_page=20`
        : TRENDING_API_URL;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch images: ${response.status} ${response.statusText}`);
      }

      const imagesData = await response.json();
      console.log("Fetched images data:", imagesData); // Debugging statement

      // Check if there are hits
      if (imagesData.hits && imagesData.hits.length > 0) {
        const imageDetails = imagesData.hits.map((hit) => ({
          id: hit.id, // Use a unique identifier if available
          url: hit.largeImageURL,
          user: hit.user,
          tags: hit.tags.split(", "), // Split tags into an array
        }));

        setImages(imageDetails);
      } else {
        console.log("No images found for the search query."); // Debugging statement
        setImages([]); // Clear images if no hits
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("Failed to load images. Please try again later."); // User-friendly message
    }
  };

  useEffect(() => {
    fetchImages();
  }, [searchQuery]); // Fetch images whenever searchQuery changes

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
            alt="Enlarged view" // Added alt text for accessibility
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
            {images.length > 0 ? (
              images.map((image) => (
                <div className="relative group" key={image.id}> {/* Use image.id as key */}
                  <img
                    src={image.url}
                    style={{ width: "100%", display: "block" }}
                    alt={`Photo by ${image.user}`} // Added meaningful alt text
                    className="rounded-lg cursor-pointer"
                    onClick={() => viewImage(image.url, image.id)}
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <h2 className="font-semibold text-white absolute bottom-9 left -4 invisible group-hover:visible">
                    {image.user}
                  </h2>
                  <p className="text-stone-300 font-light absolute bottom-4 left-4 invisible group-hover:visible">
                    Tags: {image.tags.join(", ")}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-stone-500"> No images found for the current search query. Please try a different search.</p>
            )}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};

export default TrendingPhotos;