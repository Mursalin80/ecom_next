import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export function uploadImage(image) {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      image,

      { folder: "Next-ecommerance" },
      (err, res) => {
        console.log("🚀  cloudinary.js:15  Upload-success:");
        if (err) {
          console.log("🚀  cloudinary.js Upload-error:", err);
          reject(err);
        }
        resolve(res);
      }
    );
  });
}
