"use client";

type ImageCarouselProps = {
  images: { src: string; alt: string }[];
  theme: {
    bgCard: string;
    border: string;
    textMuted: string;
    text: string;
  };
  dark: boolean;
};

export default function ImageCarousel({ images, theme, dark }: ImageCarouselProps) {
  if (images.length === 0) return null;

  const repeated = [...images, ...images, ...images];

  const cardStyle: React.CSSProperties = {
    backgroundColor: theme.bgCard,
    border: `1px solid ${theme.border}`,
  };

  return (
    <>
      <style>{`
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-1 * (100% / 3))); }
        }

        @keyframes scroll-right {
          0%   { transform: translateX(calc(-1 * (100% / 3))); }
          100% { transform: translateX(0); }
        }

        .carousel-track {
          display: flex;
          gap: 28px;
          width: max-content;
          animation: scroll-left 22s linear infinite;
          will-change: transform;
        }

        .carousel-track-reverse {
          animation-name: scroll-right;
        }

        .carousel-track-offset {
          margin-left: -240px;
        }

        .carousel-track:hover {
          animation-play-state: paused;
        }

        .carousel-row {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 15%,
            black 85%,
            transparent 100%
          );
        }

        .carousel-card {
          flex-shrink: 0;
          width: 560px;
          aspect-ratio: 16 / 10;
          border-radius: 14px;
          overflow: hidden;
          position: relative;
          transition: transform 0.5s ease;
        }

        .carousel-card:hover {
          transform: scale(1.02);
        }

        .carousel-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          user-select: none;
          -webkit-user-drag: none;
          pointer-events: none;
        }

        .carousel-card-label {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.95);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.35s ease, transform 0.35s ease;
          pointer-events: none;
          text-shadow: 0 1px 6px rgba(0,0,0,0.7);
          letter-spacing: 0.03em;
        }

        .carousel-card:hover .carousel-card-label {
          opacity: 1;
          transform: translateY(0);
        }

        .carousel-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 14px;
          border: 1.5px solid transparent;
          transition: border-color 0.3s ease;
          pointer-events: none;
        }
        .carousel-card:hover::after {
          border-color: rgba(255,255,255,0.18);
        }

        @media (max-width: 1024px) {
          .carousel-card { width: 440px; }
          .carousel-track-offset { margin-left: -180px; }
          .carousel-track { animation-duration: 18s; }
        }

        @media (max-width: 768px) {
          .carousel-card { width: 320px; }
          .carousel-track-offset { margin-left: -130px; }
          .carousel-track { animation-duration: 14s; }
        }

        @media (max-width: 480px) {
          .carousel-card { width: 250px; }
          .carousel-track-offset { margin-left: -100px; }
          .carousel-track { animation-duration: 10s; }
        }
      `}</style>

      <div className="select-none space-y-7 overflow-hidden w-full">
        {/* Top row */}
        <div className="carousel-row">
          <div className="carousel-track">
            {repeated.map((img, i) => (
              <div key={`top-${i}`} className="carousel-card" style={cardStyle}>
                <img src={img.src} alt={img.alt} draggable={false} loading="lazy" />
                <div className="carousel-card-label">{img.alt}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row — offset start position, opposite scroll direction */}
        <div className="carousel-row">
          <div className="carousel-track carousel-track-offset carousel-track-reverse">
            {repeated.map((img, i) => (
              <div key={`bot-${i}`} className="carousel-card" style={cardStyle}>
                <img src={img.src} alt={img.alt} draggable={false} loading="lazy" />
                <div className="carousel-card-label">{img.alt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}