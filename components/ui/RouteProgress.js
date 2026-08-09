"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function RouteProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    function handleClick(e) {
      const anchor = e.target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      const isInternal = href && href.startsWith("/");
      const opensNewTab = anchor.target === "_blank";
      const modified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
      if (!isInternal || opensNewTab || modified) return;
      if (href === pathname) return;
      start();
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    finish();
  }, [pathname]);

  function start() {
    clearTimeout(timeoutRef.current);
    setVisible(true);
    setProgress(15);
    timeoutRef.current = setTimeout(() => setProgress(70), 150);
  }

  function finish() {
    clearTimeout(timeoutRef.current);
    setProgress(100);
    timeoutRef.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 250);
  }

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[200] h-0.5 w-full"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 200ms ease-out" }}
    >
      <div
        className="h-full bg-accent"
        style={{
          width: `${progress}%`,
          transition: `width ${progress === 100 ? 200 : 400}ms ease-out`,
        }}
      />
    </div>
  );
}
