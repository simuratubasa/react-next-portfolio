import Image from "next/image";
import Link from "next/link";
import styles from "./index.module.css";
import { Member } from "@/app/_libs/microcms";

type Props = {
    members: Member[];
    truncateProfile?: boolean;
};

export default function MemberList({ members, truncateProfile = true }: Props) {
    if (members.length === 0) {
        return <p className={styles.empty}>メンバーがいません。</p>;
    }
    return (
        <ul>
            {members.map((member) => (
                <li key={member.id} className={styles.list}>
                    <Link href={`/members/${member.id}`} className={styles.link}>
                        {member.image ? (
                            <Image
                                src={member.image.url}
                                alt={member.name}
                                width={member.image.width}
                                height={member.image.height}
                                className={styles.image}
                            />
                        ) : (
                            <Image
                                src="/no-image.png"
                                alt="No Image"
                                width={1200}
                                height={630}
                                className={styles.image}
                            />
                        )}
                        <dl className={styles.content}>
                            <dt className={styles.name}>{member.name}</dt>
                            <dd className={styles.position}>{member.position}</dd>
                            <dd className={styles.profile}>
                                {truncateProfile && member.profile && member.profile.length > 100
                                    ? member.profile.substring(0, 100) + "..."
                                    : member.profile || ""}
                            </dd>
                        </dl>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
