import { v2 as cloudinary } from "cloudinary";

const Cloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_APP_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  console.log("✅ Cloudinary configured successfully");
};

export default Cloudinary;
