import  styles from "./page.module.css"; 
import Image from "next/image";
import { TOP_NEWS_LIMIT } from "./_constants";
import NewsList from "@/app/_components/NewsList";
import { getNews } from "@/app/_libs/microcms";
import ButtonLink from "@/app/_components/ButtonLink";



export default async function Home() {
  
  const data = await getNews({
    limit: TOP_NEWS_LIMIT,
  });
  const sliceData = data.contents ?? [];

  return (
    <>
    <section className={styles.top}>
      <div>
        <h1 className={styles.title}>テクノロジーの力で世界をかえる</h1>
        <p className={styles.description}>
        私たちは市場をリードしているグローバルスティックカンパニーです。
      </p>
    </div>
    <Image
      className={styles.bgimg}
      src="/img-mv.jpg"
      alt=""
      width={4000}
      height={1200}
    />
  </section>
  <section className={styles.news}>
    <h2 className={styles.newsTitle}>News</h2>
      <NewsList news={data.contents} />
        <div className={styles.newsLink}>
          <ButtonLink href="/news">もっと見る</ButtonLink>
        </div>
      </section>
    </>
  );
}