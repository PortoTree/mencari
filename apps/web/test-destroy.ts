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
    const publicId = 'bb8uzz4nvrzo5ukzbvvj';
    
    // First, let's just see if it exists
    let res = await cloudinary.api.resource(publicId);
    console.log("Resource fetched:", res.public_id);
    
    // Now test destroy
    const delRes = await cloudinary.uploader.destroy(publicId, { invalidate: true });
    console.log("Destroy result:", delRes);
  } catch (err) {
    console.error("Cloudinary error:", err);
  }
}
run();
