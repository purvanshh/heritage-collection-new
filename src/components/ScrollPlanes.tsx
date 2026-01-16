'use client';

import { useEffect, useRef, useState } from 'react';

const images = [
  { url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&h=500&fit=crop', title: 'GREEN VALLEY' },
  { url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&h=500&fit=crop', title: 'MISTY FOREST' },
  { url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=500&fit=crop', title: 'FOGGY PEAKS' },
  { url: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=400&h=500&fit=crop', title: 'RIVER BRIDGE' },
  { url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=500&fit=crop', title: 'YOSEMITE' },
  { url: 'https://images.unsplash.com/photo-1511497584788-876760111969?w=400&h=500&fit=crop', title: 'DEEP PATH' },
  { url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=500&fit=crop', title: 'HIGHLANDS' },
  { url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=500&fit=crop', title: 'LAKE BOAT' },
  { url: 'https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?w=400&h=500&fit=crop', title: 'GOLDEN HOUR' },
  { url: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=500&fit=crop', title: 'DARK WOODS' },
  { url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=500&fit=crop', title: 'PURPLE HAZE' },
  { url: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?w=400&h=500&fit=crop', title: 'ALPINE' },
  { url: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&h=500&fit=crop', title: 'STARRY NIGHT' },
  { url: 'https://images.unsplash.com/photo-1768215951564-7a24614516da?q=80&w=1328&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'ZENITH' },
  { url: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=400&h=500&fit=crop', title: 'CLOUDBREAK' },
  { url: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=500&fit=crop', title: 'WINTER SOLSTICE' },
  { url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=500&fit=crop', title: 'DESERT DUNES' },
  { url: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?w=400&h=500&fit=crop', title: 'OCEAN CLIFFS' },
  { url: 'https://images.unsplash.com/photo-1679560051933-1d6396afd1ca?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', title: 'QUIET POND' },
  { url: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=500&fit=crop', title: 'GLACIER BAY' },
  { url: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=400&h=500&fit=crop', title: 'CANYON ECHO' },
  { url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&h=500&fit=crop', title: 'TROPICAL STORM' },
  { url: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=500&fit=crop', title: 'SAVANNA SUN' },
  { url: 'https://images.unsplash.com/photo-1478479405421-ce83c92fb3ba?w=400&h=500&fit=crop', title: 'ARCTIC ICE' },
  { url: 'https://images.unsplash.com/photo-1434394354979-a235cd36269d?w=400&h=500&fit=crop', title: 'MOUNTAIN PASS' },
  { url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=500&fit=crop', title: 'SILENT GROVE' },
];

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&';

function MatrixText({ text, active }: { text: string; active: boolean }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!active) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 2;
    }, 30);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, text]);

  return <span className="font-mono tracking-wider">{displayText}</span>;
}

export default function ScrollPlanes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const planesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState<number | null>(null);

  const state = useRef({
    currentScroll: 0,
    targetScroll: 0,
    lastScroll: 0,
    velocity: 0,
  });

  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (activeImage !== null) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      state.current.targetScroll += e.deltaY;
    };

    const update = () => {
      const s = state.current;

      s.currentScroll += (s.targetScroll - s.currentScroll) * 0.08;

      const instantVelocity = s.currentScroll - s.lastScroll;
      s.velocity += (instantVelocity - s.velocity) * 0.1;
      const waveIntensity = s.velocity;
      s.lastScroll = s.currentScroll;

      // --- CONFIGURATION FIXES ---
      // 1. Increased Spacing: 300 -> 390
      // This increases the total loop size (15 * 390 = 5850px) to cover the blank space.
      const spacing = 390;
      const totalWidth = images.length * spacing;
      const halfWidth = totalWidth / 2; // ~2925px

      // 2. Extended Fade Boundaries:
      // Old: 1500 -> 2000 (Too short, caused the blank space)
      // New: 3000 -> 4800 (Keeps items visible much longer on the right side)
      const fadeStart = 3000;
      const fadeEnd = 4800;

      const viewportHeight = window.innerHeight;

      const baseWaveHeight = 180;
      const velocityMultiplier = 12;

      planesRef.current.forEach((plane, index) => {
        if (!plane) return;

        let offset = index * spacing - s.currentScroll;

        // --- INFINITE LOOP LOGIC ---
        while (offset < -halfWidth) offset += totalWidth;
        while (offset > halfWidth) offset -= totalWidth;

        // --- PHYSICS & POSITION ---
        // 2. ADJUST ANGLE
        // Old: -55. Causes items to recede too fast into the background.
        // New: -45. Pushes items more horizontally, filling the screen width.
        const baseAngle = -45 * (Math.PI / 180);
        let x = offset * Math.cos(baseAngle);
        let z = offset * Math.sin(baseAngle);

        // Slight adjustment to slope to account for wider spacing
        let y = -offset * 0.17;

        let targetRotateY = -40;

        // --- WAVE ---
        const sigma = 700;
        const normalizedOffset = offset / sigma;
        const t2 = normalizedOffset * normalizedOffset;
        let waveShape = (1 - t2) * Math.exp(-t2 / 2);

        const currentWaveHeight = baseWaveHeight + (Math.abs(waveIntensity) * velocityMultiplier);
        y -= waveShape * currentWaveHeight;

        // --- VISIBILITY & FADING ---
        const dist = Math.abs(offset);
        let opacity = 1;

        if (dist > fadeStart) {
          // Linear fade: 1 at fadeStart, 0 at fadeEnd
          opacity = 1 - (dist - fadeStart) / (fadeEnd - fadeStart);
          opacity = Math.max(0, Math.min(1, opacity));
        }

        // --- APPLY STYLES ---
        if (activeImage === index) {
          plane.style.transform = `translate3d(0px, 0px, 500px) rotateY(0deg)`;
          plane.style.zIndex = '100000';
          plane.style.opacity = '1';
          plane.style.filter = 'none';
          plane.style.display = 'flex';
        } else {
          plane.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${targetRotateY}deg)`;

          const zIndex = Math.floor(10000 - dist);
          plane.style.zIndex = zIndex.toString();

          if (activeImage !== null) {
            plane.style.opacity = (opacity * 0.3).toString();
            plane.style.filter = 'blur(10px) brightness(40%)';
          } else {
            plane.style.opacity = opacity.toString();
            plane.style.filter = 'none';
          }

          plane.style.display = opacity <= 0.01 ? 'none' : 'flex';
        }
      });

      rafId.current = requestAnimationFrame(update);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      rafId.current = requestAnimationFrame(update);
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [activeImage]);

  const closeOverlay = () => setActiveImage(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeOverlay();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-screen h-screen overflow-hidden bg-black touch-none relative"
    >
      {/* Title */}
      <div
        className={`absolute z-50 font-sans pointer-events-none transition-opacity duration-500 ${activeImage !== null ? 'opacity-0' : 'opacity-100'}`}
        style={{
          fontWeight: 600,
          letterSpacing: '-0.02em',
          top: '3vw',
          left: '3vw',
        }}
      >
        <div
          className="text-white leading-none tracking-tight font-normal"
          style={{
            fontSize: 'clamp(32px, 5vw, 64px)',
            lineHeight: 0.9,
            marginLeft: '4vw',
          }}
        >
          HERITAGE FW25/26
        </div>
        <div
          className="text-white leading-none tracking-tight font-normal"
          style={{
            fontSize: 'clamp(32px, 5vw, 64px)',
            lineHeight: 0.9,
          }}
        >
          COLLECTION
          <sup
            className="tabular-nums font-semibold tracking-normal"
            style={{
              fontSize: 'clamp(10px, 0.4em, 0.4em)',
              marginLeft: '4px',
              position: 'relative',
              top: '0.65em',
              verticalAlign: 'top',
            }}
          >
            (∞)
          </sup>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute z-50 flex items-center font-mono uppercase pointer-events-none transition-opacity duration-500 ${activeImage !== null ? 'opacity-0' : 'opacity-100'}`}
        style={{
          bottom: '3vw',
          right: '3vw',
          fontSize: '10px',
          letterSpacing: '0.05em',
          color: 'white',
        }}
      >
        scroll to surf
      </div>

      {/* 3D Container */}
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{
          perspective: '1500px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div
          className="relative flex items-center justify-center"
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {images.map((item, index) => (
            <div
              key={index}
              ref={(el) => { planesRef.current[index] = el; }}
              className="flex items-center justify-center text-white text-5xl font-bold shadow-2xl absolute group cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              onClick={() => setActiveImage(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                width: '400px',
                height: '520px',
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity, filter',
              }}
            >
              {/* Inner card content */}
              <div className="absolute inset-0 overflow-hidden box-border border border-white/10 bg-gray-900 transition-all duration-300 group-hover:border-white/50">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:opacity-40"
                  loading="eager"
                />
              </div>

              <div
                className={`absolute left-full top-1/2 flex items-center transition-opacity duration-300 ${hoveredIndex === index && activeImage === null ? 'opacity-100' : 'opacity-0'}`}
                style={{ marginLeft: '1rem', width: '300px', pointerEvents: 'none' }}
              >
                <div className="h-px bg-white w-24 mr-4 origin-left" />
                <div className="text-lg font-bold tracking-widest text-white whitespace-nowrap">
                  <MatrixText text={item.title} active={hoveredIndex === index} />
                </div>
              </div>

              <div
                className="absolute font-sans text-white/50 group-hover:text-white transition-colors"
                style={{
                  top: '-32px',
                  left: '0px',
                  fontSize: '12px',
                  letterSpacing: '0.05em',
                }}
              >
                {String(index).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay Metadata */}
      {activeImage !== null && (
        <div
          className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center animate-in fade-in duration-500"
        >
          <div className="absolute inset-0 pointer-events-auto" onClick={closeOverlay} />

          <div
            className="absolute bottom-0 left-0 w-full p-12 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none"
          >
            <h2 className="text-8xl font-bold text-white tracking-tighter mb-4 animate-in slide-in-from-bottom-10 duration-700 delay-100">
              {images[activeImage].title}
            </h2>
            <div className="flex items-center gap-6 text-white/80 font-mono text-sm uppercase tracking-[0.2em] animate-in slide-in-from-bottom-5 duration-700 delay-200">
              <span>Seq. {String(activeImage).padStart(2, '0')}</span>
              <span className="w-8 h-px bg-white/50" />
              <span>Heritage Collection</span>
            </div>
          </div>

          <button
            onClick={closeOverlay}
            className="absolute top-8 right-8 text-white hover:text-white/70 transition-colors pointer-events-auto z-[200]"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
