import React from 'react';
import { Sparkles, ArrowRight, X, ShieldCheck } from 'lucide-react';

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  latestVersion?: string;
  downloadUrl?: string;
  releaseNotes?: string[];
}

export const UpdateModal: React.FC<UpdateModalProps> = ({
  isOpen,
  onClose,
  latestVersion = '2.0.0',
  downloadUrl = 'https://t.me/+q45jqELWagdmODBl',
  releaseNotes
}) => {
  if (!isOpen) return null;

  const handleUpdateNow = () => {
    try {
      // Opens Telegram app if installed or falls back to default browser
      window.open(downloadUrl, '_blank', 'noopener,noreferrer');
    } catch {
      window.location.href = downloadUrl;
    }
  };

  const notes = releaseNotes && releaseNotes.length > 0 ? releaseNotes : [
    'Direct Android Gallery Downloads',
    'Official Telegram Update Channel',
    'Enhanced HLS 1080p Video Player'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 select-none">
      <div className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 w-full max-w-sm space-y-4 shadow-2xl relative overflow-hidden">
        {/* Top Decorative Gradient Accent */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#e50914] via-amber-400 to-[#e50914]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close update modal"
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-slate-600 flex items-center justify-center transition-all active:scale-90"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon & Title */}
        <div className="flex items-center gap-3 pt-1">
          <div className="w-12 h-12 rounded-2xl bg-[#e50914]/10 text-[#e50914] flex items-center justify-center border border-[#e50914]/20 shadow-sm shrink-0">
            <Sparkles className="w-6 h-6 stroke-[2.25]" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 font-['Outfit'] tracking-tight leading-snug">
              New Update Available
            </h2>
            <span className="text-xs font-bold text-[#e50914] bg-[#e50914]/10 px-2.5 py-0.5 rounded-full border border-[#e50914]/20 inline-block mt-0.5">
              v{latestVersion} • Official Release
            </span>
          </div>
        </div>

        {/* Message Body */}
        <p className="text-xs font-medium text-slate-600 leading-relaxed">
          A new version of <span className="font-bold text-slate-900">AnimeWorld</span> is available with faster streaming, direct Android Gallery downloads, and enhanced Hindi Dub releases.
        </p>

        {/* What's New List */}
        <div className="bg-gray-50 rounded-2xl p-3 border border-gray-200/80 space-y-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 block">
            What's New in v{latestVersion}
          </span>
          <ul className="space-y-1.5 text-xs text-slate-700 font-semibold">
            {notes.map((note, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 pt-1">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-2xl bg-gray-100 hover:bg-gray-200 text-slate-700 text-xs font-bold transition-all active:scale-95 border border-gray-200"
          >
            Later
          </button>

          <button
            onClick={handleUpdateNow}
            className="flex-1 py-3 px-4 rounded-2xl bg-[#e50914] hover:bg-[#cc0712] text-white text-xs font-black font-['Outfit'] flex items-center justify-center gap-2 shadow-lg shadow-[#e50914]/30 transition-transform active:scale-95"
          >
            <span>Update Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
