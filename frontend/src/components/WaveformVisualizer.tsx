"use client";

import { useEffect, useRef } from "react";

interface WaveformVisualizerProps {
  isPlaying?: boolean;
  color?: string;
}

export default function WaveformVisualizer({ isPlaying = false, color = "#00CED1" }: WaveformVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bars = 40;
    const barWidth = canvas.width / bars;
    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < bars; i++) {
        const height = isPlaying
          ? Math.random() * canvas.height * 0.8 + canvas.height * 0.1
          : Math.sin(i * 0.5) * 20 + canvas.height / 2;

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, color + "40");

        ctx.fillStyle = gradient;
        ctx.fillRect(
          i * barWidth + barWidth * 0.2,
          canvas.height / 2 - height / 2,
          barWidth * 0.6,
          height
        );
      }

      if (isPlaying) {
        animationId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [isPlaying, color]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={60}
      className="w-full h-full opacity-60"
    />
  );
}
