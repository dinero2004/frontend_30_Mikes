import { auth } from "@/auth/auth";
import { EditNews } from "@/components/edit-news/edit-news";
import { NavLink } from "@/components/nav-link/nav-link";
import { Grid, GridItem } from "@/components/ui/grid/grid";
import { Text } from "@/components/ui/text/text";
import type { AdminUser } from "@/types/data";
import type { PaginatedNewsResponse } from "@/types/responses/news-response";
import { fetchApi } from "@/utils/fetch/backend-fetch";
import { notFound } from "next/navigation";

interface EditNewsPageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditNewsPage({ params }: EditNewsPageProps) {
  const { slug } = await params;

  // Session
  const session = await auth();

  if (!session?.user?.id) {
    notFound();
  }

  // Fetch news by slug
  const response = await fetchApi<PaginatedNewsResponse>(`news?slug=${slug}`);
  const news = response.data?.data?.[0];

  if (!news) {
    notFound();
  }

  // Fetch creator user
  const userResponse = await fetchApi<AdminUser>(
    `users?id=${news.user_id}`
  );

  if (!userResponse.data) {
    notFound();
  }

  const creatorId = userResponse.data.id;
  const sessionUserId = Number(session.user.id);

  // Permission check
  if (creatorId !== sessionUserId) {
    return (
      <div>
        <Grid>
          <GridItem span={12} className="flex flex-col items-center">
            <Text variant="headline-2">
              Whoops, you wandered out of your stay
            </Text>
          </GridItem>

          <GridItem span={6} offset={3} className="flex flex-col items-center gap-2xs">
            <Text>The creator has banished you from this hidden gem.</Text>
            <Text variant="body-small">Let&apos;s go back to your dashboard.</Text>
          </GridItem>

          <GridItem span={12} className="flex justify-center">
            <NavLink
              href="/dashboard"
              className="bg-cyan-900/90 text-gray-100 hover:bg-cyan-900/75 px-xs py-2xs transition-all"
            >
              Dashboard
            </NavLink>
          </GridItem>
        </Grid>
      </div>
    );
  }

  // Authorized → render edit form
  return <EditNews data={news} />;
}
