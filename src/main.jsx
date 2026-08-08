import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clapperboard,
  Cpu,
  Mail,
  MapPin,
  Palette,
  Pause,
  Phone,
  Play,
  Plus,
  Target,
  Upload,
  X,
} from "lucide-react";
import contentOverrides from "./content-overrides.json";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const CONTACT_EMAIL = "1622764597@qq.com";
const CONTACT_PHONE = "13556676096";
const PROJECT_FRAME_WIDTH = 1280;
const PROJECT_FRAME_HEIGHT = 720;
const IS_EDIT_MODE = new URLSearchParams(window.location.search).get("edit") === "1";
const VIDEO_CDN_BASE_URL =
  "https://mingtu-video-cdn-1465459783.cos.ap-guangzhou.myqcloud.com";

function resolveVideoUrl(videoUrl) {
  if (!videoUrl || !videoUrl.startsWith("/assets/videos/web/")) return videoUrl;
  return `${VIDEO_CDN_BASE_URL}${videoUrl}`;
}

function editableValue(editKey, fallback) {
  return contentOverrides[editKey] ?? fallback;
}

function collectEditableTexts() {
  return Array.from(document.querySelectorAll("[data-edit-key]")).reduce((texts, element) => {
    texts[element.dataset.editKey] = element.textContent.trim();
    return texts;
  }, {});
}

function syncEditableText(editKey, value, sourceElement) {
  document.querySelectorAll("[data-edit-key]").forEach((element) => {
    if (element === sourceElement || element.dataset.editKey !== editKey) return;
    element.textContent = value;
  });
}

function safeHeaderValue(value) {
  return encodeURIComponent(String(value || ""));
}

function EditableText({ as: Tag = "span", editKey, children, className, ...props }) {
  const [value, setValue] = useState(() => editableValue(editKey, children));
  const editableClassName = [className, IS_EDIT_MODE ? "editable-text" : ""]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    setValue(editableValue(editKey, children));
  }, [editKey, children]);

  return (
    <Tag
      {...props}
      className={editableClassName || undefined}
      data-edit-key={editKey}
      contentEditable={IS_EDIT_MODE}
      suppressContentEditableWarning
      onBlur={(event) => {
        const nextValue = event.currentTarget.textContent.trim();
        setValue(nextValue);
        syncEditableText(editKey, nextValue, event.currentTarget);
      }}
    >
      {value}
    </Tag>
  );
}

const navItems = [
  { label: "个人经历", href: "#experience" },
  { label: "精选项目", href: "#projects" },
  { label: "个人优势", href: "#strengths" },
];

const stats = [
  { value: "6+", label: "年行业经验", sub: "YEARS EXPERIENCE" },
  { value: "10+", label: "游戏项目", sub: "GAME PROJECTS" },
  { value: "#1", suffix: "×2", label: "海贼王素材", sub: "SPEND RANKING" },
  { value: "8", label: "全球地区", sub: "GLOBAL MARKETS" },
];

const jobs = [
  {
    period: "2025.05 - NOW",
    company: "伦奇信息",
    role: "海外视频设计师",
    detail:
      "负责《海贼王》《帝王》《放置少女》等项目，从创意方向、分镜设计到剪辑、包装、合成与交付，独立推进完整制作闭环。",
  },
  {
    period: "2023.12 - 2025.03",
    company: "玩咖欢聚",
    role: "游戏视频设计师",
    detail:
      "服务《寻道大千》《御业》《重返未来：1999》《女神异闻录》等项目，覆盖二次元、写实、国风与休闲题材。",
  },
  {
    period: "2020.06 - 2023.10",
    company: "350 游戏",
    role: "海外视频设计师",
    detail:
      "负责《龙族》《火影》等海外平面与视频广告，将产品卖点转化为创意内容，服务港澳台、欧美投放市场。",
  },
];

