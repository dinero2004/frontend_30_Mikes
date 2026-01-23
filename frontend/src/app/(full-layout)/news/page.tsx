import { Card } from "@/components/card/card";
import { CardBody } from "@/components/card/card-body/card-body";
import { CardHeader } from "@/components/card/card-header/card-header";
import { Grid } from "@/components/ui/grid/grid";
import { ImageContainer } from "@/components/ui/image/image";
import type { PaginatedNewsResponse } from "@/types/responses/news-response";
import { fetchApi } from "@/utils/fetch/backend-fetch";

export default async function NewsPage() {
const response = await fetchApi<PaginatedNewsResponse>("/news");
const newsList = response.data?.data ?? [];
console.log("API DATA:", response.data);

  return (
    <section className="max-w-5xl mx-auto p-8 space-y-8">
      <header>
        <h1 className="text-4xl font-bold">News</h1>
        <p className="text-muted-foreground">
          Latest updates, announcements, and development progress.
        </p>
      </header>
      

      {newsList.length === 0 ? (
        <p className="text-muted-foreground">No news available.</p>
      ) : (
        <Grid className="py-2xl">
          {newsList.map((news) => (
            <Card key={news.id} slug={`news/${news.id}`}>
              <CardHeader
                title={news.title}
                subtitle={news.subtitle}
                description={news.description}
              />

              {news.image_url && (
                <CardBody>
                  <ImageContainer
                    src={news.image_url}
                    alt={news.title}
                  />
                </CardBody>
              )}
            </Card>
          ))}
        </Grid>
      )}
    </section>
  );
}
