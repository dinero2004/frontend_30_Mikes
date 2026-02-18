"use server";

import { auth } from "@/auth";
import { fetchApi } from "@/utils/fetch/backend-fetch";

interface CreateNewsData {
  title: string;
  subtitle?: string;
  description?: string;
  image?: File | null;
}

interface CreateNewsResult {
  success: boolean;
  error?: string;
  data?: unknown;
}

export async function createNewsAction(
  formData: CreateNewsData
): Promise<CreateNewsResult> {
  try {
    const session = await auth();

    console.log("TOKEN:", session?.accessToken);
    if (!session?.accessToken) {
      return {
        success: false,
        error: "Unauthorized",
      };
    }

    let imageId: number | null = null;

    /* -------------------------
       1️⃣ Upload Image (optional)
    -------------------------- */
 if (formData.image) {
  const uploadData = new FormData();
  uploadData.append("files[]", formData.image);
  uploadData.append("type", "news");
  uploadData.append("title", formData.title);

  console.log("UPLOAD URL:", `${process.env.BACKEND_URL}/api/uploads`);
  console.log("UPLOAD TOKEN:", session.accessToken);

  const uploadResponse = await fetch(
    `${process.env.BACKEND_URL}/api/uploads`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/json", // 🔥 IMPORTANT
      },
      body: uploadData,
    }
  );

  console.log("UPLOAD STATUS:", uploadResponse.status);

  const raw = await uploadResponse.text();
  console.log("UPLOAD RAW RESPONSE:", raw);

  if (!uploadResponse.ok) {
    return {
      success: false,
      error: `Image upload failed (${uploadResponse.status})`,
    };
  }

  const uploadResult = JSON.parse(raw);

  imageId = uploadResult?.images?.[0]?.id ?? null;

  if (!imageId) {
    return { success: false, error: "Invalid upload response" };
  }
}

    /* -------------------------
       2️⃣ Create News
    -------------------------- */
    const result = await fetchApi("news", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        title: formData.title,
        subtitle: formData.subtitle ?? null,
        description: formData.description ?? null,
        image_id: imageId,
      }),
    });

    if (result.error) {
      return { success: false, error: result.error };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error("Create news error:", error);

    return {
      success: false,
      error: "Unexpected error occurred",
    };
  }
}
