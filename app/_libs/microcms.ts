import { createClient } from "microcms-js-sdk";
import type {
  MicroCMSQueries,
  MicroCMSImage,
  MicroCMSListContent,
} from "microcms-js-sdk";

export type Member = {
  name: string;
  position: string;
  profile: string;
  image: MicroCMSImage;
} & MicroCMSListContent;

export type Category = {
  name: string;
} & MicroCMSListContent;

export type News = {
  title: string;
  description: string;
  content: string;
  thumbnail?: MicroCMSImage;
  category: Category;
} & MicroCMSListContent;

const getServiceDomain = () => {
  const domain = process.env.MICROCMS_SERVICE_DOMAIN;
  if (!domain) {
    throw new Error("MICROCMS_SERVICE_DOMAIN is required");
  }
  return domain
    .replace(/^https?:\/\//, "")
    .replace(/\.microcms\.io\/?$/, "");
};

const getApiKey = () => {
  const apiKey = process.env.MICROCMS_API_KEY;
  if (!apiKey) {
    throw new Error("MICROCMS_API_KEY is required");
  }
  return apiKey;
};

const getClient = () =>
  createClient({
    serviceDomain: getServiceDomain(),
    apiKey: getApiKey(),
  });

export const getMembersList = async (queries?: MicroCMSQueries) => {
  const client = getClient();
  const listData = await client.getList<Member>({
    endpoint: "member",
    queries,
  });
  return listData;
};

export const getNewsList = async (queries?: MicroCMSQueries) => {
  const client = getClient();
  const listData = await client.getList<News>({
    endpoint: "news",
    queries,
  });
  return listData;
};

export const getNewsDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const client = getClient();
  const detailData = await client.getListDetail<News>({
    endpoint: "news",
    contentId,
    queries,
    customRequestInit: {
      next: {
        revalidate: queries?.draftKey === undefined ? 60 : 0,
      },
    },
  });
  return detailData;
};

export const getCategoryDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  const client = getClient();
  const detailData = await client.getListDetail<Category>({
    endpoint: "categories",
    contentId,
    queries,
  });
  return detailData;
};

export const getAllNewsList = async () => {
    const client = getClient();
    const listData = await client.getAllContents<News>({
      endpoint: 'news',
    });
  
    return listData;
};
  
export const getAllCategoryList = async () => {
    const client = getClient();
    const listData = await client.getAllContents<Category>({
      endpoint: 'categories',
    });
  
    return listData;
};

export const getMembers = getMembersList;
export const getNews = getNewsList;
export const getMemberList = getMembersList;
export const getMemberDetail = async (
    contentId: string,
    queries?: MicroCMSQueries
) => {
  const client = getClient();
  const data = await client.getListDetail<Member>({
    endpoint: "member",
        contentId,
        queries,
    });
    return data;
}
