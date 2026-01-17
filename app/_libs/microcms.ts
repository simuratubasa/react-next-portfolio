import { createClient} from "microcms-js-sdk";
import type {
    MicroCMSQueries,
    MicroCMSImage,
    MicroCMSListContent,
} from"microcms-js-sdk";
export type Member ={
    name: string;
    position: string;
    profile: string;
    image: MicroCMSImage;
}&MicroCMSListContent;

export type Category = {
    name: string;
} &MicroCMSListContent

export type News = {
    title: string;
    description: string;
    content: string;
    thumbnail: MicroCMSImage;
    category: Category;
} &MicroCMSListContent

if (!process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN) {
    throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

const serviceDomain = process.env.NEXT_PUBLIC_MICROCMS_SERVICE_DOMAIN
    .replace(/^https?:\/\//, "")
    .replace(/\.microcms\.io\/?$/, "");

if (!process.env.MICROCMS_API_KEY) {
    throw new Error("MICROCMS_API_KEY is required");
}

const client = createClient({
    serviceDomain,
    apiKey: process.env.MICROCMS_API_KEY,
});

export const getMembers = async (queries?: MicroCMSQueries) => {
    const listData = await client
        .getList<Member>({
            endpoint: "member",
            queries,
        });
    return listData;
}

export const getNews = async (queries?: MicroCMSQueries) => {
    const listData = await client
        .getList<News>({
            endpoint: "news",
            queries,
        });
    return listData;
}

export const getNewsDetail = async (
    contentId: string,
    queries?: MicroCMSQueries
) => {
    const data = await client.getListDetail<News>({
        endpoint: "news",
        contentId,
        queries,
    });
    return data;
}

export const getMemberDetail = async (
    contentId: string,
    queries?: MicroCMSQueries
) => {
    const data = await client.getListDetail<Member>({
        endpoint: "member",
        contentId,
        queries,
    });
    return data;
}

// 既存コードで `getMemberList` を参照している箇所があるため互換のためのエイリアスを追加
export const getMemberList = getMembers;