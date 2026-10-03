import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' }); // load from root if run from apps/web

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function run() {
  console.log("Config:", {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    hasKey: !!process.env.CLOUDINARY_API_KEY,
    hasSecret: !!process.env.CLOUDINARY_API_SECRET
  });
  
  try {
    // Just try to fetch details of the image
    const publicId = 'bb8uzz4nvrzo5ukzbvvj';
    const result = await cloudinary.api.resource(publicId);
    console.log("Resource fetched:", result.public_id);
    
    // Test destroy (we won't actually destroy it, or maybe we do to test?)
    // Let's just fetch it for now
  } catch (err) {
    console.error("Cloudinary error:", err);
  }
}
run();
