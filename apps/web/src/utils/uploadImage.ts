export async function uploadToCloudinary(blobUrl: string, preset: string = "mencari_assets"): Promise<string> {
  // Fetch the blob from the local blob URL
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  
  // Prepare FormData for Cloudinary
  const formData = new FormData();
  formData.append("file", blob);
  formData.append("upload_preset", preset);
  
  // Cloudinary unauthenticated upload endpoint
  const cloudName = "ecdhyrfa";
  const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  
  try {
    const res = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error(data.error?.message || "Upload failed");
    }
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw err;
  }
}
