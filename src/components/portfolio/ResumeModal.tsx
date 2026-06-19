import { motion, AnimatePresence } from "framer-motion";
import { Download, X, ExternalLink } from "lucide-react";
import { useEffect } from "react";

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
  url: string;
}

export function ResumeModal({ open, onClose, url }: ResumeModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Resume preview"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 24, stiffness: 280 }}
            className="relative w-full max-w-5xl h-[90vh] glass rounded-2xl overflow-hidden flex flex-col border border-[color:var(--cyan)]/30 glow-cyan"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-black/40">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[color:var(--cyan)] animate-pulse" />
                <h2 className="font-display tracking-widest text-xs text-[color:var(--cyan)]">
                  RESUME // UDIT PANDEY
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="glass inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-display tracking-widest text-[10px] hover:glow-cyan transition"
                  aria-label="Open in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> OPEN
                </a>
                <a
                  href={url}
                  download
                  className="inline-flex items-center gap-2 bg-[color:var(--cyan)] text-[color:var(--primary-foreground)] px-3 py-1.5 rounded-full font-display tracking-widest text-[10px] hover:glow-cyan transition"
                >
                  <Download className="w-3.5 h-3.5" /> DOWNLOAD
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="glass w-8 h-8 rounded-full flex items-center justify-center hover:glow-iron transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 bg-neutral-900">
              <iframe
                src={`${url}#toolbar=0&navpanes=0&view=FitH`}
                title="Resume preview"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
