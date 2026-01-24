import { MetadataRoute } from 'next';
import { getAllCategoryList, getAllNewsList } from './_libs/microcms';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ??
  'http://localhost:3000';

const buildUrl = (path?: string) => `${siteUrl}${path ?? ''}`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const hasMicrocmsEnv = Boolean(
    process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN &&
      process.env.MICROCMS_API_KEY
  );

  let newsContents: Awaited<ReturnType<typeof getAllNewsList>> = [];
  let categoryContents: Awaited<ReturnType<typeof getAllCategoryList>> = [];

  if (hasMicrocmsEnv) {
    const [newsResult, categoryResult] = await Promise.allSettled([
      getAllNewsList(),
      getAllCategoryList(),
    ]);

    newsContents =
      newsResult.status === 'fulfilled' ? newsResult.value : [];
    categoryContents =
      categoryResult.status === 'fulfilled' ? categoryResult.value : [];
  }

  const newsUrls: MetadataRoute.Sitemap = newsContents.map((content) => ({
    url: buildUrl(`/news/${content.id}`),
    lastModified: content.revisedAt,
  }));
  const categoryUrls: MetadataRoute.Sitemap = categoryContents.map(
    (content) => ({
      url: buildUrl(`/news/category/${content.id}`),
      lastModified: content.revisedAt,
    })
  );

  const now = new Date();

  return [
    {
      url: buildUrl(),
      lastModified: now,
    },
    {
      url: buildUrl('/members'),
      lastModified: now,
    },
    {
      url: buildUrl('/contact'),
      lastModified: now,
    },
    {
      url: buildUrl('/news'),
      lastModified: now,
    },
    ...newsUrls,
    ...categoryUrls,
  ];
}
