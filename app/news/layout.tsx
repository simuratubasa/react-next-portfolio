import Hero from "@/app/_components/Hero";
import Sheet from "@/app/_components/sheet";

export const metadata = {
  title: 'ニュース',
};

export const revalidate = 60;

type Props = {
    children: React.ReactNode;
};

export default function NewsLayout({ children }: Props) {
    return (
        <>
            <Hero title="News" sub="ここでは自分の作ったものや出来事を記載してます" />
            <Sheet>{children}</Sheet>
        </>
    );
}