import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import NavMenu from "../components/NavMenu";
import { useLocation } from "react-router-dom";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

const ImageModal = ({ isOpen, image, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative">
        <img src={image} alt="Enlarged" className="max-w-full max-h-full" />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

const API_KEY = "23102215-483401647597ecd040735b5ed"; // Replace with your Pixabay API key
const LATEST_API_URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&per_page=30&order=latest`;

const Photos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const imagesPerPage = 50; // Number of images to display per page
  const [images, setImages] = useState([]); // User-uploaded images
  const [fetchedImages, setFetchedImages] = useState([]); // Fetched images from Pixabay
  const [latestImages, setLatestImages] = useState([]); // Latest images from Pixabay
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(
    location.state?.searchTerm || ""
  );
  const isAdmin = true; // This should be set based on your authentication logic

  useEffect(() => {
    const storedImages =
      JSON.parse(localStorage.getItem("uploadedImages")) || [];
    setImages(storedImages);
    fetchLatestImages(); // Fetch latest images on component mount
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    if (searchTerm) {
      fetchImagesFromPixabay(searchTerm);
    } else {
      setFetchedImages([]);
    }
  }, [searchTerm]);

  const fetchLatestImages = async () => {
    try {
      const response = await fetch(LATEST_API_URL);
      const data = await response.json();
      setLatestImages(data.hits);
    } catch (error) {
      console.error("Error fetching latest images:", error);
    }
  };

  const fetchImagesFromPixabay = async (term) => {
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${term}&image_type=photo&per_page=30`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setFetchedImages(data.hits);
    } catch (error) {
      console.error("Error fetching images from Pixabay:", error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
    if (term) {
      fetchImagesFromPixabay(term); // Fetch images from Pixabay when there is a search term
    } else {
      setFetchedImages([]); // Clear fetched images if search term is empty
    }
  };

  const deleteImage = (index) => {
    const updatedImages = images.filter((_, imgIndex) => imgIndex !== index);
    setImages(updatedImages);
    localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
  };

  // Filter images based on search term
  const filteredImages = images.filter(
    (img) => img.keyword && img.keyword.toLowerCase().includes(searchTerm)
  );

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  // Pagination logic
  const handleNext = () => {
    console.log("Next button clicked");
    if (currentPage * imagesPerPage < fetchedImages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    console.log("Prev button clicked");
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate current images to display
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = fetchedImages.slice(
    indexOfFirstImage,
    indexOfLastImage
  );

  return (
    <>
      <Header
        imageSrc="https://cdn.pixabay.com/photo/2022/12/04/16/17/leaves-7634894_640.jpg"
        title="Instant Access to Thousands of High-Quality Images"
        description="Unlock the Power of Visual Storytelling with Our Extensive Library of High-Quality Stock Images"
        onSearch={handleSearch} // Pass the search handler to Header
      />
      <div className="py-6 px-4 sm:py-12 sm:px-8">
        <NavMenu />
        <div className="sm:mt-10">
          <h1 className="text-xl sm:text-2xl">
            High-Quality Stock Photos at Your Fingertips
          </h1>
          <p className="text-stone-500">
            Access High-Quality Stock Photos Instantly and Bring Your Vision to
            Life
          </p>
        </div>
        <div className="mt-6">
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 4 }}
          >
            <Masonry gutter="5px">
              {/* Display user-uploaded images */}
              {filteredImages.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img.image}
                    alt={img.keyword}
                    className="w-full h-auto rounded-lg cursor-pointer"
                    onClick={() => openModal(img.webformatURL)}
                  />
                  <div className="absolute inset-0 bg-black opacity-0 rounded-lg group-hover:opacity-30 transition-opacity duration-300 cursor-pointer"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-4 invisible group-hover:visible">
                    <h2 className="font-semibold text-white">{img.user}</h2>
                    <p className="text-stone-400">{img.keyword}</p>
                    <div className="flex items-center justify-between mt-2">
                      {isAdmin && (
                        <button onClick={() => deleteImage(index)} className="">
                          <i className="ri-delete-bin-line text-2xl bg-white text-black rounded-full p-2"></i>
                        </button>
                      )}
                      {/* Download Button */}
                      <div>
                        <a
                          href={img.image} // Use the image URL for downloading
                          download
                          className="mt-2 text-white rounded"
                        >
                          <i className="ri-download-line text-2xl bg-white text-black p-2 rounded-full"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Display fetched images from Pixabay */}
              {currentImages.map((img) => (
                <div key={img.id} className="relative group">
                  <img
                    src={img.webformatURL}
                    alt={img.tags}
                    className="w-full h-auto rounded-lg cursor-pointer"
                    onClick={() => openModal(img.webformatURL)}
                  />
                  <div className="absolute inset-0 bg-black opacity-0 rounded-lg group-hover:opacity-30 transition-opacity duration-300 cursor-pointer"></div>
                  <div className="absolute inset-0 flex flex-col justify-end p-4 leading-tight invisible group-hover:visible">
                    <div className="flex justify-between items-center">
                      <div>
                        <h2 className="font-semibold text-white">{img.user}</h2>
                        <p className="text-stone-300 font-light">{img.tags}</p>
                      </div>
                      {/* Download Button */}
                      <div>
                        <a
                          href={img.webformatURL} // Use the image URL for downloading
                          download
                          className=""
                        >
                          <i className="ri-download-line text-2xl bg-white text-black p-2 rounded-full"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Display latest images from Pixabay */}
              {searchTerm === "" &&
                latestImages.map((img) => (
                  <div key={img.id} className="relative group">
                    <img
                      src={img.webformatURL}
                      alt={img.tags}
                      className="w-full h-auto rounded-lg cursor-pointer"
                      onClick={() => openModal(img.webformatURL)}
                    />
                    <div className="absolute inset-0 bg-black opacity-0 rounded-lg group-hover:opacity-30 transition-opacity duration-300 cursor-pointer"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-4 leading-tight invisible group-hover:visible">
                      <div className="flex justify-between items-center">
                        <div>
                          <h2 className="font-semibold text-white">
                            {img.user}
                          </h2>
                          <p className="text-stone-300 font-light">
                            {img.tags}
                          </p>
                        </div>
                        {/* Download Button */}
                        <div>
                          <a
                            href={img.webformatURL} // Use the image URL for downloading
                            download
                            className=""
                          >
                            <i className="ri-download-line text-2xl bg-white text-black p-2 rounded-full"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </Masonry>
          </ResponsiveMasonry>
        </div>
      </div>
      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        image={selectedImage}
        onClose={closeModal}
      />
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="bg-black text-white rounded-full px-8 py-2"
        >
          <i className="ri-arrow-left-s-line pr-4"></i>
          Prev
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage * imagesPerPage >= fetchedImages.length}
          className="bg-black text-white rounded-full px-8 py-2"
        >
          Next
          <i className="ri-arrow-right-s-line pl-4"></i>
        </button>
      </div>
    </>
  );
};

export default Photos;
