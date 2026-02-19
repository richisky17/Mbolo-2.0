"use client";

import {
  BookOpen,
  Grid3x3,
  GraduationCap,
  HelpCircle,
  List,
} from "lucide-react";
import Link from "next/link";
import LottieMascot from "../LottieMascot";
import { SubscriptionStats } from "./SubscriptionStats";

const DashboardCard = ({
  title,
  description,
  icon: Icon,
  href,
  color,
  emoji,
}: {
  title: string;
  description: string;
  icon: any;
  href: string;
  color: string;
  emoji: string;
}) => (
  <Link
    href={href}
    style={{
      textDecoration: "none",
      display: "block",
    }}
  >
    <div
      className="dashboard-card"
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        border: "1px solid #e5e5e5",
        padding: "28px",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
        e.currentTarget.style.boxShadow = `0 20px 25px -5px ${color}20, 0 10px 10px -5px ${color}10`;
        e.currentTarget.style.borderColor = color;
        const icon = e.currentTarget.querySelector('.card-icon') as HTMLElement;
        if (icon) {
          icon.style.transform = "rotate(10deg) scale(1.1)";
          icon.style.background = `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`;
        }
        const emoji = e.currentTarget.querySelector('.card-emoji') as HTMLElement;
        if (emoji) emoji.style.transform = "scale(1.3) rotate(20deg)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
        e.currentTarget.style.boxShadow = "0 1px 3px 0 rgb(0 0 0 / 0.1)";
        e.currentTarget.style.borderColor = "#e5e5e5";
        const icon = e.currentTarget.querySelector('.card-icon') as HTMLElement;
        if (icon) {
          icon.style.transform = "rotate(0deg) scale(1)";
          icon.style.background = `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`;
        }
        const emoji = e.currentTarget.querySelector('.card-emoji') as HTMLElement;
        if (emoji) emoji.style.transform = "scale(1) rotate(0deg)";
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontSize: "2.5rem",
          opacity: 0.15,
          transition: "all 0.3s ease",
        }}
        className="card-emoji"
      >
        {emoji}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <div
          className="card-icon"
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "14px",
            background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: `2px solid ${color}40`,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <Icon style={{ color: color, width: "28px", height: "28px" }} />
        </div>
        <div>
          <h3
            style={{
              fontSize: "1.375rem",
              fontWeight: 800,
              color: "#262626",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            {title}
          </h3>
        </div>
      </div>
      <p
        style={{
          color: "#737373",
          fontSize: "0.9rem",
          lineHeight: "1.6",
          margin: 0,
        }}
      >
        {description}
      </p>
    </div>
  </Link>
);

export const AdminDashboard = () => {
  return (
    <div style={{ padding: "24px" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
          border: "2px solid #bbf7d0",
          borderRadius: "20px",
          padding: "40px",
          marginBottom: "32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.3)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30px",
            left: "-30px",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "24px", position: "relative", zIndex: 1 }}>
          <div
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "20px",
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "3px solid #bbf7d0",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          >
            <LottieMascot width={80} height={80} />
          </div>
          <div>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: 900,
                background: "linear-gradient(135deg, #059669 0%, #0d9488 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "8px",
                margin: 0,
              }}
            >
              Welcome to Mbolo Admin! 👋
            </h1>
            <p
              style={{
                fontSize: "1.125rem",
                color: "#525252",
                marginBottom: "0",
                margin: 0,
                fontWeight: 500,
              }}
            >
              Creemos&apos; experiencias increíbles para aprender idiomas ✨
            </p>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <DashboardCard
          title="Courses"
          description="🌍 Manage language courses and settings. Add new languages and unlock global learning!"
          icon={BookOpen}
          href="/admin#/courses"
          color="#059669"
          emoji="📚"
        />
        <DashboardCard
          title="Units"
          description="📦 Organize content into structured units. Build your learning journey step by step."
          icon={Grid3x3}
          href="/admin#/units"
          color="#0ea5e9"
          emoji="🎯"
        />
        <DashboardCard
          title="Lessons"
          description="🎓 Create engaging lessons that stick. Design the perfect curriculum for learners."
          icon={GraduationCap}
          href="/admin#/lessons"
          color="#8b5cf6"
          emoji="✏️"
        />
        <DashboardCard
          title="Challenges"
          description="⚡ Add exciting challenges and exercises. Make learning fun and interactive!"
          icon={HelpCircle}
          href="/admin#/challenges"
          color="#f59e0b"
          emoji="🎮"
        />
        <DashboardCard
          title="Challenge Options"
          description="💡 Define smart answer choices. Create multiple paths to success for students."
          icon={List}
          href="/admin#/challengeOptions"
          color="#ec4899"
          emoji="🎨"
        />
      </div>

      {/* Subscription Statistics */}
      <SubscriptionStats />

      <div
        style={{
          background: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
          border: "2px solid #fbbf24",
          borderRadius: "20px",
          padding: "32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "20px",
            fontSize: "3rem",
            opacity: 0.2,
          }}
        >
          💡
        </div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            color: "#92400e",
            marginTop: 0,
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "1.75rem" }}>🚀</span>
          Guía de inicio rápido
        </h2>
        <div
          style={{
            color: "#78350f",
            fontSize: "0.95rem",
            lineHeight: "1.8",
            marginBottom: 0,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", alignItems: "start", gap: "12px" }}>
            <span style={{ fontSize: "1.25rem" }}>1️⃣</span>
            <p style={{ margin: 0 }}>
              <strong>Crea curso</strong> - Elige tu idioma y configura los fundamentos 
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "start", gap: "12px" }}>
            <span style={{ fontSize: "1.25rem" }}>2️⃣</span>
            <p style={{ margin: 0 }}>
              <strong>Añadir unidades</strong> - Divide el contenido en módulos de aprendizaje breves y fáciles de asimilar 
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "start", gap: "12px" }}>
            <span style={{ fontSize: "1.25rem" }}>3️⃣</span>
            <p style={{ margin: 0 }}>
              <strong>Lecciones de diseño</strong> - Crea contenido atractivo que les encantará a los estudiantes 
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "start", gap: "12px" }}>
            <span style={{ fontSize: "1.25rem" }}>4️⃣</span>
            <p style={{ margin: 0 }}>
              <strong>Build Challenges</strong> - Test knowledge with fun exercises 🎯
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "start", gap: "12px" }}>
            <span style={{ fontSize: "1.25rem" }}>5️⃣</span>
            <p style={{ margin: 0 }}>
              <strong>Add Options</strong> - Give students choices and paths to success 🎉
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

