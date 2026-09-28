import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET() {
  revalidateTag("profile-5ad9f991-c187-4082-b49c-497e7ce86323", "default");
  return NextResponse.json({ revalidated: true });
}
