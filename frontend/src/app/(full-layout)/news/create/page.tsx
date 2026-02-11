"use client";

import { createNewsAction } from "@/actions/create-news/create-news-action";
import { uploadImageAction } from "@/actions/upload-image/upload-image-action";
import { Button } from "@/components/ui/button/button";
import { Grid, GridItem } from "@/components/ui/grid/grid";
import { Input } from "@/components/ui/input/input";
import { Textarea } from "@/components/ui/textarea/textarea";
import { Text } from "@/components/ui/text/text";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

interface UploadedImage {
  id: number;
  url: string;
  name?: string;
}

export default function CreateNewsPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");

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
      formData.append("files", file);
      formData.append("type", "news");
      formData.append("title", title);

      const result = await uploadImageAction(formData);

      if (result.success && result.image) {
        setUploadedImage(result.image);
        return result.image.id;
      }

      toast.error(result.error || "Image upload failed");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async () => {
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!selectedFile) {
      toast.error("Please select a cover image");
      return;
    }

    setIsSubmitting(true);

    try {
      const imageId = await handleImageUpload(selectedFile);
      if (!imageId) return;

      const result = await createNewsAction({
        title,
        subtitle,
        description,
        image_id: imageId,
      });

      if (result.success) {
        toast.success("News created successfully");
        router.push("/news");
      } else {
        toast.error(result.error || "Failed to create news");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error while creating news");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-2xl bg-neutral-800 flex justify-center">
      <div className="w-full max-w-4xl">
        <Grid className="bg-neutral-900 rounded-xl border border-white/10 shadow-xl p-xl gap-l">

          <GridItem span={12}>
            <Text as="h1" variant="headline-2" className="text-white">
              Create News
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

          <GridItem span={12} className="flex gap-m pt-s border-t border-white/10">
            <Button
              variant="destructive"
              label="Cancel"
              onClick={() => router.push("/news")}
            />
            <Button
              label="Create News"
              onClick={onSubmit}
              disabled={isSubmitting || isUploading}
            />
          </GridItem>

          <GridItem span={12}>
            <label className="block text-sm font-medium mb-2 text-white">
              Cover Image
            </label>

            {!selectedFile && !uploadedImage ? (
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="text-white file:bg-neutral-800 file:text-white file:border file:border-white/10 file:rounded-md file:px-s file:py-xs"
              />
            ) : (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/10">
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
                  className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            )}
          </GridItem>
        </Grid>
      </div>
    </div>
  );
}
