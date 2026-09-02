import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from './ui/SectionWrapper';
import Ornament from './ui/Ornament';
import Button from './ui/Button';
import { getWishes, submitWish, ApiError } from '../lib/api';
import type { WishData, WishInput } from '../types';
import { useLanguage } from '../context/LanguageContext';

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function Wishes() {
  const { t, language } = useLanguage();
  const [wishes, setWishes] = useState<WishData[]>([]);
  const [formData, setFormData] = useState<WishInput>({ name: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const formatTimeAgo = (dateStr: string): string => {
    const now = new Date();
    const date = new Date(dateStr);
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 60) return t.wishes.justNow;
    if (seconds < 3600) {
      const mins = Math.floor(seconds / 60);
      return `${mins} ${t.wishes.minsAgo}`;
    }
    if (seconds < 86400) {
      const hrs = Math.floor(seconds / 3600);
      return `${hrs} ${t.wishes.hoursAgo}`;
    }
    if (seconds < 2592000) {
      const days = Math.floor(seconds / 86400);
      return `${days} ${t.wishes.daysAgo}`;
    }
    return date.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Fetch wishes on mount
  useEffect(() => {
    async function fetchWishes() {
      try {
        const response = await getWishes();
        if (response.data) {
          setWishes(response.data);
        }
      } catch {
        console.error('Failed to fetch wishes');
      } finally {
        setFetchLoading(false);
      }
    }
    fetchWishes();
  }, []);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = t.wishes.nameRequired;
    }
    if (!formData.message.trim()) {
      errors.message = t.wishes.messageRequired;
    } else if (formData.message.trim().length > 500) {
      errors.message = t.wishes.messageMax;
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
      const response = await submitWish({
        name: formData.name.trim(),
        message: formData.message.trim(),
      });

      // Optimistic update — add to top of list
      if (response.data) {
        setWishes((prev) => [response.data!, ...prev]);
      }

      // Reset form
      setFormData({ name: '', message: '' });
      setFieldErrors({});
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
        setError(t.wishes.serverError);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper id="wishes" bg="warm" className="py-20 md:py-28">
      <div className="max-w-2xl mx-auto text-center w-full px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-subtitle"
        >
          {t.wishes.subtitle}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="section-title mb-4"
        >
          {t.wishes.title}
        </motion.h2>

        <Ornament type="divider" className="mb-8 w-44 mx-auto" />

        {/* Wish form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="card-elegant mb-10 text-left !p-6 sm:!p-8"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 mb-4 rounded-xl text-xs font-sans">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="wish-name" className="block font-sans text-xs uppercase tracking-wider text-primary mb-2 font-medium">
                {t.wishes.nameLabel} <span className="text-accent">*</span>
              </label>
              <input
                id="wish-name"
                type="text"
                placeholder={t.wishes.namePlaceholder}
                className={`input-field ${fieldErrors.name ? 'border-red-400' : ''}`}
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

            <div>
              <label htmlFor="wish-message" className="block font-sans text-xs uppercase tracking-wider text-primary mb-2 font-medium">
                {t.wishes.messageLabel} <span className="text-accent">*</span>
              </label>
              <textarea
                id="wish-message"
                rows={3}
                placeholder={t.wishes.messagePlaceholder}
                className={`input-field resize-none ${fieldErrors.message ? 'border-red-400' : ''}`}
                value={formData.message}
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (fieldErrors.message) setFieldErrors({ ...fieldErrors, message: '' });
                }}
                maxLength={500}
              />
              <div className="flex justify-between mt-1">
                {fieldErrors.message ? (
                  <p className="text-red-500 text-xs font-sans">{fieldErrors.message}</p>
                ) : (
                  <span />
                )}
                <span className="text-xs text-secondary/50 font-sans">
                  {formData.message.length}/500
                </span>
              </div>
            </div>

            <Button type="submit" loading={loading} className="w-full">
              {t.wishes.submit}
            </Button>
          </div>
        </motion.form>

        {/* Wishes list */}
        <div className="max-h-[420px] overflow-y-auto space-y-3.5 px-1 scrollbar-thin">
          {fetchLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full" />
            </div>
          ) : wishes.length === 0 ? (
            <p className="text-secondary/60 font-body text-base py-8">
              {t.wishes.empty}
            </p>
          ) : (
            <AnimatePresence mode="popLayout">
              {wishes.map((wish) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  layout
                  className="bg-white/90 backdrop-blur-sm border border-white/80 rounded-2xl text-left flex gap-4 !p-4 sm:!p-5 shadow-sm"
                >
                  {/* Avatar */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center border border-primary/10">
                    <span className="font-heading text-sm text-primary font-medium">
                      {getInitials(wish.name)}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="font-heading text-base text-primary truncate font-normal">
                        {wish.name}
                      </h4>
                      <span className="text-xs text-secondary/60 font-sans whitespace-nowrap">
                        {formatTimeAgo(wish.createdAt)}
                      </span>
                    </div>
                    <p className="font-body text-base text-secondary mt-1 leading-relaxed break-words">
                      {wish.message}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
