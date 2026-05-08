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

  const half = Math.ceil(images.length / 2);
  const topRow = images.slice(0, half);
  const bottomRow = images.slice(half);

  const cardStyle: React.CSSProperties = {
    backgroundColor: theme.bgCard,
    border: `1px solid ${theme.border}`,
  };

  return (
    <>
      <style>{`
        @keyframes marquee-rtl {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-ltr {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .marquee-rtl {
          animation: marquee-rtl 32s linear infinite;
        }
        .marquee-ltr {
          animation: marquee-ltr 32s linear infinite;
        }
        .marquee-fade {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 12%,
            black 88%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 12%,
            black 88%,
            transparent 100%
          );
        }
        .gallery-card {
          position: relative;
          overflow: hidden;
          border-radius: 14px;
          flex-shrink: 0;
          width: calc((100vw - 4 * 16px) / 3);
          height: 240px;
          transition: transform 0.4s ease, box-shadow 0.4s ease;
        }
        .gallery-card:hover {
          transform: scale(1.03);
          box-shadow: 0 16px 48px rgba(0,0,0,0.5);
        }
        .gallery-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
          transition: filter 0.4s ease;
        }
        .gallery-card:hover img {
          filter: brightness(0.6);
        }
        .gallery-card-label {
          position: absolute;
          bottom: 14px;
          left: 14px;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.35s ease, transform 0.35s ease;
          pointer-events: none;
          text-shadow: 0 1px 4px rgba(0,0,0,0.6);
        }
        .gallery-card:hover .gallery-card-label {
          opacity: 1;
          transform: translateY(0);
        }
        @media (max-width: 768px) {
          .gallery-card {
            width: calc((100vw - 4 * 12px) / 2) !important;
            height: 170px !important;
          }
        }
      `}</style>

      <div
        className="space-y-4 overflow-hidden select-none relative left-1/2 -translate-x-1/2"
        style={{ width: "100vw" }}
      >
        {/* Top row — right to left */}
        <div className="overflow-hidden marquee-fade">
          <div className="flex gap-4 marquee-rtl" style={{ width: "max-content" }}>
            {[...topRow, ...topRow, ...topRow, ...topRow].map((img, i) => (
              <div
                key={`top-${i}`}
                className="gallery-card"
                style={cardStyle}
              >
                <img src={img.src} alt={img.alt} draggable={false} />
                <div className="gallery-card-label">{img.alt}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row — left to right */}
        <div className="overflow-hidden marquee-fade">
          <div className="flex gap-4 marquee-ltr" style={{ width: "max-content" }}>
            {[...bottomRow, ...bottomRow, ...bottomRow, ...bottomRow].map((img, i) => (
              <div
                key={`bot-${i}`}
                className="gallery-card"
                style={cardStyle}
              >
                <img src={img.src} alt={img.alt} draggable={false} />
                <div className="gallery-card-label">{img.alt}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}