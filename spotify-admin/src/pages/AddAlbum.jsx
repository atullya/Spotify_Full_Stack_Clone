import React, { useState } from "react";
import { assets } from "../assets/admin-assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

export default function AddAlbum() {
  const [image, setImage] = useState(null);
  const [albumTitle, setAlbumTitle] = useState("");
  const [albumDesc, setAlbumDesc] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [loading, setLoading] = useState(false);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", albumTitle);
      formData.append("desc", albumDesc);

      formData.append("image", image);
      formData.append("bgColor", bgColor);

      const response = await axios.post(
        `http://localhost:3000/api/album/add`,
        formData
      );
      if (response.data.success) {
        toast.success("Song Added");
        setAlbumTitle("");
        setAlbumDesc("");

        setImage(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error details:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        toast.error(`Error: ${error.response.data.message || "Unknown error"}`);
      } else if (error.request) {
        console.error("Request error:", error.request);
        toast.error("No response from server.");
      } else {
        console.error("General error:", error.message);
        toast.error("Request failed.");
      }
    }
    setLoading(false);
  };
  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-6 text-gray-600"
    >
      <div className="flex flex-col gap-4">
        <p className="text-lg font-medium">Upload Image</p>
        <input
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setImage(file);
            }
          }}
          type="file"
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image" className="cursor-pointer">
          <img
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            className="w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg"
            alt="Upload Preview"
          />
        </label>

        <div className="flex flex-col gap-2">
          <p className="text-lg font-medium">Add Album</p>
          <input
            onChange={(e) => setAlbumTitle(e.target.value)}
            value={albumTitle}
            className="bg-transparent border border-gray-400 p-2 rounded-md focus:outline-none focus:border-green-600 w-[min(40vw,250px)]"
            placeholder="Album Title"
            type="text"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-lg font-medium">Album Description</p>
          <input
            onChange={(e) => setAlbumDesc(e.target.value)}
            value={albumDesc}
            className="bg-transparent border border-gray-400 p-2 rounded-md focus:outline-none focus:border-green-600 w-[min(40vw,250px)]"
            placeholder="Album Description"
            type="text"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-lg font-medium">Background Color</p>
        <input
          onChange={(e) => setBgColor(e.target.value)}
          value={bgColor}
          className="w-10 h-10 border border-gray-400 rounded"
          type="color"
          required
        />
      </div>

      <button
        type="submit"
        className="text-base bg-black text-white py-2 px-6 mt-4 rounded hover:bg-gray-800 transition duration-300"
      >
        Add
      </button>
    </form>
  );
}
