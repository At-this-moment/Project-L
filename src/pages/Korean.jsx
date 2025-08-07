import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import '../index.css';
import Logo from '../components/Logo';
import VariableProximity from '../components/VariableProximity';
import ProfileCard from "../components/ProfileCard";
import "../components/ProfileCard.css";
import ProfilePopup from "../components/ProfilePopup";
import GradientText from '../components/GradientText'; 



function Korean({ isMobile }) {
  const [langKo, setLangKo] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const containerRef = useRef(null);

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

  const toggleLang = () => setLangKo(prev => !prev);
  const toggleMobile = () => setMobileOpen(prev => !prev);
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <a href="#home" onClick={(e) => {
          e.preventDefault();
          document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
        }}>
        </a>
        <a href="#home" onClick={(e) => {
          e.preventDefault();
          document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
        }}>Home</a>
        <a href="#projects" onClick={(e) => {
          e.preventDefault();
          document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        }}>Projects</a>
        <a href="https://velog.io/@qnfrma1997/series" target="_blank" rel="noopener noreferrer">Velog</a>
        <a href="https://github.com/At-this-moment" target="_blank" rel="noopener noreferrer">Github</a>
        <a
          href="#"
          className="lang-toggle"
          onClick={(e) => {
            e.preventDefault();
            navigate('/en');
          }}
        >
          English
        </a>
      </nav>

      {/* Mobile Header & Hamburger */}
      <div className="mobile-header">
        <button className="hamburger" onClick={toggleMobile}>☰</button>
        <div className="logo-mobile">
          <Logo width={48} height={48} isMobile={isMobile} />
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav id="mobile-nav" className={`mobile-nav ${mobileOpen ? 'show' : ''}`}>
        <a href="#home" onClick={(e) => {
          e.preventDefault();
          document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
          setMobileOpen(false);
        }}>Home</a>
        <a href="#projects" onClick={(e) => {
          e.preventDefault();
          document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
          setMobileOpen(false);
        }}>Projects</a>
        <a href="https://velog.io/@qnfrma1997/series" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>Velog</a>
        <a href="https://github.com/At-this-moment" target="_blank" rel="noopener noreferrer" onClick={() => setMobileOpen(false)}>Github</a>
        <a
          href="#"
          className="lang-toggle"
          onClick={(e) => {
            e.preventDefault();
            navigate('/en');
            setMobileOpen(false);
          }}
        >
          English
        </a>
      </nav>




      <main>
        <div id="lang-ko" className={`lang-content ${langKo ? 'active' : ''}`}>
          {/* 한국어 콘텐츠 전체 복사 및 붙여넣기 */}
          
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
                <span className="highlight">↑ 이름을 클릭해보세요.</span>
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







          <section id="projects">
            <h2>◰ 프로젝트</h2>
            <ul>
              <li><a href="https://github.com/Eatventory" target="_blank"><span className="highlight">KlickLab</span></a> — 클릭스트림 분석 플랫폼</li>
              <li><strong>재난현장 정보수집 로봇</strong> — 요구조자의 위치를 파악하기 위한 궤도 로봇</li>
            </ul>
          </section>

          <section id="experience">
            <h2>◳ 경험</h2>
            <ul>
              <li><a href="https://jungle.krafton.com/program/info#info" target="_blank"><span className="highlight">KRAFTON JUNGLE</span></a> — 소프트웨어 개발자 양성 부트캠프, 25.03 - 07</li>
              <li><a href="https://github.com/Computer-Hardware-Industry-Perspective" target="_blank"><span className="highlight">C.H.I.P</span></a> — 컴퓨터 하드웨어 분해/조립 · 산업트렌드 리서치 동아리, 25.03 - 06</li>
            </ul>
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
            <h2>◱ 지금 하고 있는 것들</h2>
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

          <footer>
            <p>"서툴지언정 늘 행동이 먼저이기를" — <a href="mailto:qnfdlf1997@gmail.com">email me</a></p>
          </footer>
        </div>
      </main>
    </>
  );
}

export default Korean;