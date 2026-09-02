import SectionWrapper from './ui/SectionWrapper';
import Ornament from './ui/Ornament';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <SectionWrapper id="hero" bg="warm" className="relative py-20 md:py-28">
      {/* Corner ornaments */}
      <Ornament type="corner-tl" />
      <Ornament type="corner-tr" />
      <Ornament type="corner-bl" />
      <Ornament type="corner-br" />

      <div className="max-w-3xl mx-auto text-center relative z-10 w-full px-4">
        {/* Opening subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="section-subtitle"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="section-title mb-4"
        >
          {t.hero.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-body text-lg sm:text-xl text-secondary/85 max-w-xl mx-auto leading-relaxed mb-8"
        >
          {t.hero.invitation}
        </motion.p>

        <Ornament type="frame-top" className="mb-8 w-48 mx-auto" />

        {/* Groom & Bride Section with & placed strictly BETWEEN the two lovers */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-4 my-8">
          {/* Groom Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center card-elegant !p-6 sm:!p-8 flex-1 w-full max-w-sm"
          >
            <div className="w-44 h-56 sm:w-48 sm:h-64 mb-6 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-primary/20 shadow-md relative group">
              <img
                src="/assets/images/couple/groom.png"
                alt="Ricky Wijaya"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl text-primary font-normal">
              Ricky Wijaya
            </h3>
            <p className="font-body text-base text-secondary mt-1.5 max-w-xs text-center leading-relaxed">
              {t.hero.sonOf}<br />
              <span className="font-medium text-primary/80">Mr. Suherman &amp; Mrs. Lina</span>
            </p>
          </motion.div>

          {/* Aesthetic Italian Curvy Ampersand & placed right in between */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center py-2 md:py-0 px-2 flex-shrink-0"
          >
            <span
              className="font-italian-ampersand text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-accent drop-shadow-sm select-none transform md:-rotate-3 hover:scale-110 transition-transform duration-300"
              style={{ fontFamily: "'Italianno', 'Great Vibes', 'Alex Brush', cursive" }}
            >
              &amp;
            </span>
          </motion.div>

          {/* Bride Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center card-elegant !p-6 sm:!p-8 flex-1 w-full max-w-sm"
          >
            <div className="w-44 h-56 sm:w-48 sm:h-64 mb-6 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-primary/20 shadow-md relative group">
              <img
                src="/assets/images/couple/bride.png"
                alt="Fellycia Ang"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl text-primary font-normal">
              Fellycia Ang
            </h3>
            <p className="font-body text-base text-secondary mt-1.5 max-w-xs text-center leading-relaxed">
              {t.hero.daughterOf}<br />
              <span className="font-medium text-primary/80">Mr. Budiman &amp; Mrs. Mei</span>
            </p>
          </motion.div>
        </div>

        {/* Main Couple Arch Portrait */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-md mx-auto my-10 overflow-hidden rounded-t-[120px] rounded-b-2xl border-4 border-white shadow-xl relative"
        >
          <img
            src="/assets/images/couple/main-portrait.png"
            alt="Ricky & Fellycia"
            className="w-full h-80 sm:h-96 object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent flex items-end justify-center pb-5">
            <span className="font-heading text-ivory text-base tracking-[0.3em] uppercase text-shadow font-light">
              {t.hero.togetherForever}
            </span>
          </div>
        </motion.div>

        <Ornament type="frame-bottom" className="mt-8 mb-10 w-48 mx-auto" />

        {/* Requested Bible Verse Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-body text-lg sm:text-xl text-secondary/90 italic max-w-xl mx-auto leading-relaxed bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/80 shadow-sm"
        >
          {t.hero.quote}
          <footer className="mt-4 text-xs sm:text-sm not-italic text-primary/80 font-sans tracking-[0.25em] uppercase font-semibold">
            {t.hero.quoteAuthor}
          </footer>
        </motion.blockquote>
      </div>
    </SectionWrapper>
  );
}
