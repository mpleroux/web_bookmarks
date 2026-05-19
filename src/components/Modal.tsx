"use client";

import type { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div
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
