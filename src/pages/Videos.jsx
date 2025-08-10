// src/pages/Videos.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// src/pages/Videos.jsx (기존 파일 상단의 videos 배열)
const videos = [
  {
    id: "j3gBUdQbYz4",
    title: "크래프톤 정글 8기 KlickLab: 실시간 트래픽 분석 플랫폼",
    description: "웹 사용자의 클릭스트림 데이터를 수집·분석하여 행동 흐름과 전환을 시각화해주는 실시간 트래픽 분석 플랫폼",
    date: "2025.07.26",
    url: "https://www.youtube.com/watch?v=j3gBUdQbYz4"
  },
  // ↓ 기존 3개 계속 유지
  {
    id: "mGiruath6HA",
    title: "크래프톤 정글 8기 나만무 MVP 1차 발표",
    date: "2025.07.02",
    description: "나만의 무기 만들기 MVP 1차 발표.",
    url: "https://www.youtube.com/watch?v=mGiruath6HA",
  },
  {
    id: "qiBfjUgSFpU",
    title: "크래프톤 정글 8기 14주차 실력다지기",
    date: "2025.06.19",
    description: "14주차 실력다지기 세션 하이라이트.",
    url: "https://www.youtube.com/watch?v=qiBfjUgSFpU",
  },
  {
    id: "SJ20J24kUZw",
    title: "크래프톤 정글 8기 12-13주차 핀토스 가상메모리",
    date: "2025.06.12",
    description: "PintOS 가상 메모리 구현 과정 공유.",
    url: "https://www.youtube.com/watch?v=SJ20J24kUZw",
  },
];

export default function Videos() {
  const rootRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // 접근성: 모션 최소화 시 애니메이션 생략
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const cards = root.querySelectorAll(".video-card");
    const frames = root.querySelectorAll(".video-wrapper iframe");
    const lines = root.querySelectorAll(".divider");

    const tl = gsap.timeline();

    tl.from(
      cards,
      {
        opacity: 0,
        y: 20,
        scale: 0.98,
        duration: 0.55,
        ease: "power3.out",
        stagger: { each: 0.08, from: "start" },
        clearProps: "transform,opacity",
      },
      0
    );

    tl.from(
      frames,
      {
        autoAlpha: 0,
        duration: 0.45,
        ease: "power2.out",
        stagger: { each: 0.04 },
      },
      0.05
    );

    tl.from(
      lines,
      {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.35,
        ease: "power2.out",
        stagger: { each: 0.02 },
        clearProps: "transform",
      },
      0.12
    );

    return () => tl.kill();
  }, []);

  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "clamp(72px, 12vh, 160px) 24px 120px", // 상단 여백 증가
      }}
    >
      <div ref={rootRef} className="video-grid">
        {videos.map((v) => (
          <article key={v.id} className="video-card" title={v.title}>
            <div className="video-wrapper" aria-label={v.title}>
              <iframe
                title={v.title}
                src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>

            <div className="video-body">
              <h3 className="video-title">
                {v.url ? (
                  <a href={v.url} target="_blank" rel="noopener noreferrer">
                    {v.title} <span className="highlight">↗</span>
                  </a>
                ) : (
                  v.title
                )}
              </h3>

              <div className="divider" />

              {v.description && <p className="video-desc">{v.description}</p>}

              {v.date && (
                <>
                  <div className="divider" />
                  <p className="video-date">{v.date}</p>
                </>
              )}
            </div>
          </article>
        ))}
      </div>

      <style>{`
          /* ====== Grid: 중앙 정렬 + 고정 폭 컬럼 ====== */
          .video-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, 450px);
            gap: 20px 24px;
            justify-content: center;   /* 가로 중앙 정렬 */
            align-content: start;      
            max-width: 100%;
            margin: 0 auto;
          }

          @media (max-width: 420px) {
            .video-grid { grid-template-columns: 1fr; }
          }

          .video-card {
            display: flex;
            flex-direction: column;
            gap: 10px;
            border: 1px solid #202020;
            background: rgba(0,0,0,0.35);
            transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
            will-change: transform, opacity;
            backface-visibility: hidden;
            width: 450px;  /* 카드 폭 고정 */
          }
          .video-card:hover {
            transform: translateY(-6px);
            border-color: #03ff95;
            box-shadow: 0 18px 28px rgba(0,0,0,.35);
          }

          .video-wrapper {
            position: relative;
            width: 100%;
            padding-top: 56.25%;   
            border-radius: 0;
            overflow: hidden;
            background: radial-gradient(120% 120% at 0% 0%, #0b1220, #000);
          }
          .video-wrapper iframe {
            position: absolute; inset: 0; width: 100%; height: 100%; border: 0;
          }

          .video-body {
            display: flex; flex-direction: column; gap: 8px;
            padding: 10px 12px;
            font-family: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", "Courier New", monospace;
          }
          .video-title { font-size: 1.08rem; font-weight: 500; margin: 0; color: #fff; }
          .video-title a { color: inherit; text-decoration: none; }
          .video-title a:hover { text-decoration: underline; }

          .video-desc {
            font-family: var(--body-font, "Pretendard Variable", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans KR", sans-serif);
            font-size: 0.92rem; color: #d8d8d8; line-height: 1.42; margin: 0;
            font-variation-settings: "wght" 700;
          }
          .video-date { font-size: 0.86rem; color: #aeb4bd; margin: 0; }

          .divider {
            height: 1px; width: 100%;
            background: linear-gradient(90deg, rgba(255,255,255,0.06), rgba(255,255,255,0.14), rgba(255,255,255,0.06));
            transform-origin: left center;
          }
        `}</style>
    </main>
  );
}