const initialProjects = [
  {
    title: "海贼王 01",
    type: "海外买量创意系列",
    poster: "/assets/video-posters/project-01.jpg",
    videoUrl: "/assets/videos/web/project-01-海贼王-1280x720.web.mp4",
    mediaWidth: 1280,
    mediaHeight: 720,
    orientation: "wide",
    tag: "消耗排行 TOP 1 × 2",
    desc: "围绕角色卖点和节奏记忆点制作高转化视频素材，支撑重点地区投放。"
  },
  {
    title: "海贼王 02",
    type: "海外买量创意系列",
    poster: "/assets/video-posters/project-02.jpg",
    videoUrl: "/assets/videos/web/project-02-海贼王-1280x720.web.mp4",
    mediaWidth: 1280,
    mediaHeight: 720,
    orientation: "wide",
    tag: "CREATIVE / MOTION",
    desc: "围绕活动节点、角色卖点与投放节奏制作横版视频素材，适配海外买量场景。"
  },
  {
    title: "海贼王 03",
    type: "海外买量创意系列",
    poster: "/assets/video-posters/project-03.jpg",
    videoUrl: "/assets/videos/web/project-03-海贼王-1280x720.web.mp4",
    mediaWidth: 1280,
    mediaHeight: 720,
    orientation: "wide",
    tag: "PERFORMANCE ADS",
    desc: "AI生成画面，以角色展示、视觉包装和节奏剪辑形成清晰卖点，服务素材测试与投放迭代。"
  },
  {
    title: "海贼王 04",
    type: "海外买量创意系列",
    poster: "/assets/video-posters/project-04.jpg",
    videoUrl: "/assets/videos/web/project-04-海贼王-1280x720.web.mp4",
    mediaWidth: 1280,
    mediaHeight: 720,
    orientation: "wide",
    tag: "VIDEO / AD",
    desc: "通过镜头节奏、信息层级和视觉冲击力，强化素材在短时间内的吸引力。"
  },
  {
    title: "海贼王 05",
    type: "海外买量创意系列",
    poster: "/assets/video-posters/project-05.jpg",
    videoUrl: "/assets/videos/web/project-05-海贼王-1280x720.web.mp4",
    mediaWidth: 1280,
    mediaHeight: 720,
    orientation: "wide",
    tag: "DATA DRIVEN",
    desc: "围绕点击、完播和转化数据持续调整镜头、节奏、文案与素材结构。"
  },
  {
    title: "海贼王 06",
    type: "海外买量创意系列",
    poster: "/assets/video-posters/project-06.jpg",
    videoUrl: "/assets/videos/web/project-06-海贼王-1280x720.web.mp4",
    mediaWidth: 1280,
    mediaHeight: 720,
    orientation: "wide",
    tag: "MOTION DESIGN",
    desc: "结合角色素材、场景包装和节奏化剪辑，形成适合投放测试的视频版本。"
  },
  {
    title: "海贼王 07",
    type: "海外买量创意系列",
    poster: "/assets/video-posters/project-07.jpg",
    videoUrl: "/assets/videos/web/project-07-海贼王-1280x720.web.mp4",
    mediaWidth: 1280,
    mediaHeight: 720,
    orientation: "wide",
    tag: "AD CREATIVE",
    desc: "从画面吸引、卖点表达和收口转化三个层面组织视频内容。"
  },
  {
    title: "海贼王 08",
    type: "海外买量创意系列",
    poster: "/assets/video-posters/project-08.jpg",
    videoUrl: "/assets/videos/web/project-08-海贼王-1280x720.web.mp4",
    mediaWidth: 1280,
    mediaHeight: 720,
    orientation: "wide",
    tag: "GLOBAL MARKET",
    desc: "面向海外投放语境进行包装和节奏处理，提升素材辨识度与转化表现。"
  },
  {
    title: "重返未来 1999 01",
    type: "二次元游戏广告",
    poster: "/assets/video-posters/project-09.jpg",
    videoUrl: "/assets/videos/web/project-09-重返未来1999-1280x720.web.mp4",
    mediaWidth: 1280,
    mediaHeight: 720,
    orientation: "wide",
    tag: "STYLE / MOTION",
    desc: "围绕二次元美术气质与游戏内容卖点，制作具备节奏记忆点的视频素材。"
  },
  {
    title: "重返未来 1999 02",
    type: "二次元游戏广告",
    poster: "/assets/video-posters/project-10.jpg",
    videoUrl: "/assets/videos/web/project-10-重返未来1999-1280x720.web.mp4",
    mediaWidth: 1280,
    mediaHeight: 720,
    orientation: "wide",
    tag: "NARRATIVE AD",
    desc: "以视觉氛围、角色亮点和广告节奏构建完整的视频表达。"
  },
  {
    title: "重返未来 1999 03",
    type: "二次元游戏广告",
    poster: "/assets/video-posters/project-11.jpg",
    videoUrl: "/assets/videos/web/project-11-重返未来1999-1280x720.web.mp4",
    mediaWidth: 1280,
    mediaHeight: 720,
    orientation: "wide",
    tag: "CREATIVE TEST",
    desc: "快速产出多版本创意方向，用画面结构和节奏差异支撑投放测试。"
  },
  {
    title: "重返未来 1999 04",
    type: "二次元游戏广告",
    poster: "/assets/video-posters/project-12.jpg",
    videoUrl: "/assets/videos/web/project-12-重返未来1999-1280x720.web.mp4",
    mediaWidth: 1280,
    mediaHeight: 720,
    orientation: "wide",
    tag: "VISUAL SYSTEM",
    desc: "延续项目视觉语言，并将角色、信息和镜头节奏整合为广告素材。"
  },
  {
    title: "重返未来 1999 05",
    type: "二次元游戏广告",
    poster: "/assets/video-posters/project-13-重返未来-1999-05-20260807085855182-rn8rpx.jpg",
    videoUrl: "/assets/videos/web/project-13-重返未来-1999-05-20260807085854167-cjbxce.web.mp4",
    mediaWidth: 1920,
    mediaHeight: 1080,
    orientation: "wide",
    tag: "PERFORMANCE",
    desc: "在保持美术调性的同时，突出素材首秒吸引力和投放转化效率。"
  },
  {
    title: "女神异闻录 01",
    type: "游戏视频广告",
    poster: "/assets/video-posters/project-14.jpg",
    videoUrl: "/assets/videos/web/project-14-女神异闻录-1280x720.web.mp4",
    mediaWidth: 1280,
    mediaHeight: 720,
    orientation: "wide",
    tag: "GAME AD",
    desc: "结合项目题材、角色气质与广告节奏，制作适合投放场景的视频素材。"
  },
  {
    title: "女神异闻录 02",
    type: "游戏视频广告",
    poster: "/assets/video-posters/project-15.jpg",
    videoUrl: "/assets/videos/web/project-15-女神异闻录-1280x720.web.mp4",
    mediaWidth: 1280,
    mediaHeight: 720,
    orientation: "wide",
    tag: "MOTION / AD",
    desc: "通过动效包装、节奏剪辑和信息收口，增强素材的观看完成度。"
  }
];

