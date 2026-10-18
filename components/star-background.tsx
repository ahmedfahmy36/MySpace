"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  hasSpike: boolean;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  decay: number;
  color: string;
  sparkles: { x: number; y: number; alpha: number; size: number }[];
}

export function StarBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener("resize", handleResize);

    // Mouse movement for 3D parallax
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / width - 0.5) * 40;
      mouseRef.current.targetY = (e.clientY / height - 0.5) * 40;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Stars initialization
    const starColors = ["#ffffff", "#e0f2fe", "#fef3c7", "#ede9fe", "#bae6fd"];
    let stars: Star[] = [];

    const initStars = () => {
      stars = [];
      const count = Math.min(Math.floor((width * height) / 3500), 380);

      for (let i = 0; i < count; i++) {
        const z = Math.random() * 4 + 1; // 1 (far) to 5 (close)
        const hasSpike = z > 4.2 && Math.random() > 0.6;
        stars.push({
          x: (Math.random() - 0.5) * width * 1.5,
          y: (Math.random() - 0.5) * height * 1.5,
          z,
          size: Math.random() * 1.8 + (z > 3 ? 1.2 : 0.6),
          baseAlpha: Math.random() * 0.6 + 0.3,
          alpha: Math.random() * 0.6 + 0.3,
          twinkleSpeed: Math.random() * 0.04 + 0.015,
          twinklePhase: Math.random() * Math.PI * 2,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          hasSpike,
        });
      }
    };

    initStars();

    // Meteors
    let meteors: Meteor[] = [];

    const spawnMeteor = (forceX?: number, forceY?: number) => {
      const startX = forceX !== undefined ? forceX : Math.random() * width * 0.8;
      const startY = forceY !== undefined ? forceY : Math.random() * height * 0.4;
      const angle = (Math.PI / 4) + (Math.random() * 0.2 - 0.1); // ~45 degrees diagonal

      meteors.push({
        x: startX,
        y: startY,
        length: Math.random() * 120 + 80,
        speed: Math.random() * 10 + 14,
        angle,
        opacity: 1,
        decay: Math.random() * 0.015 + 0.012,
        color: Math.random() > 0.4 ? "#38bdf8" : "#fbbf24",
        sparkles: [],
      });
    };

    // Periodic meteor spawn
    let lastMeteorTime = Date.now();
    let nextMeteorDelay = Math.random() * 4000 + 3000;

    // Click anywhere on space to spawn a shooting star
    const handleClick = (e: MouseEvent) => {
      spawnMeteor(e.clientX, e.clientY);
    };
    window.addEventListener("click", handleClick);

    // Animation Loop
    let time = 0;

    const render = () => {
      time += 0.02;

      // Smooth mouse parallax interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Cosmic Nebulas
      const centerX = width / 2;
      const centerY = height / 2;

      // Violet / Indigo Nebula
      const g1 = ctx.createRadialGradient(
        centerX - 180 + Math.sin(time * 0.5) * 40,
        centerY - 80 + Math.cos(time * 0.4) * 30,
        50,
        centerX - 180,
        centerY - 80,
        420
      );
      g1.addColorStop(0, "rgba(99, 102, 241, 0.09)"); // Indigo
      g1.addColorStop(0.5, "rgba(168, 85, 247, 0.05)"); // Purple
      g1.addColorStop(1, "transparent");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      // Cyan / Blue Nebula
      const g2 = ctx.createRadialGradient(
        centerX + 260 + Math.cos(time * 0.3) * 50,
        centerY + 140 + Math.sin(time * 0.4) * 40,
        60,
        centerX + 260,
        centerY + 140,
        460
      );
      g2.addColorStop(0, "rgba(6, 182, 212, 0.08)"); // Cyan
      g2.addColorStop(0.5, "rgba(59, 130, 246, 0.04)"); // Blue
      g2.addColorStop(1, "transparent");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Multi-Layer Parallax Stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Twinkle
        star.twinklePhase += star.twinkleSpeed;
        star.alpha = star.baseAlpha + Math.sin(star.twinklePhase) * 0.25;

        // Parallax coordinates
        const px = centerX + star.x + (mouseRef.current.x * star.z) / 4;
        const py = centerY + star.y + (mouseRef.current.y * star.z) / 4;

        ctx.beginPath();
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.arc(px, py, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Foreground Diffraction Spikes
        if (star.hasSpike && star.alpha > 0.5) {
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.75;
          const spikeLen = star.size * 3.5;

          // Horizontal spike
          ctx.beginPath();
          ctx.moveTo(px - spikeLen, py);
          ctx.lineTo(px + spikeLen, py);
          ctx.stroke();

          // Vertical spike
          ctx.beginPath();
          ctx.moveTo(px, py - spikeLen);
          ctx.lineTo(px, py + spikeLen);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;

      // 3. Draw Meteors
      const now = Date.now();
      if (now - lastMeteorTime > nextMeteorDelay) {
        spawnMeteor();
        lastMeteorTime = now;
        nextMeteorDelay = Math.random() * 5000 + 3500;
      }

      for (let m = meteors.length - 1; m >= 0; m--) {
        const met = meteors[m];
        met.x += Math.cos(met.angle) * met.speed;
        met.y += Math.sin(met.angle) * met.speed;
        met.opacity -= met.decay;

        // Tail sparkles
        if (Math.random() > 0.3) {
          met.sparkles.push({
            x: met.x + (Math.random() - 0.5) * 6,
            y: met.y + (Math.random() - 0.5) * 6,
            alpha: met.opacity,
            size: Math.random() * 2 + 1,
          });
        }

        // Draw meteor trail
        const tailX = met.x - Math.cos(met.angle) * met.length;
        const tailY = met.y - Math.sin(met.angle) * met.length;

        const mGrad = ctx.createLinearGradient(tailX, tailY, met.x, met.y);
        mGrad.addColorStop(0, "transparent");
        mGrad.addColorStop(0.7, met.color);
        mGrad.addColorStop(1, "#ffffff");

        ctx.beginPath();
        ctx.strokeStyle = mGrad;
        ctx.lineWidth = 2.2;
        ctx.lineCap = "round";
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(met.x, met.y);
        ctx.stroke();

        // Glowing head
        ctx.beginPath();
        ctx.fillStyle = "#ffffff";
        ctx.arc(met.x, met.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Draw and update sparkles
        for (let s = met.sparkles.length - 1; s >= 0; s--) {
          const sp = met.sparkles[s];
          sp.alpha -= 0.03;
          if (sp.alpha <= 0) {
            met.sparkles.splice(s, 1);
            continue;
          }
          ctx.beginPath();
          ctx.fillStyle = met.color;
          ctx.globalAlpha = sp.alpha;
          ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;

        if (met.opacity <= 0 || met.x > width + 200 || met.y > height + 200) {
          meteors.splice(m, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Subtle cosmic vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />
    </div>
  );
}
