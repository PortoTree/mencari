import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Setup konfigurasi
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function logToFile(msg: string) {
  try {
    fs.appendFileSync(path.join(process.cwd(), 'cloudinary-debug.log'), msg + '\n');
  } catch (e) {}
}

/**
 * Fungsi untuk menghapus media dari Cloudinary menggunakan publicId
 */
export async function deleteFromCloudinary(publicId: string, resourceType: 'image' | 'video' = 'image') {
  try {
    logToFile(`Attempting to delete publicId: ${publicId} with type: ${resourceType}`);
    logToFile(`Config keys present? name: ${!!process.env.CLOUDINARY_CLOUD_NAME}, key: ${!!process.env.CLOUDINARY_API_KEY}, secret: ${!!process.env.CLOUDINARY_API_SECRET}`);
    
    if (!publicId) {
      logToFile(`Failed: No publicId provided`);
      return false;
    }

    // Panggil API destroy (tentukan resource type: image atau video, dan invalidate CDN)
    const result = await cloudinary.uploader.destroy(publicId, { 
      resource_type: resourceType,
      invalidate: true
    });
    
    console.log(`Cloudinary delete result for ${publicId}:`, result);
    logToFile(`Cloudinary delete result: ${JSON.stringify(result)}`);
    return result.result === 'ok';
  } catch (error: any) {
    console.error("Gagal hapus media dari Cloudinary:", error);
    logToFile(`Cloudinary Error: ${error?.message || String(error)}`);
    return false;
  }
}
