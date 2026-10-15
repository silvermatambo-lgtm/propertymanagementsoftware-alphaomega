import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Phone, MessageCircle, FileText } from 'lucide-react';

const SLIDES = [
  {
    image: 'https://i.imgur.com/7dTi44k.jpeg',
    tag: 'Premium Stone Solutions',
    heading: 'Elevate Your Space With',
    highlight: 'Natural Granite',
    sub: 'Superior quality granite countertops and surfaces crafted to perfection for your home or business.',
  },
  {
    image: 'https://i.imgur.com/9uJGT7h.jpeg',
    tag: 'Expert Craftsmanship',
    heading: 'Timeless Beauty of',
    highlight: 'Marble & Quartz',
    sub: 'From kitchen countertops to bathroom vanities — we bring elegance and durability to every surface.',
  },
  {
    image: 'https://i.imgur.com/lqogvWX.jpeg',
    tag: 'Residential & Commercial',
    heading: 'Transform Your World With',
    highlight: 'Premium Porcelain',
    sub: 'Stunning wall cladding, bar tops, and reception counters that make a lasting impression.',
  },
];

const TYPING_INTERVAL = 70;
const SLIDE_DURATION = 6000;

function useTypingEffect(text: string, active: boolean) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) { setDisplayed(''); setDone(false); return; }
    setDisplayed('');
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, TYPING_INTERVAL);
    return () => clearInterval(id);
  }, [text, active]);

  return { displayed, done };
}

function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(true);

  const goTo = useCallback((idx: number) => {
    setAnimating(false);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(true);
    }, 50);
  }, []);

  const next = useCallback(() => goTo((current + 1) % SLIDES.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + SLIDES.length) % SLIDES.length), [current, goTo]);

  useEffect(() => {
    const id = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(id);
  }, [next]);

  const slide = SLIDES[current];
  const { displayed, done } = useTypingEffect(slide.highlight, animating);

  return (
    <section className="relative w-full h-screen min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Background images */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: 0 }}
        >
          <img
            src={s.image}
            alt={`Slide ${i + 1}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            {/* Tag */}
            <div
              key={`tag-${current}`}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 mb-5 ${animating ? 'animate-fade-in' : 'opacity-0'}`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-300 text-xs font-semibold tracking-widest uppercase">{slide.tag}</span>
            </div>

            {/* Heading */}
            <h1
              key={`h-${current}`}
              className={`text-white text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-2 ${animating ? 'animate-slide-left' : 'opacity-0'}`}
            >
              {slide.heading}
            </h1>

            {/* Typing highlight */}
            <h2 className="text-amber-400 text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
              <span>{displayed}</span>
              {!done && <span className="typing-cursor" />}
            </h2>

            {/* Sub */}
            <p
              key={`sub-${current}`}
              className={`text-stone-200 text-base md:text-lg leading-relaxed mb-8 max-w-lg ${animating ? 'animate-fade-up delay-300' : 'opacity-0'}`}
            >
              {slide.sub}
            </p>

            {/* CTAs */}
            <div
              key={`cta-${current}`}
              className={`flex flex-wrap gap-3 ${animating ? 'animate-fade-up delay-500' : 'opacity-0'}`}
            >
              <a
                href="tel:+27833522647"
                className="inline-flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-white font-semibold rounded-lg text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Phone size={16} /> Call Now
              </a>
              <a
                href="https://wa.me/27783007127?text=Hi%2C%20I%20would%20like%20a%20quote%20for%20stone%20installation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <WaIcon /> WhatsApp
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 border-2 border-white/40 hover:border-amber-400 text-white hover:text-amber-400 font-semibold rounded-lg text-sm transition-all duration-300 backdrop-blur-sm"
              >
                <FileText size={16} /> Request Quote
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full glass text-white hover:bg-amber-500/30 flex items-center justify-center transition-all duration-200"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full glass text-white hover:bg-amber-500/30 flex items-center justify-center transition-all duration-200"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-8 h-2 bg-amber-400'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Floating badge */}
      <div className="absolute bottom-12 right-6 z-30 hidden md:block animate-float">
        <div className="glass rounded-2xl px-4 py-3 text-center">
          <p className="text-amber-400 font-bold text-2xl" style={{ fontFamily: 'Playfair Display, serif' }}>15+</p>
          <p className="text-white text-xs">Years Experience</p>
        </div>
      </div>
    </section>
  );
}
