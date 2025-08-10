// src/pages/Korean.jsx
import { useState, useEffect, useRef } from 'react';
import '../index.css';
import VariableProximity from '../components/VariableProximity';
import ProfilePopup from "../components/ProfilePopup";
import { Link } from 'react-router-dom';

function Korean({ isMobile }) {
  const [langKo, setLangKo] = useState(true);
  const containerRef = useRef(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const faders = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('appear');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    faders.forEach(fader => observer.observe(fader));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* 전역 네비는 App.jsx에서 렌더링됨 */}

      <main>
        <div id="lang-ko" className={`lang-content ${langKo ? 'active' : ''}`}>
          <section id="home">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <h1
                onClick={() => setShowProfile(prev => !prev)}
                style={{
                  fontSize: "6rem",
                  fontWeight: 100,
                  fontVariationSettings: "'wght' 800",
                  fontFamily: "'Pretendard Variable', sans-serif",
                  margin: "0 0 0.5rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  cursor: "pointer",
                  transition: "color 0.3s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#03ff95";
                  e.currentTarget.style.textDecoration = "underline";
                  e.currentTarget.style.transform = "scale(1.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "";
                  e.currentTarget.style.textDecoration = "none";
                  e.currentTarget.style.transform = "scale(1)";
                }}
                title="View Profile"
              >
                Lee Hyunjae
              </h1>

              <p
                style={{
                  fontSize: "0.9rem",
                  margin: "0 0 1.5rem",
                  color: "#aaa",
                  fontWeight: 400,
                  lineHeight: 1.4,
                  animation: "blinkFade 1.5s ease-in-out infinite",
                }}
              >
                <span>
                  이름을 클릭해보세요 <span className="highlight">↗</span>
                </span>
              </p>
            </div>

            <ProfilePopup show={showProfile} onClose={() => setShowProfile(false)} />

            <div ref={containerRef}>
              {!isMobile ? (
                <VariableProximity
                  label="바라는 사람이 아닌, 행동하는 사람"
                  fromFontVariationSettings="'wght' 100"
                  toFontVariationSettings="'wght' 900"
                  containerRef={containerRef}
                  radius={120}
                  falloff="linear"
                  style={{ display: "block", fontSize: "1.6rem", marginBottom: "1rem" }}
                />
              ) : (
                <h3 className="tagline" style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>
                  바라는 사람이 아닌, <strong>행동하는 사람</strong>
                </h3>
              )}
            </div>
          </section>

          <section id="experience">
            <h2>◳ 경험</h2>
            <ul>
              <li>
                <a href="https://jungle.krafton.com/program/info#info" target="_blank">
                  KRAFTON JUNGLE <span className="highlight">↗ </span>
                </a>
                — 소프트웨어 개발자 양성 부트캠프, 25.03 - 07
              </li>
              <li>
                <a href="https://github.com/Computer-Hardware-Industry-Perspective" target="_blank">
                  C.H.I.P <span className="highlight">↗ </span>
                </a>
                — 컴퓨터 하드웨어 분해/조립 · 산업트렌드 리서치 동아리, 25.03 - 06
              </li>
            </ul>
          </section>


          <section id="projects">
            <h2>
              <Link to="/projects" style={{ textDecoration: "none", color: "#fff" }}>
                ◰ 프로젝트 모아보기 <span className="highlight">↗</span>
              </Link>
            </h2>
          </section>

          <section id="videos">
            <h2>
              <Link to="/videos" style={{ textDecoration: "none", color: "#fff" }}>
                ◱ 영상 모아보기 <span className="highlight">↗</span>
              </Link>
            </h2>
          </section>



          <section id="skills">
            <h2>◲ 기술 스택</h2>
            <details>
              <summary><strong>펼쳐보기 / 접기</strong></summary>

              <h3>프로그래밍 언어</h3>
              <p>C, Python</p>

              <h3>웹 프론트엔드</h3>
              <p>React</p>

              <h3>웹 백엔드</h3>
              <p>Node.js, Express</p>

              <h3>데이터베이스</h3>
              <p>MongoDB, Clickhouse</p>

              <h3>인프라 및 운영</h3>
              <p>Linux, Docker, Nginx, AWS (EC2, S3, ALB, NLB, Auto Scaling)</p>

              <h3>분산 시스템 / 스트리밍</h3>
              <p>Apache Kafka – Amazon MSK</p>
            </details>
          </section>

          <section id="now">
            <h2>◳ 지금 하고 있는 것들</h2>
            <ul>
              <li>React 기반 포트폴리오 사이트 개발 및 무중단 배포</li>
              <li>KlickLab 인프라 구조 정리 및 기술/최적화 과정 문서화</li>
              <li>AI 모델 경량화 기법에 대한 이론 학습</li>
            </ul>
          </section>

          <section id="future">
            <h2>◰ 앞으로 하고 싶은 것들</h2>
            <ul>
              <li>센서 데이터를 활용한 자율 시스템의 제어 구조 학습</li>
              <li>경량화된 AI 모델을 활용해 라즈베리파이로 자율 주행 로봇 제작</li>
              <li>창업 – 실제 문제를 해결하는 제품/기술 만들기</li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}

export default Korean;
