import { v2 as cloudinary } from "cloudinary";
import albumModel from "../models/albumModel.js";

const addAlbum = async (req, res) => {
  try {
    const name = req.body.name;
    const desc = req.body.desc;
    const bgColor = req.body.bgColor;
    const imageFile = req.file;
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const albumData = {
      name,
      desc,
      bgColor,
      image: imageUpload.secure_url,
    };
    const album = albumModel(albumData);
    await album.save();
    res.json({ success: true, message: "message album added" });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};
const listAlbum = async (req, res) => {
  try {
    let allalbumdata = await albumModel.find({});
    if (allalbumdata) {
      return res.status(200).json({
        message: true,
        album: allalbumdata,
      });
    }
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};
const removeAlbum = async (req, res) => {
  try {
    await albumModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Song Removed" });
  } catch (error) {
    return res.status(400).json({ success: false });
  }
};
export { addAlbum, listAlbum, removeAlbum };
