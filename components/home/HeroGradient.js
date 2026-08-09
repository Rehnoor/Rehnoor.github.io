"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Gradient } from "@/lib/gradient";

export default function HeroGradient() {
  const canvasRef = useRef(null);
  const gradientRef = useRef(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!canvasRef.current || typeof window === "undefined") return;

    const canvas = canvasRef.current;

    // Probe support on a throwaway canvas — Safari can return a null context
    // if getContext() is called again on the real canvas with different
    // options (Gradient below requests { antialias: true }).
    const probe = document.createElement("canvas");
    const supportsWebGL = !!(
      window.WebGLRenderingContext &&
      (probe.getContext("webgl") || probe.getContext("experimental-webgl"))
    );
    if (!supportsWebGL) return;

    const gradient = new Gradient();
    gradient.initGradient("#gradient-canvas");
    gradientRef.current = gradient;

    return () => {
      gradientRef.current?.pause?.();
      gradientRef.current?.disconnect?.();
      gradientRef.current = null;
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      id="gradient-canvas"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      style={{
        backgroundImage:
          "linear-gradient(135deg, var(--gradient-color-1), var(--gradient-color-3))",
      }}
    />
  );
}
