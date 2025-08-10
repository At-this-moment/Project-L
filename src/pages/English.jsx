import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import Logo from '../components/Logo';
import VariableProximity from '../components/VariableProximity';
import ProfilePopup from "../components/ProfilePopup";
import "../components/ProfileCard.css";

function English({ isMobile }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
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

  const toggleMobile = () => setMobileOpen(prev => !prev);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <a href="#home" onClick={(e) => {
          e.preventDefault();
          document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
        }} />
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
            navigate('/ko');
          }}
        >
          Korean
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
            navigate('/ko');
            setMobileOpen(false);
          }}
        >
          한국어
        </a>
      </nav>

      <main>
        <div className="lang-content active">
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
                <span className="highlight">Click the name to view profile ↗</span>
              </p>
            </div>

            <ProfilePopup show={showProfile} onClose={() => setShowProfile(false)} />

            <div ref={containerRef}>
              {!isMobile ? (
                <VariableProximity
                  label="Be a doer, not just a dreamer."
                  fromFontVariationSettings="'wght' 100"
                  toFontVariationSettings="'wght' 900"
                  containerRef={containerRef}
                  radius={120}
                  falloff="linear"
                  style={{ display: "block", fontSize: "1.6rem", marginBottom: "1rem" }}
                />
              ) : (
                <h3 className="tagline" style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>
                  Be a doer, <strong>not just a dreamer.</strong>
                </h3>
              )}
            </div>
          </section>

          <section id="projects">
            <h2>◰ Projects</h2>
            <ul>
              <li><a href="https://github.com/Eatventory" target="_blank"><span className="highlight">KlickLab ↗</span></a> — Clickstream analytics platform</li>
              <li><a href="https://github.com/At-this-moment/Rescue-Recon-Rover" target="_blank"><span className="highlight">Rescue Recon Rover ↗</span></a> — Disaster Site Data Collection Robot</li>
            </ul>
          </section>

          <section id="experience">
            <h2>◳ Experience</h2>
            <ul>
              <li><a href="https://jungle.krafton.com/program/info#info" target="_blank"><span className="highlight">KRAFTON JUNGLE ↗</span></a> — Software Engineering Bootcamp, 2025</li>
              <li><a href="https://github.com/Computer-Hardware-Industry-Perspective" target="_blank"><span className="highlight">C.H.I.P ↗</span></a> — Hardware teardown · Industry trend research</li>
            </ul>
          </section>

          <section id="skills">
            <h2>◲ Skills</h2>
            <details>
              <summary><strong>Expand / Collapse</strong></summary>

              <h3>Languages</h3>
              <p>C, Python</p>

              <h3>Web Frontend</h3>
              <p>React</p>

              <h3>Web Backend</h3>
              <p>Node.js, Express</p>

              <h3>Databases</h3>
              <p>MongoDB, ClickHouse</p>

              <h3>Infrastructure & Operations</h3>
              <p>Linux, Docker, Nginx, AWS (EC2, S3, ALB, NLB, Auto Scaling)</p>

              <h3>Distributed Systems / Streaming</h3>
              <p>Apache Kafka – Amazon MSK</p>
            </details>
          </section>

          <section id="now">
            <h2>◱ What I'm Working On Now</h2>
            <ul>
              <li>Developing a React-based portfolio site with zero-downtime deployment</li>
              <li>Documenting the infrastructure design and optimization process of KlickLab</li>
              <li>Studying AI model compression techniques such as quantization and pruning</li>
            </ul>
          </section>

          <section id="future">
            <h2>◰ What I Want to Explore Next</h2>
            <ul>
              <li>Learning control architectures for autonomous systems using sensor data</li>
              <li>Building a self-driving robot using Raspberry Pi and a compressed AI model</li>
              <li>Creating products and technologies that solve real-world problems</li>
            </ul>
          </section>

          <footer>
            <p>"Action first, even if it's imperfect." — <a href="mailto:qnfdlf1997@gmail.com">email me</a></p>
          </footer>
        </div>
      </main>
    </>
  );
}

export default English;