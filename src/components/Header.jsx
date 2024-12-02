import React, { useEffect, useState } from "react";
const API_KEY = "23102215-483401647597ecd040735b5ed"; // Replace with your Pixabay API key

const getImageForToday = (images) => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
  );
  return images[dayOfYear % images.length]; // Use modulo to cycle through images
};

const Header = ({ title, description, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [images, setImages] = useState([]);
  const [imageSrc, setImageSrc] = useState("");

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query); // Call onSearch to update the search query in the parent
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${API_KEY}&q=stock+photos&image_type=photo&per_page=200`
        );
        const data = await response.json();
        setImages(data.hits.map((hit) => hit.webformatURL)); // Store image URLs
      } catch (error) {
        console.error("Error fetching images from Pixabay:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const dailyImage = getImageForToday(images);
      setImageSrc(dailyImage);
    }
  }, [images]);

  return (
    <div className="relative">
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Header"
          className="w-full h-[60vh] object-cover object-bottom"
        />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div>
          <h1 className="text-white text-center text-2xl font-medium sm:text-4xl md:text-6xl py-4 px-6 w-full md:w-[70vw] sm:w-[80vw] mx-auto">
            {title}
          </h1>
          <p className="text-stone-300 px-10 w-full sm:w-[60vw] md:w-[40vw] text-xs sm:text-sm text-center mx-auto">
            {description}
          </p>
          <div className="flex relative justify-center items-center mt-4 p-4">
            <div className="flex items-center">
              <button className="absolute">
                <i className="ri-search-line text-2xl font-semibold ml-4 text-stone-300"></i>
              </button>
              <input
                type="search"
                placeholder="Search for stock photos..."
                className="w-full sm:w-[50vw] px-14 py-3 sm:py-4 rounded-full text-base"
                onChange={handleSearchChange} // Call handleSearchChange on input change
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;