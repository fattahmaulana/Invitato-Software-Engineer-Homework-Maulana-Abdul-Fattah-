import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from './ui/SectionWrapper';
import Ornament from './ui/Ornament';
import Button from './ui/Button';
import { submitRSVP, ApiError } from '../lib/api';
import type { RsvpInput } from '../types';
import { useLanguage } from '../context/LanguageContext';

export default function RSVPForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<RsvpInput>({
    name: '',
    attendance: 'hadir',
    guestCount: 1,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = t.rsvp.nameRequired;
    } else if (formData.name.trim().length > 100) {
      errors.name = t.rsvp.nameMax;
    }

    if (!['hadir', 'tidak_hadir'].includes(formData.attendance)) {
      errors.attendance = t.rsvp.attendanceRequired;
    }

    if (formData.attendance === 'hadir') {
      if (formData.guestCount < 1) {
        errors.guestCount = t.rsvp.guestMin;
      } else if (formData.guestCount > 10) {
        errors.guestCount = t.rsvp.guestMax;
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    setLoading(true);

    try {
      await submitRSVP({
        ...formData,
        name: formData.name.trim(),
        guestCount: formData.attendance === 'tidak_hadir' ? 0 : formData.guestCount,
      });
      setSuccess(true);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.errors) {
          const serverErrors: Record<string, string> = {};
          err.errors.forEach((e) => {
            serverErrors[e.field] = e.message;
          });
          setFieldErrors(serverErrors);
        } else {
          setError(err.message);
        }
      } else {
        setError(t.rsvp.serverError);
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <SectionWrapper id="rsvp" bg="default" className="py-20 md:py-28">
        <div className="max-w-md mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="card-elegant !p-8 sm:!p-10"
          >
            {/* Success checkmark */}
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl text-primary mb-3 font-normal">
              {t.rsvp.thankYou}
            </h3>
            <p className="font-body text-base sm:text-lg text-secondary leading-relaxed">
              {formData.attendance === 'hadir'
                ? t.rsvp.thankYouAttending
                : t.rsvp.thankYouDeclining}
            </p>
          </motion.div>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="rsvp" bg="default" className="py-20 md:py-28">
      <div className="max-w-md mx-auto text-center w-full px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-subtitle"
        >
          {t.rsvp.subtitle}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="section-title mb-4"
        >
          {t.rsvp.title}
        </motion.h2>

        <Ornament type="divider" className="mb-6 w-44 mx-auto" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-body text-base sm:text-lg text-secondary mb-8"
        >
          {t.rsvp.desc}
        </motion.p>

        {/* Error banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-6 rounded-xl text-xs font-sans"
          >
            {error}
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onSubmit={handleSubmit}
          className="card-elegant space-y-5 text-left !p-6 sm:!p-8"
        >
          {/* Name field */}
          <div>
            <label htmlFor="rsvp-name" className="block font-sans text-xs uppercase tracking-wider text-primary mb-2 font-medium">
              {t.rsvp.nameLabel} <span className="text-accent">*</span>
            </label>
            <input
              id="rsvp-name"
              type="text"
              placeholder={t.rsvp.namePlaceholder}
              className={`input-field ${fieldErrors.name ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}`}
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: '' });
              }}
            />
            {fieldErrors.name && (
              <p className="text-red-500 text-xs mt-1 font-sans">{fieldErrors.name}</p>
            )}
          </div>

          {/* Attendance radio - Rounded Pills */}
          <div>
            <label className="block font-sans text-xs uppercase tracking-wider text-primary mb-2.5 font-medium">
              {t.rsvp.attendanceLabel} <span className="text-accent">*</span>
            </label>
            <div className="flex gap-3">
              <label
                className={`flex-1 p-3.5 border cursor-pointer transition-all duration-300 text-center rounded-xl
                  ${formData.attendance === 'hadir'
                    ? 'border-primary bg-primary text-ivory shadow-md'
                    : 'border-primary/15 bg-white/70 text-secondary hover:border-primary/30'
                  }`}
              >
                <input
                  type="radio"
                  name="attendance"
                  value="hadir"
                  checked={formData.attendance === 'hadir'}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value as 'hadir' })}
                  className="sr-only"
                />
                <span className="font-heading text-sm sm:text-base font-normal block">
                  {t.rsvp.attending}
                </span>
              </label>

              <label
                className={`flex-1 p-3.5 border cursor-pointer transition-all duration-300 text-center rounded-xl
                  ${formData.attendance === 'tidak_hadir'
                    ? 'border-primary bg-primary text-ivory shadow-md'
                    : 'border-primary/15 bg-white/70 text-secondary hover:border-primary/30'
                  }`}
              >
                <input
                  type="radio"
                  name="attendance"
                  value="tidak_hadir"
                  checked={formData.attendance === 'tidak_hadir'}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value as 'tidak_hadir' })}
                  className="sr-only"
                />
                <span className="font-heading text-sm sm:text-base font-normal block">
                  {t.rsvp.declining}
                </span>
              </label>
            </div>
            {fieldErrors.attendance && (
              <p className="text-red-500 text-xs mt-1 font-sans">{fieldErrors.attendance}</p>
            )}
          </div>

          {/* Guest count — only show when attending */}
          {formData.attendance === 'hadir' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label htmlFor="rsvp-guest-count" className="block font-sans text-xs uppercase tracking-wider text-primary mb-2 font-medium">
                {t.rsvp.guestCountLabel} <span className="text-accent">*</span>
              </label>
              <input
                id="rsvp-guest-count"
                type="number"
                min="1"
                max="10"
                placeholder={t.rsvp.guestCountPlaceholder}
                className={`input-field ${fieldErrors.guestCount ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}`}
                value={formData.guestCount}
                onChange={(e) => {
                  setFormData({ ...formData, guestCount: parseInt(e.target.value) || 1 });
                  if (fieldErrors.guestCount) setFieldErrors({ ...fieldErrors, guestCount: '' });
                }}
              />
              {fieldErrors.guestCount && (
                <p className="text-red-500 text-xs mt-1 font-sans">{fieldErrors.guestCount}</p>
              )}
            </motion.div>
          )}

          {/* Submit button */}
          <div className="pt-2">
            <Button type="submit" loading={loading} className="w-full">
              {t.rsvp.submit}
            </Button>
          </div>
        </motion.form>
      </div>
    </SectionWrapper>
  );
}
