"use server";

import { auth } from "@/auth";
import { fetchApi } from "@/utils/fetch/backend-fetch";

interface UpdateNewsData {
  slug: string;
  title: string;
  subtitle?: string;
  description?: string;
  image_id?: number | null;
}

interface UpdateNewsResult {
  success: boolean;
  error?: string;
  data?: unknown;
}

export async function updateNewsAction(
  data: UpdateNewsData
): Promise<UpdateNewsResult> {
  try {
    const session = await auth();

    if (!session?.accessToken) {
      return { success: false, error: "Unauthorized" };
    }

    const result = await fetchApi(`news/${data.slug}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify({
        title: data.title,
        subtitle: data.subtitle ?? null,
        description: data.description ?? null,
        image_id: data.image_id ?? null,
      }),
    });

    if (result.error) {
      return { success: false, error: result.error };
    }

    return { success: true, data: result.data };
  } catch {
    return {
      success: false,
      error: "Unexpected error while updating news",
    };
  }
}
