// src/actions/create-news/create-news-action.ts
"use server";

import { auth } from "@/auth/auth";
import { fetchApi } from "@/utils/fetch/backend-fetch";

/**
 * Data required to create a news entry
 */
interface CreateNewsData {
  title: string;
  subtitle?: string;
  description?: string; // plain text (NOT JSON)
  image_id?: number;
}

/**
 * Result structure for the create news action
 */
interface CreateNewsResult {
  success: boolean;
  error?: string;
  data?: Record<string, unknown> | null;
}

/**
 * Server action to create a news entry
 */
export async function createNewsAction(
  formData: CreateNewsData
): Promise<CreateNewsResult> {
  try {
    const session = await auth();

    if (!session?.user?.id || !session?.accessToken) {
      return {
        success: false,
        error: "You must be logged in to create a news entry",
      };
    }

    const result = await fetchApi<Record<string, unknown>>("news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(formData),
    });

    if (result.error) {
      return {
        success: false,
        error: result.error,
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    console.error("Create news action error:", error);

    return {
      success: false,
      error: "An unexpected error occurred while creating the news entry",
    };
  }
}
