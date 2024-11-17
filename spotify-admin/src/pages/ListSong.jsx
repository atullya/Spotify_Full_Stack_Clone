import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../App";
import { toast } from "react-toastify";

const ListSong = () => {
  const [data, setData] = useState([]);

  const fetchSong = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/song/list`);
      // console.log(response.data);
      setData(response.data);
      if (response.data.success) {
        setData(response.data.songs);
      }
    } catch (error) {
      toast.error("Error Occured");
    }
  };

  const removeSong = async (id) => {
    try {
      let response = await axios.post(`${url}/api/song/remove`, { id });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchSong();
      }
    } catch (error) {
      toast.error("Error Occured");
    }
  };

  useEffect(() => {
    fetchSong();
  }, []);
  return (
    <div>
      <p>All Songs List</p>
      <br />

      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Album</b>
          <b>Duration</b>
          <b>Action</b>
        </div>
        {data.map((v, i) => {
          return (
            <div
              key={i}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
            >
              <img src={v.image} className="w-12" alt="" />
              <p>{v.name}</p>
              <p>{v.album}</p>
              <p>{v.duration}</p>
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

export default ListSong;
