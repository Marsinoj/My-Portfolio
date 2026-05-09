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

  const repeated = [...images, ...images, ...images, ...images, ...images];

  const cardStyle: React.CSSProperties = {
    backgroundColor: theme.bgCard,
    border: `1px solid ${theme.border}`,
  };

  return (
    <>
      <style>{`
        @keyframes scroll-rtl {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-1 * (100% / 5))); }
        }
        @keyframes scroll-ltr {
          0%   { transform: translateX(calc(-1 * (100% / 5))); }
          100% { transform: translateX(0); }
        }

        .carousel-track-rtl {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: scroll-rtl 30s linear infinite;
          pointer-events: none;
        }
        .carousel-track-ltr {
          display: flex;
          gap: 20px;
          width: max-content;
          animation: scroll-ltr 30s linear infinite;
          pointer-events: none;
        }

        .carousel-fade {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .carousel-card {
          flex-shrink: 0;
          width: 320px;
          height: 220px;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          pointer-events: auto;
        }

        .carousel-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          user-select: none;
          -webkit-user-drag: none;
          pointer-events: none;
          transition: filter 0.4s ease, transform 0.5s ease;
        }

        .carousel-card:hover img {
          filter: brightness(0.55);
          transform: scale(1.05);
        }

        .carousel-card-label {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.95);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.3s ease, transform 0.3s ease;
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
          border-radius: 16px;
          border: 1.5px solid transparent;
          transition: border-color 0.3s ease;
          pointer-events: none;
        }
        .carousel-card:hover::after {
          border-color: rgba(255,255,255,0.18);
        }

        @media (max-width: 768px) {
          .carousel-card {
            width: 240px;
            height: 170px;
          }
        }

        @media (max-width: 480px) {
          .carousel-card {
            width: 180px;
            height: 140px;
          }
        }
      `}</style>

      <div className="select-none space-y-4 overflow-hidden w-full">
        {/* Top row — scrolls right to left */}
        <div className="carousel-fade">
          <div className="carousel-track-rtl">
            {repeated.map((img, i) => (
              <div key={`top-${i}`} className="carousel-card" style={cardStyle}>
                <img src={img.src} alt={img.alt} draggable={false} />
                <div className="carousel-card-label">{img.alt}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row — scrolls left to right */}
        <div className="carousel-fade">
          <div className="carousel-track-ltr">
            {repeated.map((img, i) => (
              <div key={`bot-${i}`} className="carousel-card" style={cardStyle}>
                <img src={img.src} alt={img.alt} draggable={false} />
                <div className="carousel-card-label">{img.alt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}