const strengths = [
  {
    icon: Clapperboard,
    kicker: "END-TO-END",
    title: "全链路制作",
    text: "从创意方向、脚本分镜到剪辑、动效、音效、合成和多规格交付，独立完成制作闭环。",
  },
  {
    icon: Palette,
    kicker: "STYLE DECODER",
    title: "多风格解码",
    text: "快速拆解二次元、写实、国风、科幻、欧美、日韩与卡通休闲等美术语言。",
  },
  {
    icon: Target,
    kicker: "PERFORMANCE",
    title: "数据驱动迭代",
    text: "围绕消耗、点击率、完播率与转化反馈调整镜头、文案、音乐、节奏和时长。",
  },
  {
    icon: Cpu,
    kicker: "AI-POWERED",
    title: "AI 效率增强",
    text: "将 AI 工具融入视频探索与视频生产，提升素材制作效率，拓展创意表达边界。",
  },
];

function getVideoPoster(videoUrl) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    let settled = false;
    const timeout = window.setTimeout(() => cleanReject(), 10000);

    const finish = (payload) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      video.removeAttribute("src");
      video.load();
      resolve(payload);
    };

    const cleanReject = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      video.removeAttribute("src");
      video.load();
      reject(new Error("无法读取视频首帧"));
    };

    const capturePoster = () => {
      if (!video.videoWidth || !video.videoHeight) {
        cleanReject();
        return;
      }

      const canvas = document.createElement("canvas");
      const width = video.videoWidth || 1280;
      const height = video.videoHeight || 720;
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      finish({
        poster: canvas.toDataURL("image/jpeg", 0.86),
        width,
        height,
        orientation: width / height < 0.9 ? "portrait" : width / height > 1.2 ? "wide" : "square",
      });
    };

    video.preload = "auto";
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";

    video.addEventListener("loadedmetadata", () => {
      const targetTime = Math.min(0.12, Math.max((video.duration || 1) * 0.02, 0.04));
      try {
        video.currentTime = targetTime;
      } catch {
        capturePoster();
      }
    });

    video.addEventListener("seeked", capturePoster);
    video.addEventListener("loadeddata", () => {
      if (video.readyState >= 2 && video.currentTime > 0) capturePoster();
    });

    video.addEventListener("error", cleanReject);
    video.src = videoUrl;
    video.load();
  });
}

function getProjectMediaClass(project) {
  return `stage-media motion-reveal media-${project.orientation ?? "wide"}`;
}

function getProjectMediaStyle(project) {
  const width = project.mediaWidth || PROJECT_FRAME_WIDTH;
  const height = project.mediaHeight || PROJECT_FRAME_HEIGHT;
  const foregroundScale = Math.min(PROJECT_FRAME_WIDTH / width, PROJECT_FRAME_HEIGHT / height);
  const backgroundScale = Math.max(PROJECT_FRAME_WIDTH / width, PROJECT_FRAME_HEIGHT / height);
  const displayWidth = (width * foregroundScale) / PROJECT_FRAME_WIDTH;
  const displayHeight = (height * foregroundScale) / PROJECT_FRAME_HEIGHT;
  const backgroundWidth = (width * backgroundScale) / PROJECT_FRAME_WIDTH;
  const backgroundHeight = (height * backgroundScale) / PROJECT_FRAME_HEIGHT;

  return {
    "--media-display-width": `${displayWidth * 100}%`,
    "--media-display-height": `${displayHeight * 100}%`,
    "--media-bg-width": `${backgroundWidth * 100}%`,
    "--media-bg-height": `${backgroundHeight * 100}%`,
  };
}

function usePortfolioMotion() {
  useLayoutEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      document.documentElement.classList.add("motion-reduced");
      return undefined;
    }

    document.documentElement.classList.add("motion-enabled");

    const ctx = gsap.context(() => {
      gsap.defaults({ ease: "power4.out" });

      gsap.set(".site-header", { autoAlpha: 0, y: -110 });
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const introBlur = coarsePointer ? "blur(0px)" : "blur(10px)";
      const cardBlur = coarsePointer ? "blur(0px)" : "blur(10px)";

      gsap.set(".hero-image", { scale: 1.18, filter: `${introBlur} saturate(1.22)` });
      gsap.set(".hero-copy .eyebrow, .role-line, .title-bar, .hero-text", {
        autoAlpha: 0,
        y: 42,
      });
      gsap.set(".hero h1", {
        autoAlpha: 0,
        y: 130,
        scaleX: 0.68,
        clipPath: "inset(0 100% 0 0)",
        filter: coarsePointer ? "blur(0px)" : "blur(18px)",
        transformOrigin: "left center",
      });
      gsap.set(".hero-panel", {
        autoAlpha: 0,
        x: 86,
        y: 28,
        clipPath: "inset(0 0 100% 0)",
      });
      gsap.set(".dot-grid i", { autoAlpha: 0, scale: 0.35 });

      gsap
        .timeline({ defaults: { duration: 1.35 } })
        .to(".hero-image", {
          scale: 1,
          filter: "blur(0px) saturate(1)",
          duration: 2.4,
          ease: "expo.out",
        })
        .to(".site-header", { autoAlpha: 1, y: 0, duration: 1.25 }, 0.12)
        .to(".hero-copy .eyebrow", { autoAlpha: 1, y: 0, duration: 0.95 }, 0.48)
        .to(".role-line", { autoAlpha: 1, y: 0, duration: 1.05 }, 0.72)
        .to(
          ".hero h1",
          {
            autoAlpha: 1,
            y: 0,
            scaleX: 1,
            clipPath: "inset(0 0% 0 0)",
            filter: "blur(0px)",
            duration: 1.85,
            ease: "expo.out",
          },
          0.92,
        )
        .to(".title-bar", { autoAlpha: 1, y: 0, duration: 1.15 }, 1.42)
        .to(".hero-text", { autoAlpha: 1, y: 0, duration: 1.05 }, 1.62)
        .to(
          ".hero-panel",
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.35,
          },
          1.2,
        )
        .to(".dot-grid i", { autoAlpha: 1, scale: 1, stagger: 0.045, duration: 0.75 }, 1.62);

      gsap.to(".hero-image", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray(".motion-section").forEach((section) => {
        const q = gsap.utils.selector(section);
        const cards = q(".motion-card");
        const media = q(".motion-reveal");
        const headingItems = q(".section-index, .section-heading .eyebrow, .section-heading h2");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            once: true,
          },
        });

        tl.from(q(".section-ghost-title"), {
          autoAlpha: 0,
          x: -180,
          y: 90,
          scale: 1.22,
          duration: 1.55,
          ease: "expo.out",
        })
          .from(
            headingItems,
            {
              autoAlpha: 0,
              y: 74,
              clipPath: "inset(0 0 100% 0)",
              stagger: 0.11,
              duration: 1.2,
              ease: "expo.out",
            },
            0.18,
          )
          .from(
            cards,
            {
            autoAlpha: 0,
            y: 86,
            scale: 0.965,
              filter: cardBlur,
              stagger: 0.13,
              duration: 1.25,
              ease: "power4.out",
            },
            0.48,
          )
          .from(
            media,
            {
              clipPath: "inset(0 100% 0 0)",
              duration: 1.4,
              stagger: 0.12,
              ease: "expo.inOut",
            },
            0.42,
          )
          .from(
            q(".motion-reveal:not(.stage-media) img, .motion-reveal:not(.stage-media) video"),
            {
              scale: 1.16,
              duration: 1.55,
              stagger: 0.12,
              ease: "expo.out",
            },
            0.48,
          );
      });

      gsap.utils.toArray(".motion-parallax").forEach((element) => {
        const media = element.querySelector("img, video");
        if (!media) return;

        gsap.fromTo(
          media,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      });
    });

    return () => {
      ctx.revert();
      document.documentElement.classList.remove("motion-enabled");
    };
  }, []);
}

