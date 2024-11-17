import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios"; // Make sure axios is imported

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbum = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/album/list");
      console.log("API Response:", response.data); // Log the response data

      if (response.data) {
        setData(response.data.album);
      } else {
        toast.error("No albums found");
      }
    } catch (error) {
      console.error("Error fetching albums:", error); // Log the error
      toast.error("Error Occurred");
    }
  };

  useEffect(() => {
    fetchAlbum();
  }, []);

  return (
    <div>
      <p>All Albums</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Title</b>
          <b>Description</b>
          <b>Album Color</b>
          <b>Action </b>
        </div>
        {data.map((v, i) => {
          return (
            <div
              key={i}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
            >
              <img src={v.image} className="w-12" alt="" />
              <p>{v.name}</p>
              <p>{v.desc}</p>
          
              <input type="color" value={v.bgColor} />
              <p
                className="cursor-pointer"
                onClick={() => {
                  removeSong(v._id);
                }}
              >
                x
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListAlbum;
