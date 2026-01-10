import Image from "next/image";
import styles from "./index.module.css";

type Props = {
    title: string;
    sub?: string;
};

export default function Hero({ title, sub }: Props){
    return (
        <section className={styles.top}>
            <div>
                <h1 className={styles.title}>{title}</h1>
                {sub && <p className={styles.descript}>{sub}</p>}
            </div>
            <Image
                className={styles.bgimg}
                src="/img-mv.jpg"
                alt=""
                width={4000}
                height={1200}
            />
        </section>
    );
}