function Header({ onContactClick }) {
  return (
    <header className="site-header" aria-label="主导航">
      <a className="brand" href="#hero" aria-label="返回首页">
        <EditableText editKey="header.brandMark" className="brand-mark">CM</EditableText>
        <span>
          <EditableText as="strong" editKey="header.brandName">MINGTU</EditableText>
          <EditableText as="small" editKey="header.brandLabel">PORTFOLIO</EditableText>
        </span>
      </a>

      <nav className="nav-links" aria-label="页面导航">
        {navItems.map((item, index) => (
          <a key={item.href} href={item.href}>
            <EditableText editKey={`nav.${index}.label`}>{item.label}</EditableText>
          </a>
        ))}
      </nav>

      <button className="contact-button" type="button" onClick={onContactClick}>
        <EditableText editKey="header.contactButton">联系合作</EditableText>
        <ArrowUpRight size={18} aria-hidden="true" />
      </button>
    </header>
  );
}

function ContactModal({ open, onClose }) {
  if (!open) return null;
  const contactEmail = editableValue("contact.email", CONTACT_EMAIL);
  const contactPhone = editableValue("contact.phone", CONTACT_PHONE);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-label="个人联系方式"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="关闭弹窗">
          <X size={20} aria-hidden="true" />
        </button>
        <EditableText as="p" className="eyebrow" editKey="contactModal.eyebrow">CONTACT / COOPERATION</EditableText>
        <EditableText as="h2" editKey="contactModal.title">联系合作</EditableText>
        <div className="contact-list">
          <div>
            <Phone size={20} aria-hidden="true" />
            <EditableText editKey="contactModal.phoneLabel">联系电话</EditableText>
            <EditableText as="strong" editKey="contact.phone">{contactPhone}</EditableText>
          </div>
          <a href={`mailto:${contactEmail}`}>
            <Mail size={20} aria-hidden="true" />
            <EditableText editKey="contactModal.emailLabel">邮箱</EditableText>
            <EditableText as="strong" editKey="contact.email">{contactEmail}</EditableText>
          </a>
        </div>
      </div>
    </div>
  );
}

function Hero({ onContactClick }) {
  const contactEmail = editableValue("contact.email", CONTACT_EMAIL);

  return (
    <section className="hero section" id="hero">
      <img
        className="hero-image"
        src="/assets/hero.webp"
        alt="首屏视觉背景"
        fetchPriority="high"
        decoding="async"
      />
      <div className="hero-scrim" />
      <div className="hero-inner page-shell">
        <div className="hero-copy">
          <EditableText as="p" className="eyebrow" editKey="hero.eyebrow">WELCOME TO PLATO ERA</EditableText>
          <EditableText as="p" className="role-line" editKey="hero.roleLine">
            VIDEO DESIGNER / AI DESIGNER / BRAND DESIGNER
          </EditableText>
          <h1>
            <EditableText as="span" className="hero-title-main" editKey="hero.titleTop">CM</EditableText>
            <EditableText as="span" className="hero-title-script" editKey="hero.titleBottom">Plato</EditableText>
          </h1>
          <EditableText as="div" className="title-bar" editKey="hero.titleBar">
            MINGTU / VISUAL CREATOR
          </EditableText>
          <EditableText as="p" className="hero-text" editKey="hero.text">
            6 年游戏视频与海外买量素材制作经验。擅长把游戏卖点翻译成有节奏、有记忆点、可验证的视觉内容。
          </EditableText>
        </div>

        <div className="hero-panel" aria-label="核心身份">
          <div className="dot-grid" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, index) => (
              <i key={index} />
            ))}
          </div>
          <div>
            <EditableText editKey="heroPanel.basedLabel">BASED IN</EditableText>
            <EditableText as="strong" editKey="heroPanel.basedValue">GUANGZHOU · CN</EditableText>
          </div>
          <div>
            <EditableText editKey="heroPanel.contactLabel">CONTACT</EditableText>
            <EditableText as="strong" editKey="contact.email">{contactEmail}</EditableText>
          </div>
        </div>
      </div>
    </section>
  );
}

