"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaBootstrap,
  FaCss3Alt,
  FaHtml5,
  FaJs,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiCplusplus,
  SiExpress,
  SiFirebase,
  SiGithub,
  SiPostman,
  SiPrisma,
  SiRedis,
  SiRedux,
  SiSocketdotio,
  SiTailwindcss,
} from "react-icons/si";

import { Layout, Code2, Database, Wrench } from "lucide-react";

const skills = [
  { name: "HTML", Icon: FaHtml5, color: "#E34F26" },
  { name: "CSS", Icon: FaCss3Alt, color: "#1572B6" },
  { name: "JavaScript", Icon: FaJs, color: "#F7DF1E" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "React", Icon: FaReact, color: "#61DAFB" },
  {
    name: "Next.js",
    Icon: SiNextdotjs,
    color: "#000000",
    darkColor: "#ffffff",
  },
  { name: "Node.js", Icon: FaNodeJs, color: "#339933" },
  { name: "Express", Icon: SiExpress, color: "#000000", darkColor: "#ffffff" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
  { name: "Redis", Icon: SiRedis, color: "#DC382D" },
  { name: "Prisma", Icon: SiPrisma, color: "#2D3748", darkColor: "#ffffff" },
  {
    name: "Socket.io",
    Icon: SiSocketdotio,
    color: "#000000",
    darkColor: "#ffffff",
  },
  { name: "C++", Icon: SiCplusplus, color: "#00599C" },
  { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
  { name: "GitHub", Icon: SiGithub, color: "#000000", darkColor: "#ffffff" },
  { name: "Git", Icon: FaGitAlt, color: "#F05032" },
  { name: "Docker", Icon: FaDocker, color: "#2496ED" },
  { name: "Tailwind", Icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Bootstrap", Icon: FaBootstrap, color: "#7952B3" },
  { name: "Redux", Icon: SiRedux, color: "#764ABC" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
];

export function SkillsSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const frameRef = useRef<number>(0);

  const rotation = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  const dragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let radius = 0;
    let points: any[] = [];
    let skillPoints: any[] = [];

    const resize = () => {
      const isMobile = window.innerWidth < 768;

      const size =
        isMobile ?
          Math.min(window.innerWidth * 0.92, 320)
        : Math.min(window.innerWidth * 0.75, 760);

      canvas.width = size;
      canvas.height = size;

      radius = canvas.width * (isMobile ? 0.3 : 0.42);

      points = [];
      const total = isMobile ? 70 : 120;

      const goldenAngle = Math.PI * (3 - Math.sqrt(5));

      for (let i = 0; i < total; i++) {
        const y = 1 - (i / (total - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = goldenAngle * i;

        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;

        points.push({
          x: x * radius,
          y: y * radius,
          z: z * radius,
          ox: x * radius,
          oy: y * radius,
          oz: z * radius,
        });
      }

      const totalSkills = skills.length;
      skillPoints = skills.map((s, i) => {
        const y = 1 - (i / (totalSkills - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = goldenAngle * i;

        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;

        const dist = radius * (isMobile ? 0.98 : 1.1);

        return {
          ...s,
          x: x * dist,
          y: y * dist,
          z: z * dist,
          ox: x * dist,
          oy: y * dist,
          oz: z * dist,
        };
      });
    };

    resize();
    window.addEventListener("resize", resize);

    function rotate(p: any) {
      const cosY = Math.cos(rotation.current.y);
      const sinY = Math.sin(rotation.current.y);

      const x1 = p.ox * cosY - p.oz * sinY;
      const z1 = p.ox * sinY + p.oz * cosY;

      const cosX = Math.cos(rotation.current.x);
      const sinX = Math.sin(rotation.current.x);

      const y2 = p.oy * cosX - z1 * sinX;
      const z2 = p.oy * sinX + z1 * cosX;

      p.x = x1;
      p.y = y2;
      p.z = z2;
    }

    function project(p: any, cx: number, cy: number) {
      const d = 900;
      const scale = d / (d + p.z);

      return {
        x: p.x * scale + cx,
        y: p.y * scale + cy,
        scale,
      };
    }

    const animate = () => {
      const isDark = document.documentElement.classList.contains("dark");

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      rotation.current.x += velocity.current.x;
      rotation.current.y += velocity.current.y;

      velocity.current.x *= 0.96;
      velocity.current.y *= 0.96;

      rotation.current.y += 0.002;

      points.forEach(rotate);
      skillPoints.forEach(rotate);

      ctx.strokeStyle = isDark ? "rgba(0,150,255,0.4)" : "rgba(0,0,0,0.08)";

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const dz = points[i].z - points[j].z;

          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < radius * 0.4) {
            const p1 = project(points[i], cx, cy);
            const p2 = project(points[j], cx, cy);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      points.forEach((p) => {
        const proj = project(p, cx, cy);

        ctx.beginPath();
        ctx.arc(proj.x, proj.y, proj.scale * 2, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "#60A5FA" : "#2563EB";
        ctx.fill();
      });

      skillPoints.forEach((p, i) => {
        const proj = project(p, cx, cy);
        const el = labelsRef.current[i];

        if (!el) return;

        el.style.left = `${proj.x}px`;
        el.style.top = `${proj.y}px`;
        el.style.transform = `translate(-50%, -50%) scale(${Math.max(proj.scale, 0.75)})`;
        el.style.zIndex = `${Math.floor(proj.scale * 100)}`;
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;

    const dx = e.clientX - lastMouse.current.x;
    const dy = e.clientY - lastMouse.current.y;

    rotation.current.y += dx * 0.005;
    rotation.current.x += dy * 0.005;

    velocity.current.y = dx * 0.001;
    velocity.current.x = dy * 0.001;

    lastMouse.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseUp = () => {
    dragging.current = false;
  };

  const onTouchStart = (e: React.TouchEvent) => {
    dragging.current = true;
    lastMouse.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current) return;

    const dx = e.touches[0].clientX - lastMouse.current.x;
    const dy = e.touches[0].clientY - lastMouse.current.y;

    rotation.current.y += dx * 0.005;
    rotation.current.x += dy * 0.005;

    lastMouse.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const onTouchEnd = () => {
    dragging.current = false;
  };

  const frontendSkills = skills.filter((s) =>
    [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind",
      "Bootstrap",
      "Redux",
    ].includes(s.name),
  );
  const backendSkills = skills.filter((s) =>
    ["Node.js", "Express", "C++", "Socket.io"].includes(s.name),
  );
  const databaseSkills = skills.filter((s) =>
    ["MongoDB", "PostgreSQL", "Redis", "Prisma", "Firebase"].includes(s.name),
  );
  const toolSkills = skills.filter((s) =>
    ["Postman", "GitHub", "Git", "Docker"].includes(s.name),
  );

  return (
    <section className="py-14 md:py-32 overflow-hidden">
      <div className="flex justify-center mb-12 md:mb-20">
        <div
          className="relative touch-none cursor-grab active:cursor-grabbing w-full max-w-[320px] md:max-w-[760px]"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <canvas ref={canvasRef} className="block mx-auto" />

          {skills.map((skill, i) => {
            const Icon = skill.Icon;

            const isDark =
              typeof document !== "undefined" &&
              document.documentElement.classList.contains("dark");

            const color = isDark ? skill.darkColor || "#ffffff" : skill.color;

            return (
              <div
                key={skill.name}
                ref={(el) => (labelsRef.current[i] = el) as any}
                className="absolute -translate-x-1/2 -translate-y-1/2
                flex items-center gap-1.5 md:gap-2 px-2 py-1.5 md:px-3 md:py-2 rounded-xl
                bg-white/90 dark:bg-black/80
                backdrop-blur-md shadow-md
                border border-black/10 dark:border-white/10"
              >
                <Icon size={14} color={color} />
                <span className="text-[10px] md:text-xs font-medium">
                  {skill.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SkillCard title="Frontend" icon={Layout} skills={frontendSkills} />
        <SkillCard title="Backend" icon={Code2} skills={backendSkills} />
        <SkillCard title="Database" icon={Database} skills={databaseSkills} />
        <SkillCard title="Tools" icon={Wrench} skills={toolSkills} />
      </div>
    </section>
  );
}

function SkillCard({ title, icon: Icon, skills }: any) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="p-6 rounded-2xl border border-black/10 dark:border-white/10
      bg-white/70 dark:bg-white/5 backdrop-blur-xl"
    >
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-5 h-5 text-blue-500" />
        <h3 className="font-bold">{title}</h3>
      </div>

      <div className="space-y-3">
        {skills.map((s: any) => {
          const SkillIcon = s.Icon;

          return (
            <div key={s.name} className="flex items-center gap-2 text-sm">
              <SkillIcon size={16} color={s.color} />
              {s.name}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
