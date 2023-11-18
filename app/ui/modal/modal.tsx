"use client";

import "./modal.css";

import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    (e) => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss()
      }
    },
    [onDismiss, overlay, wrapper]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [onKeyDown]);

  return (
    <div
      ref={overlay}
      className="ModalOverlay fixed z-[30000] left-0 right-0 top-0 bottom-0 mx-auto bg-black/40"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="absolute"
        style={{
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -40%)",
        }}
      >
        {children}
      </div>
    </div>
  )
}