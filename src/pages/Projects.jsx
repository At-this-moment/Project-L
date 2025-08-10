// src/pages/Projects.jsx
import { useEffect, useState } from "react";
import ChromaGrid from "../components/ChromaGrid";

const items = [
  {
    image: "/images/posters/1_3R.png",
    title: <>3R <span className="highlight">↗</span></>,
    subtitle: "Rescue Recon Rover",
    date: "2024.10 – 2025.01",
    description: "재난 현장에서 구조대의 신속한 의사결정을 지원하는 궤도형 탐사 로봇입니다. 적외선 카메라로 생존자를 식별하고, 가스 센서로 유해 가스를 탐지하며, 험난한 지형에서도 안정적으로 주행해 인명 구조와 위험 지역 정찰을 동시에 수행합니다.",
    borderColor: "#3b82f6",
    gradient: "linear-gradient(145deg,#1f2a44,#000)",
    url: "https://github.com/At-this-moment/Rescue-Recon-Rover"
  },
  {
    image: "/images/posters/2_Digital_Fortune_Cookie.png",
    title: <>DigitalFortuneCookie <span className="highlight">↗</span></>,
    subtitle: "Don't wait for luck. Come and take it.",
    date: "2024.10 – 2025.01",
    description: "운세를 랜덤으로 제공하는 디지털 포춘 쿠키 웹 애플리케이션입니다. 사용자는 하루 한 번 포춘 쿠키를 열 수 있고, 지난 7일 간의 행운 점수를 확인하거나 운세 랭킹을 확인할 수 있습니다.",
    borderColor: "#22d3ee",
    gradient: "linear-gradient(180deg,#0ea5e9,#000)",
    url: "https://github.com/At-this-moment/KRAFTON-JUNGLE-W0-Digital-Fortune-Cookie"
  },
  {
    image: "/images/posters/3_chip.png",
    title: <>C.H.I.P <span className="highlight">↗</span></>,
    subtitle: "Computer HW Perspective",
    date: "2024.10 – 2025.01",
    description: "칩스는 소프트웨어뿐만 아니라 하드웨어 전반에 관심 있는 사람들이 모여 함께 배우고 경험을 나누는 모임입니다. CPU, GPU, 메모리, 저장장치, 냉각 시스템, 반도체 제조 공정 등 다양한 하드웨어 주제를 다루며, 직접 실습과 토론을 통해 구조와 원리를 깊이 이해했습니다.",
    borderColor: "#60a5fa",
    gradient: "linear-gradient(165deg,#0b3d91,#000)",
    url: "https://github.com/Computer-Hardware-Industry-Perspective/CHIP"
  },
  {
    image: "/images/posters/4_pintos_v3.png",
    title: <>PintOS <span className="highlight">↗</span></>,
    subtitle: "Educational Operating System Project",
    date: "2024.10 – 2025.01",
    description: "크래프톤 정글 과정 중 C 기반 운영체제 교육용 프로젝트입니다. 스레드 관리와 스케줄링, 동기화, 가상 메모리, Lazy Loading, Copy-On-Write, Swapping, 파일 시스템 확장 등 OS 핵심 기능을 설계하고 구현했습니다.",
    borderColor: "#a78bfa",
    gradient: "linear-gradient(195deg,#6d28d9,#000)",
    url: "https://github.com/At-this-moment/KRAFTON-JUNGLE-W9-PintOS-Threads"
  },
  {
    image: "/images/posters/5_lightning_v2.png",
    title: <>Lightning <span className="highlight">↗</span></>,
    subtitle: "A place where a story passes like lightning",
    date: "2024.10 – 2025.01",
    description: "영속되는 인터넷 게시글의 무게감을 줄이기 위해 글이 10분 후 자동 삭제되는 실시간 게시판입니다. 웹소켓 기반 빠른 전송과 댓글 기능을 통해 가벼운 소통 경험을 제공합니다.",
    borderColor: "#38bdf8",
    gradient: "linear-gradient(225deg,#0ea5e9,#000)",
    url: "https://github.com/At-this-moment/KRAFTON-JUNGLE-W14-Lightningboard"
  },
  {
    image: "/images/posters/6_klicklab_v3.png",
    title: <>KlickLab <span className="highlight">↗</span></>,
    subtitle: "Clickstream Analytics",
    date: "2024.10 – 2025.01",
    description: "웹사이트 사용자 행동을 실시간으로 수집·분석해 전환 흐름과 이탈 지점을 시각화하는 데이터 드리븐 클릭스트림 분석 플랫폼입니다. NLB-Kafka-ClickHouse 파이프라인으로 초당 1만 RPS를 처리하며 대시보드를 제공합니다.",
    borderColor: "#00e5ff",
    gradient: "linear-gradient(135deg,#0ea5e9,#000)",
    url: "https://github.com/Eatventory"
  },
  {
    image: "/images/posters/7_phantomflow.png",
    title: <>PhantomFlow <span className="highlight">↗</span></>,
    subtitle: "Go Traffic Generator",
    date: "2024.10 – 2025.01",
    description: "Go 언어로 개발한 고성능 HTTP 트래픽 생성기입니다. 대규모 부하 테스트와 성능 검증을 위해 설계되었으며, 동시성 제어, 연결 풀, Keep-Alive 설정을 지원합니다. 초당 수만 RPS 생성과 로그를 통한 분석용 CSV 출력을 제공합니다.",
    borderColor: "#7dd3fc",
    gradient: "linear-gradient(210deg,#2563eb,#000)",
    url: "https://github.com/Eatventory/PhantomFlow"
  },
  {
    image: "/images/posters/8_project_L.png",
    title: <>Project L <span className="highlight">↗</span></>,
    subtitle: "Portfolio Website",
    date: "2024.10 – 2025.01",
    description: "구조적 정보 전달과 최소한의 인터랙션에 집중한 포트폴리오 웹사이트입니다. 읽기 중심 디자인과 최소한의 인터랙션을 적용해 몰입감을 높였으며, AWS EC2와 Nginx로 배포해 실시간 접근이 가능합니다.",
    borderColor: "#93c5fd",
    gradient: "linear-gradient(145deg,#1e40af,#000)",
    url: "https://github.com/At-this-moment/Project-L"
  },
];



export default function Projects() {
  return (
    <section
      className="projects-section"
      style={{
        marginLeft: 160, // PC에서 네비바 폭
        minHeight: "100vh",
        position: "relative",
        zIndex: 1,
        padding: "72px 0 120px",
      }}
    >
      <div className="projects-stage">
        <ChromaGrid
          items={items}
          radius={180}
          columns={4}
          rows={2}
          damping={0.45}
          fadeOut={0.6}
          ease="power3.out"
          spotlight={false}
        />
      </div>
    </section>
  );
}