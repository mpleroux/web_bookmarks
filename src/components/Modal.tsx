"use client";

import type { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  // Click-outside-to-close: the backdrop's onClick fires onClose, and stopPropagation
  // on the inner div prevents clicks inside the modal from reaching it
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}>
      <div
        className="mx-4 w-full max-w-md rounded-lg bg-page-bg p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
