import { useEffect, useRef } from "react";

type ExitConfirmationOverlayProps = {
  cancelLabel: string;
  confirmLabel: string;
  message: string;
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ExitConfirmationOverlay = ({
  cancelLabel,
  confirmLabel,
  message,
  title,
  onCancel,
  onConfirm,
}: ExitConfirmationOverlayProps) => {
  const cancelButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    cancelButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" && event.key !== "Enter") return;
      event.preventDefault();
      event.stopPropagation();

      if (event.key === "Escape") onCancel();
      else onConfirm();
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [onCancel, onConfirm]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-5 pointer-events-auto"
      style={{ background: "rgba(2, 3, 7, 0.76)", backdropFilter: "blur(8px)" }}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="exit-confirmation-title"
      aria-describedby="exit-confirmation-message"
      onClick={(event) => {
        event.stopPropagation();
        onCancel();
      }}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-white/15 px-6 py-6 text-center"
        style={{
          background: "rgba(8, 9, 15, 0.97)",
          boxShadow: "0 24px 80px rgba(0, 0, 0, 0.55)",
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <p
          id="exit-confirmation-title"
          className="m-0 text-[#d2a456] text-xs font-semibold uppercase tracking-[0.18em]"
        >
          {title}
        </p>
        <p
          id="exit-confirmation-message"
          className="mt-4 mb-0 text-white/85 text-base leading-relaxed"
        >
          {message}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            ref={cancelButtonRef}
            type="button"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white/70 transition-colors hover:border-white/30 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#d2a456]/60"
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="rounded-xl border border-[#d2a456]/60 bg-[#d2a456] px-4 py-2.5 text-sm font-semibold text-[#15120d] transition-colors hover:bg-[#e0b66e] focus:outline-none focus:ring-2 focus:ring-[#d2a456]/60"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
