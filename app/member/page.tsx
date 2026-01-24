import { getMemberList} from "@/app/_libs/microcms";
import { MEMBER_LIST_LIMIT} from "@/app/_constants";
import { notFound } from "next/navigation";
import MemberList from "@/app/_components/MemberList";

export default async function Page() {
    const data = await getMemberList({ limit: MEMBER_LIST_LIMIT }).catch(() => {
        notFound();
    });

    if (!data) {
        notFound();
    }

    return (
        <MemberList members={data.contents} truncateProfile={false} />
    );
}