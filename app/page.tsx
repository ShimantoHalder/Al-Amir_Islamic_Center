import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import PrayerTimesSection from './sections/PrayerTimesSection';
import AboutSection from './sections/AboutSection';
import GallerySection from './sections/GallerySection';
import LocationSection from './sections/LocationSection';
import DonateSection from './sections/DonateSection';
import ContactSection from './sections/ContactSection';
import FooterSection from './sections/FooterSection';

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <PrayerTimesSection />
      <AboutSection />
      <GallerySection />
      <LocationSection />
      <DonateSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
