import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { ConverterCard } from '@/components/converter/ConverterCard';

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Converter Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <ConverterCard />
      </section>

      <FeaturesSection />
    </>
  );
}
