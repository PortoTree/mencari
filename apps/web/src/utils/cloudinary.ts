/**
 * Helper to generate optimized Cloudinary URLs based on our media infrastructure plan.
 * Standardizes transformations to save bandwidth and storage.
 */
export function getOptimizedUrl(
  url: string | null | undefined, 
  type: "avatar" | "cover" | "preview"
): string {
  if (!url) return "";

  // If it's a local blob (during preview before upload completes), return as is
  if (url.startsWith("blob:") || url.startsWith("data:") || url.startsWith("/")) return url;

  // If it's not a Cloudinary URL, return as is
  if (!url.includes("res.cloudinary.com") || !url.includes("/image/upload/")) return url;

  // Define our standard transformations based on Blueprint
  let transformation = "q_auto,f_auto"; // Default fallback
  
  if (type === "avatar") {
    // 300x300, fill, optimize quality & format, preserve animation
    transformation = "c_fill,w_300,h_300,q_auto,f_auto,fl_animated";
  } else if (type === "cover") {
    // 1200x400 (3:1 aspect ratio), fill, optimize quality & format, preserve animation
    transformation = "c_fill,w_1200,h_400,q_auto,f_auto,fl_animated";
  } else if (type === "preview") {
    // Max 1600 width for fullscreen viewing, keep aspect ratio
    transformation = "c_limit,w_1600,q_auto,f_auto";
  }

  // Inject transformation right after "/upload/"
  return url.replace("/upload/", `/upload/${transformation}/`);
}
