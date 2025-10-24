"use client";

import { useLanguage } from "@/context/language";
import { translations } from "@/lib/translations";
import React from "react";

export default function ClientsStrip() {
  const { language: lang } = useLanguage();

  const outerRef = React.useRef<HTMLDivElement>(null);
  const baseSetRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);
  const [repeatCount, setRepeatCount] = React.useState(2); // mínimo

  // Velocidade constante em px/s (ajuste a gosto)
  const SPEED = 90;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX);
    setScrollLeft(trackRef.current.scrollLeft);
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - startX;
    trackRef.current.scrollLeft = scrollLeft - x;
  };
  const endDrag = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX);
    setScrollLeft(trackRef.current.scrollLeft);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !trackRef.current) return;
    const x = e.touches[0].pageX - startX;
    trackRef.current.scrollLeft = scrollLeft - x;
  };

  const clients = [
    {
      id: 1,
      image: "assets/clients/client1.png",
      name: "Client 1",
      url: "https://daltocleaning.com",
    },
    {
      id: 2,
      image: "assets/clients/client2.png",
      name: "Client 2",
      url: "https://letsbeacon.com/",
    },
    {
      id: 3,
      image: "assets/clients/client3.png",
      name: "Client 3",
      url: "https://client3website.com",
    },
    {
      id: 4,
      image: "assets/clients/client4.png",
      name: "Client 4",
      url: "https://dmscarpentry.com",
    },
  ];

  const t = (translations[lang] ?? translations.en).clients;

  // Ajusta repetições e duração com base no tamanho real
  React.useEffect(() => {
    const update = () => {
      const baseEl = baseSetRef.current;
      const outerEl = outerRef.current;
      const trackEl = trackRef.current;
      if (!baseEl || !outerEl || !trackEl) return;

      const baseWidth = baseEl.getBoundingClientRect().width; // 1 "set"
      const viewport = outerEl.getBoundingClientRect().width;

      // precisamos que a trilha animada tenha pelo menos ~2.5x viewport para sumir bem no ultrawide
      const target = Math.max(viewport * 2.5, baseWidth * 2); // sempre >= 2 sets
      const needed = Math.max(2, Math.ceil(target / baseWidth));
      setRepeatCount(needed);

      // distância de metade da trilha (para loop perfeito com cópia contínua)
      const halfDistance = (baseWidth * needed) / 2;

      // define CSS vars para animação (distância e duração)
      const duration = halfDistance / SPEED; // s = d / v
      trackEl.style.setProperty("--scroll-dist", `${halfDistance}px`);
      trackEl.style.setProperty("--scroll-duration", `${duration}s`);
    };

    update();
    // recalcular em resize
    const ro = new ResizeObserver(update);
    if (outerRef.current) ro.observe(outerRef.current);
    if (baseSetRef.current) ro.observe(baseSetRef.current);
    return () => ro.disconnect();
  }, []);

  // Array de repetições
  const repeats = React.useMemo(
    () => Array.from({ length: repeatCount }),
    [repeatCount]
  );

  return (
    <section className="bg-[#f8f8f8] py-10 text-center clients-strip">
      <h2 className="mb-8 text-2xl font-semibold text-[#102240]">{t.title}</h2>

      {/* Container com overflow hidden + máscara de borda para reforçar a ilusão */}
      <div
        ref={outerRef}
        className="relative w-full overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0, black 6%, black 94%, transparent 100%)",
        }}
      >
        {/* Track animada */}
        <div
          ref={trackRef}
          className={`flex w-max strip-track ${isDragging ? "is-paused" : ""}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={endDrag}
        >
          {/* Primeiro "set" nomeado para medição */}
          <div ref={baseSetRef} className="flex items-center gap-16 px-8">
            {clients.map((client) => (
              <a
                key={client.id}
                href={client.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[180px] grayscale hover:grayscale-0 transition-all"
              >
                <img
                  src={client.image}
                  alt={client.name}
                  className="w-full h-auto"
                />
              </a>
            ))}
          </div>

          {/* Repetições dinâmicas (inclui o “clone” e mais, se necessário) */}
          {repeats.map((_, i) => (
            <div key={`rep-${i}`} className="flex items-center gap-16 px-8">
              {clients.map((client) => (
                <a
                  key={`rep-${i}-${client.id}`}
                  href={client.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[180px] grayscale hover:grayscale-0 transition-all"
                >
                  <img
                    src={client.image}
                    alt={client.name}
                    className="w-full h-auto"
                  />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* CSS-in-JSX temporário (sem Tailwind config) */}
      <style jsx global>{`
        @keyframes clients-scroll-dynamic {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(calc(var(--scroll-dist, 600px) * -1), 0, 0);
          }
        }
        .strip-track {
          user-select: none;
          cursor: grab;
          animation: clients-scroll-dynamic var(--scroll-duration, 12s) linear
            infinite;
          will-change: transform;
        }
        .strip-track:active {
          cursor: grabbing;
        }
        .clients-strip:hover .strip-track,
        .strip-track.is-paused {
          animation-play-state: paused;
        }

        /* Ajustes responsivos opcionais */
        @media (max-width: 768px) {
          .clients-strip a.w-\[180px\] {
            width: 140px;
          }
        }
      `}</style>
    </section>
  );
}
