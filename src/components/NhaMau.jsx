// NhaMau.jsx
import { useState, useEffect, useRef } from "react";
import "../styles/NhaMau.css";

// ── Import ảnh thật vào đây ───────────────────────────────────────────────────
// import img1 from "../assets/images/canho/nha-mau-1.jpg";
// import img2 from "../assets/images/canho/nha-mau-2.jpg";
// import img3 from "../assets/images/canho/nha-mau-3.jpg";
// import img4 from "../assets/images/canho/nha-mau-4.jpg";

// Placeholder tạm – xóa khi có ảnh thật
const IMAGES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=80",
    alt: "Nhà mẫu 1",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1200&q=80",
    alt: "Nhà mẫu 2",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    alt: "Nhà mẫu 3",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    alt: "Nhà mẫu 4",
  },
];

// Khi có ảnh thật, thay bằng:
// const IMAGES = [
//   { id: 1, src: img1, alt: "Nhà mẫu 1" },
//   { id: 2, src: img2, alt: "Nhà mẫu 2" },
//   { id: 3, src: img3, alt: "Nhà mẫu 3" },
//   { id: 4, src: img4, alt: "Nhà mẫu 4" },
// ];

const INTERVAL_MS = 5000;

export default function NhaMau() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [fullscreenIdx, setFullscreenIdx] = useState(null);
  const sectionRef = useRef(null);
  const timerRef = useRef(null);

  // ── IntersectionObserver: bắt đầu / dừng auto-slide theo visibility ────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.4 }, // 40% section phải nằm trong viewport
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // ── Auto-slide: chỉ chạy khi section đang visible ─────────────────────────
  useEffect(() => {
    if (!isVisible) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % IMAGES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timerRef.current);
  }, [isVisible]);

  // ── Click thumbnail: chọn ảnh + reset timer ───────────────────────────────
  const handleThumbClick = (idx) => {
    setActiveIdx(idx);
    // Reset timer để tránh nhảy ngay sau khi click
    clearInterval(timerRef.current);
    if (isVisible) {
      timerRef.current = setInterval(() => {
        setActiveIdx((prev) => (prev + 1) % IMAGES.length);
      }, INTERVAL_MS);
    }
  };

  // ── Handle fullscreen image click ──────────────────────────────────────────
  const handleImageClick = () => {
    setFullscreenIdx(activeIdx);
  };

  const closeFullscreen = () => {
    setFullscreenIdx(null);
  };

  return (
    <section className="nm" id="nha-mau" ref={sectionRef}>
      <div className="nm__container">
        {/* Title */}
        <div className="nm__text">
          <h2 className="nm__title">Hình Ảnh Phối Cảnh</h2>
          <p className="nm__subtitle">
            Nội thất hoàn thiện cao cấp · Bàn giao theo tiêu chuẩn
          </p>
        </div>

        {/* Gallery */}
        <div className="nm__gallery">
          {/* Ảnh chính */}
          <div className="nm__main">
            {IMAGES.map((img, idx) => (
              <img
                key={img.id}
                src={img.src}
                alt={img.alt}
                className={`nm__main-img${activeIdx === idx ? " nm__main-img--active" : ""}`}
                onClick={handleImageClick}
                style={{ cursor: "pointer" }}
              />
            ))}

            {/* Progress bar */}
            <div className="nm__progress">
              {IMAGES.map((_, idx) => (
                <button
                  key={idx}
                  className={`nm__progress-dot${activeIdx === idx ? " nm__progress-dot--active" : ""}`}
                  onClick={() => handleThumbClick(idx)}
                  aria-label={`Xem ảnh ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="nm__thumbs">
            {IMAGES.map((img, idx) => (
              <button
                key={img.id}
                className={`nm__thumb${activeIdx === idx ? " nm__thumb--active" : ""}`}
                onClick={() => handleThumbClick(idx)}
                aria-label={img.alt}
              >
                <img src={img.src} alt={img.alt} />
                {/* Overlay khi active */}
                <span className="nm__thumb-border" />
              </button>
            ))}
          </div>

          {/* Fullscreen Image Viewer */}
          {fullscreenIdx !== null && (
            <>
              {/* Overlay */}
              <div
                className="nm__fullscreen-overlay"
                onClick={closeFullscreen}
              ></div>

              {/* Fullscreen Container */}
              <div className="nm__fullscreen">
                <button
                  className="nm__fullscreen-close"
                  onClick={closeFullscreen}
                >
                  ✕
                </button>
                <img
                  src={IMAGES[fullscreenIdx].src}
                  alt={IMAGES[fullscreenIdx].alt}
                  className="nm__fullscreen-img"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
