import  styles from "./page.module.css"; 
import Image from "next/image";
import Link from "next/link";
import { TOP_NEWS_LIMIT, MEMBER_LIST_LIMIT } from "./_constants";
import NewsList from "@/app/_components/NewsList";
import MemberList from "@/app/_components/MemberList";
import { getNews, getMemberList } from "@/app/_libs/microcms";
import ButtonLink from "@/app/_components/ButtonLink";



export default async function Home() {
  
  const newsData = await getNews({
    limit: TOP_NEWS_LIMIT,
  }).catch(() => ({
    contents: [],
  }));
  
  const membersData = await getMemberList({
    limit: 2, // ホーム画面には数名表示
  }).catch(() => ({
    contents: [],
  }));

  return (
    <>
    <section className={styles.top}>
      <div>
        <h1 className={styles.title}>Welcome</h1>
        <p className={styles.description}>
          <Link href="/members" className={styles.descriptionLink}>
            ここは志村 飛翔のプローフィールサイトです。
          </Link>
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

  <section className={styles.members}>
    <h2 className={styles.sectionTitle}>Members</h2>
    <MemberList members={membersData.contents} />
    <div className={styles.sectionLink}>
      <ButtonLink href="/members">もっと見る</ButtonLink>
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