'use client';

import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import { ArrowRight, Smartphone, Zap, Shield, Play, MousePointer2 } from 'lucide-react';
import { MouseEvent } from 'react';

// Custom Geometric Logo
const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M20 0L40 10V30L20 40L0 30V10L20 0Z" fill="white" fillOpacity="0.1" />
    <path d="M20 4L36 12V28L20 36L4 28V12L20 4Z" stroke="white" strokeWidth="2" />
    <path d="M20 10L30 15V25L20 30L10 25V15L20 10Z" fill="white" />
  </svg>
);

// Spotlight Card Component
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`relative border border-white/10 bg-black overflow-hidden group ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255,255,255,0.1),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
      {/* Cinematic Grain & Fog */}
      <div className="fixed inset-0 opacity-[0.05] pointer-events-none z-50 mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Ambient Light - Toned Down */}
      <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Navigation - Higher Contrast */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Logo className="w-8 h-8" />
            <span className="text-sm font-bold tracking-widest uppercase">MD- Aplicativos</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-medium uppercase tracking-widest text-neutral-400">
            <a href="#features" className="hover:text-white transition-colors">Funcionalidades</a>
            <a href="#docs" className="hover:text-white transition-colors">Docs</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition-colors">Login</button>
            <button className="px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-full hover:bg-neutral-200 transition-colors">
              Criar Conta
            </button>
          </div>
        </div>
      </nav>

      <main className="relative pt-32 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-6 text-center mb-40 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-5xl mx-auto space-y-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-neutral-300 text-[10px] font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Infraestrutura v2.0 Live
            </div>

            <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-[0.9] mix-blend-difference">
              Autenticação <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50">
                Sem Atrito.
              </span>
            </h1>

            <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
              A ponte definitiva entre seus aplicativos React Native e provedores OAuth.
              <span className="text-white"> Zero configuração de servidor.</span> Apenas código.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
              <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-transform hover:scale-105">
                <div className="absolute inset-0 bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  Começar Agora <ArrowRight className="w-4 h-4" />
                </span>
              </button>
              <button className="px-8 py-4 text-white font-medium hover:text-neutral-300 transition-colors flex items-center gap-2">
                <Play className="w-4 h-4 fill-current" /> Ver Demo
              </button>
            </div>
          </motion.div>

          {/* Robust 2D Connection Flow Visual */}
          <div className="mt-32 relative w-full max-w-4xl mx-auto">
            <div className="relative z-10 grid grid-cols-3 gap-8 items-center">
              {/* App Node */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center shadow-2xl">
                  <Smartphone className="w-10 h-10 text-white" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Seu App</span>
              </div>

              {/* Hub Node (Center) */}
              <div className="relative flex flex-col items-center gap-4">
                {/* Animated Connection Lines */}
                <div className="absolute top-1/2 left-[-50%] right-[-50%] h-[1px] bg-white/10 -z-10" />
                <div className="absolute top-1/2 left-[-50%] right-1/2 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent -z-10 animate-pulse" />

                <div className="w-32 h-32 rounded-full bg-black border border-white/20 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)] z-20">
                  <Logo className="w-16 h-16" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-white">MD- Hub</span>
              </div>

              {/* Provider Node */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center shadow-2xl">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">OAuth</span>
              </div>
            </div>

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />
          </div>
        </section>

        {/* Features Grid with Spotlight */}
        <section id="features" className="container mx-auto px-6 py-32 border-t border-white/10">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Instantâneo",
                desc: "Redirecionamentos processados em milissegundos. Sem latência perceptível."
              },
              {
                icon: <Smartphone className="w-6 h-6" />,
                title: "Nativo Mobile",
                desc: "Suporte total a Deep Links universais para iOS e Android."
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Blindado",
                desc: "Arquitetura stateless. Seus dados nunca tocam nossos discos."
              }
            ].map((feature, i) => (
              <SpotlightCard key={i} className="rounded-2xl p-8">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 border border-white/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{feature.desc}</p>
              </SpotlightCard>
            ))}
          </div>
        </section>

        {/* Minimalist CTA */}
        <section className="container mx-auto px-6 py-32 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Pronto para o próximo nível?
            </h2>
            <p className="text-lg text-neutral-400">
              Junte-se à elite de desenvolvedores que priorizam performance e design.
            </p>
            <button className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors">
              Criar Conta Gratuita
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12 bg-black">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-neutral-500">
            <Logo className="w-6 h-6 opacity-50" />
            <span className="text-xs font-mono tracking-widest uppercase">MD- Aplicativos © 2024</span>
          </div>
          <div className="flex gap-8 text-xs font-mono text-neutral-500 uppercase tracking-widest">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
            <a href="#" className="hover:text-white transition-colors">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
