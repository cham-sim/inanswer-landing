import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Providers } from "./providers";
import NavWrapper from "@/components/NavWrapper";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://inanswer.kr"),
  title: "INANSWER — AI가 추천하는 로펌이 되세요.",
  description:
    "850개 표준 법률질문과 LLM 4개(ChatGPT·Claude·Gemini·Perplexity) 기반으로 로펌의 AI 검색 가시성을 측정하고, 대한변협 광고 규정을 검수한 준법형 SEO·GEO·AEO 콘텐츠를 제작합니다. 무료 AI 가시성 진단 신청.",
  keywords: [
    "로펌 AI 검색",
    "GEO 마케팅",
    "AEO 법률",
    "법률 콘텐츠 마케팅",
    "로펌 SEO",
    "AI 답변 최적화",
    "법무법인 마케팅",
    "변호사 광고",
    "LLM 가시성",
    "생성형 AI 검색",
  ],
  authors: [{ name: "InAnswer Inc." }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://inanswer.kr/",
  },
  openGraph: {
    type: "website",
    siteName: "InAnswer",
    title: "INANSWER — AI가 추천하는 로펌이 되세요.",
    description:
      "의뢰인이 ChatGPT·Claude에게 물을 때 가장 먼저 발견되는 로펌이 되세요. 850개 표준 법률질문 기반 LLM 가시성 측정 + 준법형 콘텐츠 제작 + 발행 후 성과 추적.",
    url: "https://inanswer.kr/",
    locale: "ko_KR",
    images: [
      {
        url: "https://inanswer.kr/og-image.png",
        width: 1200,
        height: 630,
        alt: "InAnswer - 국내 로펌 전용 AI 검색 가시성 시스템",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "INANSWER — AI가 추천하는 로펌이 되세요.",
    description:
      "의뢰인이 AI에게 물을 때 가장 먼저 발견되는 로펌이 되세요. 850개 표준 법률질문 기반 LLM 가시성 측정 + 준법형 콘텐츠 제작.",
    images: ["https://inanswer.kr/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0A0E1A",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "InAnswer",
  alternateName: "인앤써",
  url: "https://inanswer.kr",
  logo: "https://inanswer.kr/logo.png",
  description:
    "국내 로펌 전용 AI 검색 가시성·콘텐츠 운영 시스템. 850개 표준 법률질문과 LLM 4개 기반으로 로펌의 AI 검색 가시성을 측정하고 준법형 콘텐츠를 제작합니다.",
  foundingDate: "2023",
  areaServed: "KR",
  knowsAbout: ["AI 검색 가시성 모니터링", "법률 콘텐츠 마케팅", "GEO·AEO 컨설팅"],
  contactPoint: {
    "@type": "ContactPoint",
    email: "contact@inanswer.kr",
    contactType: "customer service",
    availableLanguage: "Korean",
  },
  sameAs: [],
};

const softwareApplicationJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "InAnswer",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "국내 로펌 전용 AI 검색 가시성·콘텐츠 운영 SaaS. 850개 표준 법률질문으로 ChatGPT·Claude·Gemini·Perplexity 4개 LLM에서 로펌의 언급률·인용률을 측정하고, 대한변협 광고 규정을 검수한 준법형 SEO·GEO·AEO 콘텐츠를 제작합니다.",
  offers: [
    {
      "@type": "Offer",
      name: "AI 가시성 진단",
      description: "표준질문 50~100개 기반 LLM 4개 언급률·인용률 리포트, 경쟁 로펌 3곳 비교",
      price: "1000000",
      priceCurrency: "KRW",
    },
    {
      "@type": "Offer",
      name: "Starter",
      description: "1개 분야 표준질문팩, 커스텀 질문 10개, 월간 AI 가시성 리포트",
      price: "1000000",
      priceCurrency: "KRW",
    },
  ],
  featureList: [
    "850개 표준 법률질문 기반 LLM 모니터링",
    "ChatGPT·Claude·Gemini·Perplexity 4개 LLM 동시 분석",
    "로펌 언급률·인용률·Share of Voice 측정",
    "경쟁 로펌 비교 분석",
    "콘텐츠 갭 탐지",
    "준법형 SEO·GEO·AEO 콘텐츠 에디터",
    "대한변협 광고 규정 자동 검수",
    "변호사 승인 워크플로우",
    "콘텐츠별 발행 전후 LLM 변화 추적",
  ],
  inLanguage: "ko",
  audience: {
    "@type": "Audience",
    audienceType: "법무법인, 변호사 사무소, 법률 마케팅 담당자",
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "InAnswer",
  url: "https://inanswer.kr",
  description: "국내 로펌 전용 AI 검색 가시성·콘텐츠 운영 시스템",
  inLanguage: "ko",
  publisher: { "@type": "Organization", name: "InAnswer" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "850개 표준질문은 어떻게 구성되어 있나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "13개 법률 대분야, 52개 세부분야에 걸쳐 중복 없이 구성된 850개 표준질문입니다. 상황형 질문이 651개로 가장 많으며, 일반·비교·고액·대형 카테고리로 나뉩니다. 로펌이 직접 질문을 만들 필요 없이, 분야와 지역을 선택하면 질문팩이 자동 활성화됩니다.",
      },
    },
    {
      "@type": "Question",
      name: "어떤 LLM을 분석하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "ChatGPT(GPT-5 계열), Gemini(3 Flash), Claude(Sonnet), Perplexity(Sonar) 4개 모델을 매일 추적합니다. 신규 모델 출시 시 30일 내 분석 파이프라인에 편입됩니다.",
      },
    },
    {
      "@type": "Question",
      name: "광고 규정 검수는 어떻게 작동하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "콘텐츠 작성 단계에서 성공 보장·최고·순위 표현·전문·전담 표현·전관 영향력 암시·가격 유인·비밀침해 등 대한변협 위반 사례에 해당하는 문구를 자동 탐지합니다. 위험도(고위험·주의)와 대체 표현을 제안하며, 최종 게시 여부는 담당 변호사가 판단합니다.",
      },
    },
    {
      "@type": "Question",
      name: "기존 SEO 컨설팅과 무엇이 다릅니까?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SEO는 검색 엔진의 SERP 순위를 다루지만, InAnswer는 LLM의 답변 인용을 다룹니다. 측정 단위·콘텐츠 단위·추적 주기가 모두 다릅니다. 또한 로펌 특화 광고 규정 검수와 변호사 승인 워크플로우를 포함해, 일반 SEO 도구나 AI 글쓰기 도구로는 해결할 수 없는 법률 시장의 특수성을 다룹니다.",
      },
    },
    {
      "@type": "Question",
      name: "콘텐츠 발행 후 효과는 어떻게 측정하나요?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "콘텐츠를 만들 때 해당 콘텐츠가 공략하는 표준질문 5~20개를 연결합니다. 발행 전 기준선을 저장하고, 발행 후 7일·14일·30일 시점에 해당 질문군의 LLM별 언급률·인용률 변화를 추적합니다. 단, 정확한 인과관계가 아닌 '발행 후 관찰된 변화'를 기여 추정으로 표시합니다.",
      },
    },
  ],
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "InAnswer로 로펌의 AI 검색 가시성을 높이는 방법",
  description:
    "InAnswer의 측정→콘텐츠→추적 루프를 통해 로펌이 AI 답변에서 발견되도록 하는 3단계 프로세스입니다.",
  totalTime: "P30D",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "진단 — AI 가시성 측정",
      text: "850개 표준 법률질문을 ChatGPT, Claude, Gemini, Perplexity 4개 LLM에 동시 질의합니다. 질문별·LLM별로 로펌명, 변호사명, 경쟁 로펌명, 콘텐츠 URL, 도메인 인용 여부를 수집하고, 언급률·인용률·Share of Voice를 산출합니다.",
      url: "https://inanswer.kr/#loop",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "분석 — 콘텐츠 갭 탐지",
      text: "경쟁 로펌이 언급되는 질문 중 우리 로펌이 빠진 질문을 콘텐츠 갭으로 탐지합니다. 홈페이지와 콘텐츠를 사이트 측면(구조·기술·권위 마크업)과 콘텐츠 측면(인용가능성·자산량·외부 검증) 6개 영역 35개 항목으로 채점합니다.",
      url: "https://inanswer.kr/#loop",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "실행 — 준법형 콘텐츠 제작 및 발행",
      text: "표준질문과 LLM 가시성 데이터를 기반으로 SEO·GEO·AEO를 함께 고려한 법률 콘텐츠 초안을 생성합니다. 대한변협 광고 규정 위험 문구를 자동 탐지하고, 담당 변호사 승인 후 발행합니다.",
      url: "https://inanswer.kr/#loop",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      </head>
      <body>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TJ8F29H2');`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-52H5WY278Y"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-52H5WY278Y');`}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TJ8F29H2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Providers>
          <NavWrapper />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
