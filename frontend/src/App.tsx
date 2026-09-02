import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Cover from './components/Cover';
import HeroSection from './components/HeroSection';
import Countdown from './components/Countdown';
import EventInfo from './components/EventInfo';
import RSVPForm from './components/RSVPForm';
import Wishes from './components/Wishes';
import Gallery from './components/Gallery';
import MusicToggle from './components/MusicToggle';
import Footer from './components/Footer';
import { useAudio } from './hooks/useAudio';

const MUSIC_SRC = '/assets/music/speechless.mp3';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { isPlaying, toggle, play } = useAudio(MUSIC_SRC);

  const handleOpen = () => {
    setIsOpen(true);
    // Start music upon user interaction (satisfies browser autoplay policy)
    play();
  };

  return (
    <div className="relative">
      {/* Cover overlay */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="cover"
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Cover onOpen={handleOpen} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content — rendered once cover is opened */}
      {isOpen && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <HeroSection />
          <Countdown />
          <EventInfo />
          <RSVPForm />
          <Wishes />
          <Gallery />
          <Footer />
        </motion.main>
      )}

      {/* Floating music toggle — visible once invitation is opened */}
      {isOpen && <MusicToggle isPlaying={isPlaying} onToggle={toggle} />}
    </div>
  );
}
