import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/Stats";
import EditorialGrid from "@/components/home/EditorialGrid";
import CategoryRow from "@/components/home/CategoryRow";
import PromoBanner from "@/components/home/PromoBanner";
import SecondaryArticles from "@/components/home/SecondaryArticles";
import NewsletterSection from "@/components/home/NewsletterSection";

export const metadata = {
  title: 'Medical Insights | Expert Preventative Care & Research',
  description: 'Empowering your journey to better health with expert-reviewed medical insights and the latest breakthroughs.'
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <StatsBar />
      <EditorialGrid />
      <CategoryRow />
      <PromoBanner />
      <SecondaryArticles />
      <NewsletterSection />
    </div>
  );
}
