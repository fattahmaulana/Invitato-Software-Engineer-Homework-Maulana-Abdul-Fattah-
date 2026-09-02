import { motion } from 'framer-motion';
import Ornament from './ui/Ornament';
import InvitatoLogo from './ui/InvitatoLogo';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-[#55585B] text-ivory py-16 md:py-20 px-6 overflow-hidden">
      {/* Background image & subtle overlay */}
      <div className="absolute inset-0 z-0 opacity-15">
        <img
          src="/assets/images/couple/main-portrait.png"
          alt="Ricky & Fellycia"
          className="w-full h-full object-cover object-center filter grayscale brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#44474A] to-[#55585B]" />
      </div>
      <div className="absolute inset-0 bg-pattern opacity-10 z-0" />

      {/* Decorative side leaves */}
      <div className="absolute top-0 left-0 opacity-20 z-10 pointer-events-none">
        <Ornament type="leaf-left" color="#FEFEFE" className="w-16 h-32" />
      </div>
      <div className="absolute top-0 right-0 opacity-20 z-10 pointer-events-none">
        <Ornament type="leaf-right" color="#FEFEFE" className="w-16 h-32" />
      </div>

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Thank You Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Ornament type="frame-top" color="#FEFEFE" className="mb-6 opacity-60" />

          <p className="font-body text-body-md md:text-body-lg text-ivory/90 mb-6 leading-relaxed italic max-w-lg mx-auto">
            {t.footer.thankYouMessage}
          </p>

          <h2 className="font-heading text-display-sm text-ivory mb-2">
            {t.footer.thankYou}
          </h2>

          <Ornament type="divider" color="#FEFEFE" className="my-6 opacity-60" />

          {/* Couple names */}
          <p className="font-heading text-heading-md text-ivory">
            Ricky
          </p>
          <span className="font-display text-3xl text-accent-light block my-1">
            &amp;
          </span>
          <p className="font-heading text-heading-md text-ivory">
            Fellycia
          </p>

          <Ornament type="frame-bottom" color="#FEFEFE" className="mt-6 mb-8 opacity-60" />
        </motion.div>

        {/* Invitato Brand Footer Bar (Matching Screenshot with Official Logo & Language Switcher) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-8 border-t border-white/15 relative"
        >
          {/* Official Invitato Logo */}
          <div className="flex flex-col items-center justify-center mb-4">
            <a
              href="https://invitato.net"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center group transition-transform hover:scale-105 duration-300"
              title="Invitato — Website Invitation"
            >
              <InvitatoLogo color="#FFFFFF" height={28} className="drop-shadow-sm" />
            </a>

            <p className="font-body text-body-sm text-ivory/80 mt-2 font-light tracking-wide">
              {t.footer.createdWithLove} <a href="https://invitato.net" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">Invitato</a>
            </p>
          </div>

          {/* Song Attribution */}
          <p className="font-body text-body-sm text-ivory/80 italic tracking-wide mb-1.5">
            {t.footer.songBy}
          </p>

          {/* Copyright */}
          <p className="font-body text-body-xs md:text-body-sm text-ivory/70 tracking-wide font-light">
            &copy; 2026 Ricky &amp; Fellycia. {t.footer.rightsReserved}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
