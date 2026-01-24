import Image from "next/image";
import styles from "./page.module.css";

export default function Page() {
    return (
        <section>
            <Image
                src="/メディア.jpg"
                alt=""
                width={1600}
                height={900}
                className={styles.mediaImage}
                priority
            />
            <h2 className={styles.title}>志村飛翔</h2>
            <p className={styles.subtitle}>京都デザイン＆テクノロジー専門学校/スーパーITエンジニア専攻</p>
            <p className={styles.profileText}>趣味はゲームで最近は７DAYSやRaftなどを遊んでいます</p>
        </section>
    );
}