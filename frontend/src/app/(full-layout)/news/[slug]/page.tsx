 import { auth } from "@/auth/auth";
import { BackButton } from "@/components/back-button/back-button";
import { NavLink } from "@/components/nav-link/nav-link";
import { Grid, GridItem } from "@/components/ui/grid/grid";
import { ImageContainer } from "@/components/ui/image/image";
import { Text } from "@/components/ui/text/text";
import type { AdminUser } from "@/types/data";
import type { PaginatedNewsResponse } from "@/types/responses/news-response";
import { fetchApi } from "@/utils/fetch/backend-fetch";
import { format } from "date-fns";
import { notFound } from "next/navigation";

interface NewsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { slug } = await params;

  // Fetch news by slug
  const response = await fetchApi<PaginatedNewsResponse>(`news?slug=${slug}`);
  const news = response.data?.data?.[0];

  if (!news) {
    notFound();
  }

  // Fetch user from USERS endpoint (not news!)
  const userResponse = await fetchApi<AdminUser>(
    `users?id=${news.user_id}`
  );

  if (!userResponse.data) {
    notFound();
  }

  // Session
  const session = await auth();

  const { title, subtitle, description, image_url, created_at } = news;
  const { username, id } = userResponse.data;
  // const sessionUserId = session?.user?.id;
  const sessionUserId = Number(session?.user?.id);

console.log("SESSION:", session);
console.log("SESSION USER ID:", session?.user?.id);
console.log("NEWS USER ID:", id);


  return (
  <Grid className="py-3xl max-w-5xl mx-auto mt-5 mb-5 flex flex-col gap-2xl">
    {/* HEADER */}
    <GridItem span={12}>
      <div className="flex flex-col gap-s">
        <div className="flex justify-between items-start gap-m">
          <div className="flex flex-col gap-2xs">
            <Text variant="headline-1" as="h1">
              {title}
            </Text>

            <Text variant="body-micro" className="text-gray-500">
              By <span className="font-medium text-gray-700">{username}</span> ·{" "}
              {format(new Date(created_at), "MMMM d, yyyy")}
            </Text>
          </div>

          <div className="flex gap-xs shrink-0">
            {id === sessionUserId && (
              <NavLink
                href={`/news/edit/${slug}`}
                textVariant="label-small"
                className="bg-gray-900 px-m py-2xs rounded-md text-white hover:bg-gray-800 transition"
              >
                Edit
              </NavLink>
            )}
            <BackButton />
          </div>
        </div>

        {/* SUBTITLE */}
        {subtitle && (
          <Text className="mt-s text-lg text-gray-700 max-w-3xl">
            {subtitle}
          </Text>
        )}
      </div>
    </GridItem>

    {/* IMAGE */}
    <GridItem span={12}>
      <div className="w-full aspect-video relative rounded-2xl overflow-hidden shadow-md">
        <ImageContainer src={image_url} alt={title} />
      </div>
    </GridItem>

    {/* CONTENT */}
    <GridItem span={12}>
      <div className="max-w-3xl mx-auto">
        <Text className="leading-relaxed text-gray-800 whitespace-pre-line">
          {description}
        </Text>
      </div>
    </GridItem>
  </Grid>
);
}
