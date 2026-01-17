import Image from "next/image";
import { getMemberDetail } from "@/app/_libs/microcms";
import { notFound } from "next/navigation";
import ButtonLink from "@/app/_components/ButtonLink";
import styles from "./page.module.css";

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  const data = await getMemberDetail(params.slug).catch(() => notFound());

  return (
    <>
      <Image
        src={data.image.url}
        alt={data.name}
        width={data.image.width}
        height={data.image.height}
        className={styles.image}
      />
      <dl>
        <dt className={styles.name}>{data.name}</dt>
        <dd className={styles.position}>{data.position}</dd>
        <dd className={styles.profile}>{data.profile || ""}</dd>
      </dl>
      <div className={styles.footer}>
        <ButtonLink href="/members">一覧に戻る</ButtonLink>
      </div>
    </>
  );
}
