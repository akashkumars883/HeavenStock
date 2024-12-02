import React, { useState } from "react";

const UploadPage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // State for image preview
  const [keyword, setKeyword] = useState("");

  // Predefined tags
  const tags = ["Nature", "Technology", "People", "Animals", "Food", "Travel"];

  const handleImageChange = (file) => {
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        alert("Please upload a valid image (JPEG, PNG, GIF).");
        setImage(null);
        setPreview(null); // Reset preview
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        alert("File size exceeds 2MB. Please upload a smaller image.");
        setImage(null);
        setPreview(null); // Reset preview
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Set the preview URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInput = (e) => {
    handleImageChange(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image || !keyword) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    const uploadedImage = {
      keyword,
      image: preview, // Use the preview (Base64 encoded image)
    };

    // Store the uploaded image in local storage
    const uploadedImages =
      JSON.parse(localStorage.getItem("uploadedImages")) || [];
    uploadedImages.push(uploadedImage);
    localStorage.setItem("uploadedImages", JSON.stringify(uploadedImages));

    // Reset the form
    setImage(null);
    setKeyword("");
    setPreview(null); // Reset preview
    alert("Image uploaded successfully!");
  };

  return (
    <div className="py-6 px-4 sm:py-12">
      <h1 className="text-xl sm:text-5xl font-semibold text-center mt-20 mb-10 w-full sm:w-[60vw] mx-auto px-6">
        Capture. Upload. Inspire. Become Part of Our Creative Community!
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col justify-center items-center"
      >
        <div className="w-full sm:w-[60vw] h-[50vh] flex flex-col justify-center items-center border-4 border-stone-400 border-dashed rounded-3xl">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            required
            className="hidden"
            id="file-input"
          />
          <label
            htmlFor="file-input"
            className="cursor-pointer bg-black text-white px-8 py-3 rounded-full"
          >
            Select Image
          </label>
          <p className="mt-4 w-[55vw] text-center">
            Drag & Drop or browse to upload images
          </p>
        </div>
        {/* Guidelines Section */}
        <div className="mb-6 mt-6 w-full sm:w-[50vw] text-stone-500">
          <ul className="mb-8 flex flex-wrap justify-between">
            <div className="">
              <li>Supported formats: JPEG, PNG, GIF.</li>
              <li>Maximum file size: 2MB.</li>
            </div>
            <div>
              <li>Ensure the image is clear and of good quality.</li>
              <li>Avoid uploading images with watermarks or logos.</li>
            </div>
          </ul>
          <p className="text-sm text-center text-gray-600">
            Please follow these guidelines to ensure a smooth upload experience.
          </p>
        </div>
        {preview && ( // Conditionally render the image preview
          <img
            src={preview}
            alt="Image Preview"
            className="mt-4 sm:w-[30vw] w-full h-full object-contain rounded-lg"
          />
        )}
        <div className="flex flex-wrap justify-center mb-4 mt-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setKeyword(tag)}
              className={`m-2 px-4 py-2 rounded-full text-white ${keyword === tag ? 'bg-black' : 'bg-stone-400'}`}
            >
              {tag}
            </button>
          ))}
        </div>
        <button
          type="submit"
          className="bg-black text-white px-4 py-3 rounded-full block w-full sm:w-60"
        >
          Upload Image
        </button>
      </form>
    </div>
  );
};

export default UploadPage;