function Profile() {
  const contactEmail = editableValue("contact.email", CONTACT_EMAIL);

  return (
    <section className="profile section motion-section" id="profile">
      <span className="section-ghost-title" aria-hidden="true">
        PROFILE
      </span>
      <div className="page-shell profile-grid">
        <div className="portrait-card profile-shot motion-card motion-reveal motion-parallax">
          <img
            src="/assets/hero.webp"
            alt="陈明图个人经历视觉卡片"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        </div>

        <div className="profile-copy motion-card">
          <EditableText as="p" className="eyebrow" editKey="profile.eyebrow">ABOUT / PROFESSIONAL PROFILE</EditableText>
          <EditableText as="h2" editKey="profile.name">陈明图</EditableText>
          <EditableText as="p" className="profile-role" editKey="profile.role">
            个人工作简介 / MINGTU VISUAL CREATOR
          </EditableText>
          <EditableText as="p" className="lead" editKey="profile.lead">
            6 年游戏视频与海外买量素材制作经验。擅长把游戏卖点翻译成有节奏、有记忆点、可验证的视觉内容。
          </EditableText>
          <EditableText as="p" editKey="profile.body">
            我能独立完成创意提案、脚本分镜、剪辑、动效包装、合成及多规格交付，并结合投放反馈快速迭代素材。AI 工具已融入日常视频制作，用于提升效率与扩展视觉方案。
          </EditableText>

          <div className="profile-meta">
            <a href={`mailto:${contactEmail}`}>
              <Mail size={17} aria-hidden="true" />
              <EditableText editKey="contact.email">{contactEmail}</EditableText>
            </a>
            <span>
              <MapPin size={17} aria-hidden="true" />
              <EditableText editKey="profile.location">Guangzhou · CN</EditableText>
            </span>
          </div>

          <div className="skill-pills" aria-label="设计工具">
            {["AE", "PR", "PS", "AI", "AI TOOLS", "BRAND"].map((skill, index) => (
              <EditableText editKey={`skills.${index}`} key={skill}>{skill}</EditableText>
            ))}
          </div>
        </div>
      </div>

      <div className="page-shell stats-grid" aria-label="项目数据">
        {stats.map((item, index) => (
          <article className="stat-item motion-card" key={item.sub}>
            <strong>
              <EditableText editKey={`stats.${index}.value`}>{item.value}</EditableText>
              {item.suffix && (
                <EditableText as="sup" editKey={`stats.${index}.suffix`}>{item.suffix}</EditableText>
              )}
            </strong>
            <EditableText editKey={`stats.${index}.label`}>{item.label}</EditableText>
            <EditableText as="small" editKey={`stats.${index}.sub`}>{item.sub}</EditableText>
          </article>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="experience section motion-section" id="experience">
      <span className="section-ghost-title" aria-hidden="true">
        CAREER PATH
      </span>
      <div className="page-shell">
        <div className="section-heading">
          <p className="section-index">01</p>
          <div>
            <EditableText as="p" className="eyebrow" editKey="experience.eyebrow">EXPERIENCE / CAREER PATH</EditableText>
            <EditableText as="h2" editKey="experience.title">个人经历</EditableText>
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceTimeline() {
  return (
    <section className="experience-timeline-section section motion-section" aria-label="个人经历详情">
      <span className="section-ghost-title compact" aria-hidden="true">
        TIMELINE
      </span>
      <div className="page-shell">
        <div className="timeline">
          {jobs.map((job, index) => (
            <article className="timeline-row motion-card" key={job.company}>
              <span className="timeline-no">{String(index + 1).padStart(2, "0")}</span>
              <EditableText as="strong" className="timeline-period" editKey={`jobs.${index}.period`}>
                {job.period}
              </EditableText>
              <div>
                <EditableText as="h3" editKey={`jobs.${index}.company`}>{job.company}</EditableText>
                <EditableText as="p" editKey={`jobs.${index}.role`}>{job.role}</EditableText>
              </div>
              <EditableText as="p" className="timeline-detail" editKey={`jobs.${index}.detail`}>
                {job.detail}
              </EditableText>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const canManageProjects = IS_EDIT_MODE;
  const [projects, setProjects] = useState(initialProjects);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [savingProjects, setSavingProjects] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [playButtonVisible, setPlayButtonVisible] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const projectsRef = useRef(projects);
  const seekingRef = useRef(false);

  const activeProject = projects[activeIndex];
  const activeMediaStyle = getProjectMediaStyle(activeProject);
  const thumbWindowStart = Math.min(
    Math.max(activeIndex - 2, 0),
    Math.max(projects.length - 5, 0),
  );
  const visibleProjects = projects.slice(thumbWindowStart, thumbWindowStart + 5);

  useEffect(() => {
    projectsRef.current = projects;
  }, [projects]);

  useEffect(() => {
    if (!playing && videoRef.current) {
      videoRef.current.pause();
    }
  }, [playing, activeIndex]);

  useEffect(() => {
    return () => {
      projectsRef.current.forEach((project) => {
        if (project.videoUrl) URL.revokeObjectURL(project.videoUrl);
      });
    };
  }, []);

  const uploadVideo = () => {
    if (!canManageProjects) return;
    fileInputRef.current?.click();
  };

  const handleVideoSelect = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const videoUrl = URL.createObjectURL(file);
    setUploading(true);

    try {
      const media = await getVideoPoster(videoUrl);
      setProjects((current) =>
        current.map((project, index) => {
          if (index !== activeIndex) return project;
          if (project.videoUrl?.startsWith("blob:")) URL.revokeObjectURL(project.videoUrl);
          return {
            ...project,
            poster: media.poster,
            mediaWidth: media.width,
            mediaHeight: media.height,
            orientation: media.orientation,
            videoUrl,
            fileName: file.name,
            pendingFile: file,
            pendingPoster: media.poster,
          };
        }),
      );
      setPlaying(false);
      setSaveMessage("已读取新视频首帧，请点击保存到本地项目。");
    } catch (error) {
      URL.revokeObjectURL(videoUrl);
      setSaveMessage(error.message || "读取视频首帧失败，请换一个视频再试。");
    } finally {
      setUploading(false);
    }
  };

  const togglePlay = async () => {
    if (!activeProject.videoUrl) {
      if (canManageProjects) uploadVideo();
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    if (!video.paused) {
      video.pause();
      setPlaying(false);
      return;
    }

    try {
      // Keep play() inside the tap/click handler so mobile browsers preserve user activation.
      if (video.ended) video.currentTime = 0;
      if (video.readyState < 2) video.load();
      await video.play();
      setPlaying(true);
      setSaveMessage("");
    } catch {
      setPlaying(false);
      setSaveMessage("当前视频暂时无法播放，请稍后重试或更换视频文件。");
    }
  };

  const seekVideoBy = (seconds) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;

    video.currentTime = Math.min(Math.max(video.currentTime + seconds, 0), video.duration);
  };

  const handleVideoSeeking = () => {
    const video = videoRef.current;
    if (video && playing) seekingRef.current = true;
  };

  const handleVideoSeeked = async () => {
    const video = videoRef.current;
    if (!video || !seekingRef.current) return;

    seekingRef.current = false;
    if (video.paused) {
      try {
        await video.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  const handleVideoPause = () => {
    const video = videoRef.current;
    window.setTimeout(() => {
      if (seekingRef.current || video?.seeking) return;
      setPlaying(false);
    }, 0);
  };

  useEffect(() => {
    const handleVideoKeyDown = (event) => {
      if (!playing || !videoRef.current) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        seekVideoBy(-10);
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        seekVideoBy(10);
      }
    };

    window.addEventListener("keydown", handleVideoKeyDown);
    return () => window.removeEventListener("keydown", handleVideoKeyDown);
  }, [playing]);

  const handleStagePointerMove = (event) => {
    if (!activeProject.videoUrl && !canManageProjects) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distance = Math.hypot(event.clientX - centerX, event.clientY - centerY);
    setPlayButtonVisible(distance <= 200);
  };

  const switchProject = (index) => {
    setActiveIndex(index);
    setPlaying(false);
    setPlayButtonVisible(false);
  };

  const moveProject = (direction) => {
    const nextIndex = (activeIndex + direction + projects.length) % projects.length;
    switchProject(nextIndex);
  };

  const updateProjectText = (field, value) => {
    const nextValue = String(value ?? "");

    setProjects((current) =>
      current.map((project, index) =>
        index === activeIndex ? { ...project, [field]: nextValue } : project,
      ),
    );
  };

  const addProject = () => {
    setProjects((current) => {
      const nextIndex = current.length + 1;
      return [
        ...current,
        {
          title: `新项目 ${nextIndex}`,
          type: "待上传作品视频",
          poster: "/assets/project-layout-reference.png",
          tag: "NEW PROJECT",
          desc: "点击上传作品视频后，系统会自动抓取视频首帧作为卡面。",
        },
      ];
    });
    setActiveIndex(projects.length);
    setPlaying(false);
    window.setTimeout(() => fileInputRef.current?.click(), 0);
  };

  const saveProjectsToLocal = async () => {
    if (!canManageProjects || savingProjects) return;

    setSavingProjects(true);
    setSaveMessage("正在保存到本地项目...");

    try {
      const savedProjects = [];

      for (const [index, project] of projects.entries()) {
        let nextProject = { ...project };

        if (project.pendingFile) {
          const videoResponse = await fetch("/__local-admin/upload-video", {
            method: "POST",
            headers: {
              "Content-Type": project.pendingFile.type || "application/octet-stream",
              "X-Project-Index": String(index + 1),
              "X-Project-Title": safeHeaderValue(project.title),
              "X-File-Name": safeHeaderValue(project.pendingFile.name),
            },
            body: project.pendingFile,
          });

          if (!videoResponse.ok) {
            throw new Error(`视频保存失败：${project.title}`);
          }

          const videoResult = await videoResponse.json();
          nextProject.videoUrl = videoResult.videoUrl;
        }

        if (project.pendingPoster || String(project.poster || "").startsWith("data:image/")) {
          const posterResponse = await fetch("/__local-admin/upload-poster", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              index: index + 1,
              title: project.title,
              dataUrl: project.pendingPoster || project.poster,
            }),
          });

          if (!posterResponse.ok) {
            throw new Error(`海报保存失败：${project.title}`);
          }

          const posterResult = await posterResponse.json();
          nextProject.poster = posterResult.poster;
        }

        delete nextProject.pendingFile;
        delete nextProject.pendingPoster;
        delete nextProject.fileName;
        savedProjects.push(nextProject);
      }

      const saveResponse = await fetch("/__local-admin/save-projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projects: savedProjects }),
      });

      if (!saveResponse.ok) {
        throw new Error("项目配置写入失败");
      }

      const textResponse = await fetch("/__local-admin/save-texts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: collectEditableTexts() }),
      });

      if (!textResponse.ok) {
        throw new Error("全站文字写入失败");
      }

      projectsRef.current.forEach((project) => {
        if (project.videoUrl?.startsWith("blob:")) URL.revokeObjectURL(project.videoUrl);
      });
      setProjects(savedProjects);
      setSaveMessage("已保存到本地项目。请用 GitHub Desktop 提交并 Push。");
    } catch (error) {
      setSaveMessage(error.message || "保存失败");
    } finally {
      setSavingProjects(false);
    }
  };

  return (
    <section className="projects section motion-section" id="projects">
      <span className="section-ghost-title" aria-hidden="true">
        SELECTED WORK
      </span>
      <div className="page-shell">
        <div className="section-heading projects-heading">
          <p className="section-index">02</p>
          <div>
            <EditableText as="p" className="eyebrow" editKey="projects.eyebrow">SELECTED WORK</EditableText>
            <h2>
              <EditableText as="span" className="projects-title-top" editKey="projects.titleTop">游戏</EditableText>
              <EditableText as="span" className="projects-title-bottom" editKey="projects.titleBottom">项目</EditableText>
            </h2>
          </div>
          <div className="projects-tools">
            <EditableText as="p" editKey="projects.description">
              跨题材、跨市场的游戏视频与海外买量创意实践。
            </EditableText>
            {canManageProjects && (
              <button type="button" onClick={uploadVideo}>
                上传作品视频
                <Plus size={16} aria-hidden="true" />
              </button>
            )}
            {canManageProjects && (
              <button type="button" onClick={saveProjectsToLocal} disabled={savingProjects}>
                {savingProjects ? "保存中..." : "保存到本地项目"}
              </button>
            )}
          </div>
        </div>

        <div className="project-stage motion-card">
          <div
            className={`${getProjectMediaClass(activeProject)} ${
              playButtonVisible ? "show-play-button" : ""
            }`}
            style={activeMediaStyle}
            onPointerMove={handleStagePointerMove}
            onPointerLeave={() => setPlayButtonVisible(false)}
          >
              <img
                key={`bg-${activeIndex}-${activeProject.poster}`}
                className="stage-media-bg"
                src={activeProject.poster}
                alt=""
                loading="lazy"
                fetchPriority="low"
                decoding="async"
                aria-hidden="true"
              />
              {activeProject.videoUrl && (
                <video
                  key={`${activeIndex}-${activeProject.videoUrl}`}
                  className={playing ? "stage-video is-playing" : "stage-video"}
                  ref={videoRef}
                  src={resolveVideoUrl(activeProject.videoUrl)}
                  poster={activeProject.poster}
                  controls={playing}
                  preload="metadata"
                  playsInline
                  onSeeking={handleVideoSeeking}
                  onSeeked={handleVideoSeeked}
                  onEnded={() => setPlaying(false)}
                  onPlay={() => setPlaying(true)}
                  onPause={handleVideoPause}
                  onError={() => setSaveMessage("当前视频暂时无法播放，请稍后重试或更换视频文件。")}
                />
              )}
              {!playing && (
                <img
                  key={`poster-${activeIndex}-${activeProject.poster}`}
                  className="stage-poster"
                  src={activeProject.poster}
                  alt={`${activeProject.title}作品首帧`}
                  loading="lazy"
                  fetchPriority="low"
                  decoding="async"
                />
              )}

              {(activeProject.videoUrl || canManageProjects) && (
                <button className="play-button" type="button" onClick={togglePlay}>
                  {playing ? (
                    <Pause size={15} fill="currentColor" aria-hidden="true" />
                  ) : (
                    <Play size={15} fill="currentColor" aria-hidden="true" />
                  )}
                  {playing ? "PAUSE" : activeProject.videoUrl ? "PLAY" : "UPLOAD"}
                </button>
              )}
              {canManageProjects && (
                <button
                  className="float-icon"
                  type="button"
                  onClick={uploadVideo}
                  aria-label="上传作品视频"
                >
                  <Upload size={21} aria-hidden="true" />
                </button>
              )}
          </div>

          <aside className="stage-info motion-card">
            <span>/0{activeIndex + 1}</span>
            <small>SELECTED / 0{activeIndex + 1}</small>
            <h3
              className={canManageProjects ? "editable-text" : undefined}
              contentEditable={canManageProjects}
              suppressContentEditableWarning
              onBlur={(event) =>
                canManageProjects && updateProjectText("title", event.currentTarget.textContent)
              }
            >
              {activeProject.title}
            </h3>
            <p
              className={canManageProjects ? "editable-text" : undefined}
              contentEditable={canManageProjects}
              suppressContentEditableWarning
              onBlur={(event) =>
                canManageProjects && updateProjectText("type", event.currentTarget.textContent)
              }
            >
              {activeProject.type}
            </p>
            <strong
              className={canManageProjects ? "editable-text" : undefined}
              contentEditable={canManageProjects}
              suppressContentEditableWarning
              onBlur={(event) =>
                canManageProjects && updateProjectText("tag", event.currentTarget.textContent)
              }
            >
              {activeProject.tag}
            </strong>
            <p
              className={canManageProjects ? "stage-desc editable-text" : "stage-desc"}
              contentEditable={canManageProjects}
              suppressContentEditableWarning
              onBlur={(event) =>
                canManageProjects && updateProjectText("desc", event.currentTarget.textContent)
              }
            >
              {activeProject.desc}
            </p>
            <div className="project-tags">
              <EditableText editKey="projects.tag.0">Creative</EditableText>
              <EditableText editKey="projects.tag.1">Motion</EditableText>
              <EditableText editKey="projects.tag.2">Performance</EditableText>
            </div>
          </aside>

          <div className="project-rail motion-card">
            <div className="project-index">
              <small>PROJECT INDEX</small>
              <strong>
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </strong>
            </div>
            <button type="button" onClick={() => moveProject(-1)} aria-label="上一个项目">
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <div className="thumb-list">
              {visibleProjects.map((project, visibleIndex) => {
                const index = thumbWindowStart + visibleIndex;
                return (
                <button
                  type="button"
                  className={index === activeIndex ? "active" : ""}
                  key={`${project.title}-${index}`}
                  onClick={() => switchProject(index)}
                  aria-label={`切换到 ${project.title}`}
                >
                  <img
                    key={`${index}-${project.poster}`}
                    src={project.poster}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </button>
                );
              })}
            </div>
            <button type="button" onClick={() => moveProject(1)} aria-label="下一个项目">
              <ArrowRight size={20} aria-hidden="true" />
            </button>
            {canManageProjects && (
              <button className="add-project-button" type="button" onClick={addProject}>
                添加项目
                <Plus size={16} aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {canManageProjects && (
          <input
            ref={fileInputRef}
            className="sr-only"
            type="file"
            accept="video/*"
            onChange={handleVideoSelect}
          />
        )}
        {canManageProjects && uploading && <p className="upload-status">正在读取视频首帧...</p>}
        {canManageProjects && saveMessage && <p className="upload-status">{saveMessage}</p>}
      </div>
    </section>
  );
}

function Strengths() {
  return (
    <section className="strengths section motion-section" id="strengths">
      <span className="section-ghost-title" aria-hidden="true">
        PERFORMANCE
      </span>
      <div className="page-shell">
        <div className="strengths-hero">
          <div>
            <EditableText as="p" className="eyebrow" editKey="strengths.eyebrow">
              PERFORMANCE RECORD / 入职以来
            </EditableText>
            <h2>
              <EditableText editKey="strengths.titleTop">不只让画面</EditableText>
              <EditableText as="span" editKey="strengths.titleBottom">好看。</EditableText>
            </h2>
          </div>
          <EditableText as="p" editKey="strengths.description">
            从创意到落地，从审美到数据，用完整链路保障每一次表达。
          </EditableText>
        </div>

        <div className="record-panel motion-card">
          <EditableText as="p" className="motion-card" editKey="record.description">
            实际产出持续高于产能指标，稳定完成高质量交付；素材消耗长期保持设计部前三，两次个人总消耗排行第一。
          </EditableText>
          <div className="motion-card">
            <strong>
              <EditableText editKey="record.deliveryValue">120</EditableText>
              <EditableText as="span" editKey="record.deliveryUnit">%</EditableText>
            </strong>
            <EditableText as="small" editKey="record.deliveryLabel">平均月出交付率 / DELIVERY RATE</EditableText>
          </div>
          <div className="motion-card">
            <strong>
              <EditableText editKey="record.spendValue">8W</EditableText>
              <EditableText as="span" editKey="record.spendUnit">USD</EditableText>
            </strong>
            <EditableText as="small" editKey="record.spendLabel">每月平均消耗 / MONTHLY SPEND</EditableText>
          </div>
          <div className="motion-card">
            <strong>
              <EditableText editKey="record.rankingValue">TOP</EditableText>
              <EditableText as="span" editKey="record.rankingUnit">3</EditableText>
            </strong>
            <EditableText as="small" editKey="record.rankingLabel">设计部长期排名 / DESIGN RANKING</EditableText>
          </div>
        </div>

        <div className="strength-grid">
          {strengths.map((item, index) => {
            const Icon = item.icon;
            return (
              <article className="strength-card motion-card" key={item.title}>
                <span className="card-no">0{index + 1}</span>
                <span className="icon-badge">
                  <Icon size={22} aria-hidden="true" />
                </span>
                <EditableText as="p" editKey={`strengths.cards.${index}.kicker`}>{item.kicker}</EditableText>
                <EditableText as="h3" editKey={`strengths.cards.${index}.title`}>{item.title}</EditableText>
                <EditableText as="small" editKey={`strengths.cards.${index}.text`}>{item.text}</EditableText>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact({ onContactClick }) {
  return (
    <section className="contact-section section motion-section" id="contact">
      <span className="section-ghost-title" aria-hidden="true">
        CONTACT
      </span>
      <div className="page-shell contact-inner">
        <EditableText as="p" className="eyebrow" editKey="contact.eyebrow">
          LET'S BUILD THE NEXT VISUAL SYSTEM
        </EditableText>
        <EditableText as="h2" editKey="contact.title">让项目从第一眼开始被记住。</EditableText>
        <EditableText as="p" editKey="contact.description">
          可合作方向：游戏视频广告、AI 视觉探索、品牌视觉包装、海外买量素材、项目视觉系统搭建。
        </EditableText>
        <div className="contact-actions motion-card">
          <button className="primary-link" type="button" onClick={onContactClick}>
            <Mail size={20} aria-hidden="true" />
            <EditableText editKey="contact.primaryButton">查看联系方式</EditableText>
          </button>
          <a className="secondary-link" href="#hero">
            <EditableText editKey="contact.secondaryButton">返回顶部</EditableText>
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="contact-footer motion-card">
          <EditableText editKey="contact.footerLeft">CM / MINGTU PORTFOLIO</EditableText>
          <EditableText editKey="contact.footerRight">VIDEO · AI · BRAND DESIGN</EditableText>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [contactOpen, setContactOpen] = useState(false);
  usePortfolioMotion();

  return (
    <>
      <Header onContactClick={() => setContactOpen(true)} />
      <Hero />
      <main>
        <Experience />
        <Profile />
        <ExperienceTimeline />
        <Projects />
        <Strengths />
        <Contact onContactClick={() => setContactOpen(true)} />
      </main>
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
