import { auth } from "@/auth/";
import { Card } from "@/components/card/card";
import { CardBody } from "@/components/card/card-body/card-body";
import { CardHeader } from "@/components/card/card-header/card-header";
import { NavLink } from "@/components/nav-link/nav-link";
import { Pagination } from "@/components/pagination/pagination";
import { Grid, GridItem } from "@/components/ui/grid/grid";
import { ImageContainer } from "@/components/ui/image/image";
import { Text } from "@/components/ui/text/text";
import { PaginatedNewsResponse } from "@/types/responses/news-response";
import { fetchApi } from "@/utils/fetch/backend-fetch";

interface UserNewsProps {
  searchParams: {
    page?: string;
    limit?: string;
  };
}

export default async function UserNews({ searchParams }: UserNewsProps) {
  // Session (guaranteed by middleware)
  const session = await auth();

  // Pagination params
  const page = Number(searchParams.page ?? "1");
  const limit = Number(searchParams.limit ?? "21");

  const result = await fetchApi<PaginatedNewsResponse>(
    `news?user_id=${session?.user?.id}&limit=${limit}&page=${page}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const responseData = result.data?.data;
  const pagination = result.data;

  return (
      <section className="
      min-h-screen h-full
      bg-[url('/images/background.png')]
      bg-no-repeat mx-auto px-8 py-16 space-y-12 text-white"
    >
      <Grid className="py-2xl">
        {/* HEADER */}
        <GridItem span={12} className="flex flex-col gap-xs">
          <Text as="h1" variant="headline-2">
            Welcome back {session?.username}!
          </Text>
          <Text>What&apos;s your next Post?</Text>
        </GridItem>

      {/* ACTION */}
      <GridItem span={12} className="flex justify-end">
        <NavLink
          href="/news/create"
          textVariant="body-small"
          className="bg-gray-900/90 text-white px-xs py-2xs rounded-md hover:bg-gray-700/90"
        >
          New Posts
        </NavLink>
      </GridItem>

      {/* NEWS CARDS */}
      {responseData?.map((news) => (
        <GridItem key={news.id} span={{ lg: 4, md: 6, sm: 12 }}>
          <Card slug={`/news/${news.slug}`}>c
            <CardHeader
              title={news.title}
              subtitle={news.subtitle}
              description={news.description}
            />

            {news.cover_image && (
              <CardBody>
                <ImageContainer
        src={news.cover_image.url}
        alt={news.title}
        className="object-cover"
      />
                <img src={news.cover_image?.url} alt={news.title} />
              </CardBody>
            )}
          </Card>
        </GridItem>
      ))}

      {/* PAGINATION */}
      {pagination && (
        <GridItem span={12}>
          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.last_page}
            basePath="/dashboard"
            searchParams={searchParams}
          />
        </GridItem>
      )}
    </Grid>
  </section>);
}
