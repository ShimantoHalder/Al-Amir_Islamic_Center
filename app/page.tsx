import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PrayerTimes from './components/PrayerTimes';
import About from './components/About';
import Gallery from './components/Gallery';
import Location from './components/Location';
import Donate from './components/Donate';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <PrayerTimes />
      <About />
      <Gallery />
      <Location />
      <Donate />
      <ContactForm />
      <Footer />
    </main>
  );
}
