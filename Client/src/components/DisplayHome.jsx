import React from "react";
import Navbar from "./Navbar";
import { albumsData } from "../assets/frontend-assets/assets";
import AlbumItem from "./AlbumItem";
import { songsData } from "../assets/frontend-assets/assets";
import SongItem from "./SongItem";
const DisplayHome = () => {
  return (
    <div>
      <>
        <Navbar />
        <div className="mb-4">
          <h1 className="my-5 font-bold text-2xl">Featured Chart </h1>
          <div className="flex overflow-auto">

          {albumsData.map((v, i) => (
            <AlbumItem key={i} name={v.name} desc={v.desc} image={v.image} id={v.id} />
          ))}
          </div>
        </div>
        <div className="mb-4">
          <h1 className="my-5 font-bold text-2xl">Today's  Biggest Hit </h1>
          <div className="flex overflow-auto">

          {songsData.map((v, i) => (
            <SongItem key={i} name={v.name} desc={v.desc} image={v.image} id={v.id} />
          ))}
          </div>
        </div>
      </>
    </div>
  );
};

export default DisplayHome;
