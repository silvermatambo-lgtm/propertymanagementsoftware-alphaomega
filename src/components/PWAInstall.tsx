import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show install prompt after a short delay
      setTimeout(() => setVisible(true), 8000);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setVisible(false);
    setDeferredPrompt(null);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-[80px] left-4 z-40 md:bottom-8 w-72 max-w-[calc(100vw-2rem)] rounded-2xl bg-white shadow-2xl border border-stone-100 overflow-hidden animate-chat-slide">
      {/* Gold top bar */}
      <div className="h-1 bg-gradient-to-r from-amber-500 to-amber-300" />

      <div className="p-4">
        <button
          onClick={() => setVisible(false)}
          aria-label="Dismiss install prompt"
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 transition-colors"
        >
          <X size={14} />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <img src="https://i.imgur.com/HBY0SWU.png" alt="App icon" className="w-12 h-12 object-contain rounded-xl border border-stone-100 p-1" />
          <div>
            <p className="font-bold text-stone-800 text-sm leading-tight">Granite Installations</p>
            <p className="text-amber-500 text-xs">Premium Stone Solutions</p>
          </div>
        </div>

        <p className="text-stone-600 text-xs leading-relaxed mb-4">
          Install this app for quick access, faster browsing, and a better mobile experience.
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={handleInstall}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-amber-500 hover:bg-amber-400 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <Download size={15} />
            Install App
          </button>
          <button
            onClick={() => setVisible(false)}
            className="px-4 py-2.5 border border-stone-200 hover:bg-stone-50 text-stone-600 text-sm font-medium rounded-xl transition-colors"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
