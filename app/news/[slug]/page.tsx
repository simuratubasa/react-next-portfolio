import { getNewsDetail } from "@/app/_libs/microcms";
type Props = {
    Params: {
        slug: string;
    }
};

export default async function Page({Params}:Props) {
    const data =await getNewsDetail(params.slug);

    return <div>{data.title}</div>
}