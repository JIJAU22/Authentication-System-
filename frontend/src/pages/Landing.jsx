import BackgroundVideo from '../components/landing/BackgroundVideo';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';

const Landing = () => {
  return (
    <main className="relative bg-black h-screen w-screen flex flex-col overflow-hidden selection:bg-white selection:text-black shrink-0">
      <BackgroundVideo />
      <Navbar />
      <Hero />
    </main>
  );
};

export default Landing;
