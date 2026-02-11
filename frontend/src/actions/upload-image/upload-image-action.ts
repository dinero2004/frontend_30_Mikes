"use server";

import { auth } from "@/auth/auth";

interface UploadedImage {
  id: number | null;
  name: string;
  url: string;
}

interface UploadResponse {
  success: boolean;
  image?: UploadedImage;
  error?: string;
}

export async function uploadImageAction(
  formData: FormData
): Promise<UploadResponse> {
  try {
    const session = await auth();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, error: "Not authenticated" };
    }

    // HARD GUARD — this was missing
    const file = formData.get("files[]");
    if (!(file instanceof File)) {
      console.error("uploadImageAction: file missing", file);
      return { success: false, error: "No file received" };
    }

    const response = await fetch("http://127.0.0.1:8000/api/uploads", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData, // forward as-is
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Upload failed:", response.status, text);
      return {
        success: false,
        error: `Upload failed (${response.status})`,
      };
    }

    const data = await response.json();
    const image = data.images?.[0];

    if (!image) {
      return { success: false, error: "Invalid upload response" };
    }

    return {
      success: true,
      image: {
        id: image.id,
        name: image.name,
        url: image.url,
      },
    };
  } catch (err) {
    console.error("uploadImageAction error:", err);
    return {
      success: false,
      error: "Unexpected upload error",
    };
  }
}
