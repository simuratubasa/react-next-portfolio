import  styles from "./page.module.css"; 
import Image from "next/image";
import Link from "next/link";
import { TOP_NEWS_LIMIT } from "./_constants";
import NewsList from "@/app/_components/NewsList";
import { getNews } from "@/app/_libs/microcms";
import ButtonLink from "@/app/_components/ButtonLink";



export default async function Home() {
  
  const newsData = await getNews({
    limit: TOP_NEWS_LIMIT,
  }).catch(() => ({
    contents: [],
  }));
  
  return (
    <>
    <section className={styles.top}>
      <div>
        <h1 className={styles.title}>Welcome</h1>
        <p className={styles.description}>
          <Link href="/member" className={styles.descriptionLink}>
            私のプロフィールサイトへようこそ
          </Link>
      </p>
    </div>
    <Image
      className={styles.bgimg}
      src="/3643882.jpg"
      alt=""
      width={4000}
      height={1200}
    />
  </section>

  <section className={styles.members}>
    <h2 className={styles.sectionTitle}>About Me</h2>
    <p>自己紹介ページはこちらからご覧ください。</p>
    <div className={styles.sectionLink}>
      <ButtonLink href="/member">自己紹介を見る</ButtonLink>
    </div>
  </section>

  <section className={styles.news}>
    <h2 className={styles.sectionTitle}>News</h2>
      <NewsList news={newsData.contents} />
        <div className={styles.sectionLink}>
          <ButtonLink href="/news">もっと見る</ButtonLink>
        </div>
      </section>
    </>
  );
}