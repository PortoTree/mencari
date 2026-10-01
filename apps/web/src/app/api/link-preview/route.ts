import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch URL" }, { status: 400 });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const getMetaTag = (name: string) => {
      return (
        $(`meta[property="og:${name}"]`).attr("content") ||
        $(`meta[name="${name}"]`).attr("content") ||
        $(`meta[property="twitter:${name}"]`).attr("content")
      );
    };

    const title = getMetaTag("title") || $("title").text() || "";
    const description = getMetaTag("description") || "";
    let image = getMetaTag("image") || "";

    // Resolve relative image URLs
    if (image && !image.startsWith("http")) {
      try {
        image = new URL(image, url).toString();
      } catch (e) {
        // ignore
      }
    }

    const domain = new URL(url).hostname;

    return NextResponse.json({
      title,
      description,
      image,
      domain,
      url
    });
  } catch (error) {
    console.error("Error fetching link preview:", error);
    return NextResponse.json({ error: "Failed to parse link metadata" }, { status: 500 });
  }
}
