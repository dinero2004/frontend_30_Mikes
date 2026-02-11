// src/actions/update-news/update-news-action.ts
"use server";

import { auth } from "@/auth/auth";
import { fetchApi } from "@/utils/fetch/backend-fetch";

/**
 * Data required to update a news entry
 */
interface UpdateNewsData {
  id: number;              // News ID to update
  title?: string;
  subtitle?: string;
  description?: string;   // plain text
  image_id?: number;
}

/**
 * Result structure for the update news action
 */
interface UpdateNewsResult {
  success: boolean;
  error?: string;
  data?: Record<string, unknown>;
}

/**
 * Server action to update an existing news entry
 */
export async function updateNewsAction(
  formData: UpdateNewsData
): Promise<UpdateNewsResult> {
  try {
    const session = await auth();

    if (!session?.user?.id || !session?.accessToken) {
      return {
        success: false,
        error: "You must be logged in to update a news entry",
      };
    }

    const { id, ...updateData } = formData;

    const result = await fetchApi<Record<string, unknown>>(`news/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(updateData),
    });

    if (result.error) {
      return {
        success: false,
        error: result.error,
      };
    }

    return {
      success: true,
      data: result.data || undefined,
    };
  } catch (error) {
    console.error("Update news action error:", error);

    return {
      success: false,
      error: "An unexpected error occurred while updating the news entry",
    };
  }
}
