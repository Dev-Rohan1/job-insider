import multer from "multer";

const storage = multer.diskStorage({});

// Basic multer config
const upload = multer({ storage });

export default upload;
