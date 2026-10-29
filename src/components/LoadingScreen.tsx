import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1500);
    const t2 = setTimeout(() => setVisible(false), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading MTSA Property Management Software"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-navy-950 transition-opacity duration-500"
      style={{ opacity: fading ? 0 : 1 }}
    >
      <img
        src="/mtsa-logo.svg?v=2"
        alt="MTSA Holdings logo"
        className="w-28 h-28 object-contain mb-5 animate-float"
      />
      <p className="text-white text-lg font-bold tracking-wide mb-1">MTSA Holdings</p>
      <p className="text-gold-400 text-xs uppercase tracking-widest mb-6">Property Management Software</p>
      <div className="w-48 h-1 bg-navy-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gold-500 rounded-full transition-all duration-[1500ms] ease-out"
          style={{ width: '100%' }}
        />
      </div>
      <p className="mt-4 text-stone-300 text-xs tracking-widest uppercase font-medium">Loading your dashboard</p>
    </div>
  );
}
