import { getNewsDetail } from "@/app/_libs/microcms";
import Article from "@/app/_components/Article";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getNewsDetail(params.slug).catch(() => notFound());

  return <Article data={data} />;
}
