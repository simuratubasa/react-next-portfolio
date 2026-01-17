import { getNews } from "@/app/_libs/microcms";
import NewsList from "@/app/_components/NewsList";
import { notFound } from "next/navigation";

export default async function Page() {
  const data = await getNews().catch(() => {
    notFound();
  });

  if (!data) {
    notFound();
  }

  return <NewsList news={data.contents} />;
}
