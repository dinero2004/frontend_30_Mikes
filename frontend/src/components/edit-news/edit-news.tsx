"use client";

import { updateNewsAction } from "@/actions/update-news/update-news-action";
import { Button } from "@/components/ui/button/button";
import { Grid, GridItem } from "@/components/ui/grid/grid";
import { Input } from "@/components/ui/input/input";
import { Text } from "@/components/ui/text/text";
import { Textarea } from "@/components/ui/textarea/textarea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { useSession } from "next-auth/react";
import type { News } from "@/types/data";

interface UploadedImage {
  id: number;
  name: string;
  url: string;
}

interface EditNewsProps {
  data: News;
}

export const EditNews = ({ data }: EditNewsProps) => {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session?.accessToken) {
    toast.error("You are not authenticated");
    return null;
  }

  const [title, setTitle] = useState(data.title);
  const [subtitle, setSubtitle] = useState(data.subtitle ?? "");
  const [description, setDescription] = useState(data.description ?? "");

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const handleImageUpload = async (file: File): Promise<number | null> => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("files[]", file);
      formData.append("type", "news");
      formData.append("title", title);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/uploads`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
      Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      const image = result.images?.[0];

      if (!image) {
        toast.error("Upload succeeded but no image returned");
        return null;
      }

      setUploadedImage(image);
      return image.id;
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Image upload failed");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

 const onSubmit = async () => {
  setIsSubmitting(true);

  try {
    let finalImageId = data.image_id ?? null;

    if (selectedFile) {
      const uploadedId = await handleImageUpload(selectedFile);
      if (!uploadedId) {
        setIsSubmitting(false);
        return;
      }
      finalImageId = uploadedId;
    }

    const result = await updateNewsAction({
      slug: data.slug,      // 🔥 USE SLUG
      title,
      subtitle,
      description,
      image_id: finalImageId,
    });

    if (result.success) {
      toast.success("News updated successfully");
      router.push("/news");
    } else {
      toast.error(result.error || "Failed to update news");
    }

  } catch {
    toast.error("Unexpected error");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="min-h-screen py-2xl bg-neutral-800 flex justify-center">
      <div className="w-full max-w-4xl">
        <Grid className="bg-neutral-900 border border-white/10 shadow-xl p-xl gap-l">

          <GridItem span={12}>
            <Text as="h1" variant="headline-2" className="text-white">
              Edit News
            </Text>
          </GridItem>

          <GridItem span={12}>
            <Input
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-neutral-800 border-white/10 text-white"
            />
          </GridItem>

          <GridItem span={12}>
            <Input
              label="Subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="bg-neutral-800 border-white/10 text-white"
            />
          </GridItem>

          <GridItem span={12}>
            <Textarea
              label="Description"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-neutral-800 border-white/10 text-white"
            />
          </GridItem>

          <GridItem span={12}>
            <label className="block text-sm font-medium mb-2 text-white">
              Cover Image
            </label>

            {selectedFile || uploadedImage ? (
              <div className="relative w-full aspect-video overflow-hidden border border-white/10">
                <Image
                  src={
                    uploadedImage
                      ? uploadedImage.url
                      : URL.createObjectURL(selectedFile!)
                  }
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSelectedFile(null);
                    setUploadedImage(null);
                  }}
                  className="absolute top-3 right-3 bg-red-500 text-white w-8 h-8 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ) : (
              <>
                {data.cover_image?.url && (
                  <div className="relative w-full aspect-video overflow-hidden border border-white/10 mb-s">
                    <Image
                      src={data.cover_image.url}
                      alt="Current image"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="text-white file:bg-neutral-800 file:text-white file:border file:border-white/10 file:px-s file:py-xs"
                />
              </>
            )}
          </GridItem>

          <GridItem span={12} className="flex gap-m pt-s border-t border-white/10">
            <Button
              variant="destructive"
              label="Cancel"
              onClick={() => router.push("/news")}
            />
            <Button
              label="Update News"
              onClick={onSubmit}
              disabled={isSubmitting || isUploading}
            />
          </GridItem>

        </Grid>
      </div>
    </div>
  );
};
