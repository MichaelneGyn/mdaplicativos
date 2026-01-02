'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Check, AlertCircle, Loader2, Copy } from 'lucide-react';

// Custom Geometric Logo
const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M20 0L40 10V30L20 40L0 30V10L20 0Z" fill="white" fillOpacity="0.1" />
        <path d="M20 4L36 12V28L20 36L4 28V12L20 4Z" stroke="white" strokeWidth="2" />
        <path d="M20 10L30 15V25L20 30L10 25V15L20 10Z" fill="white" />
    </svg>
);

function RedirectContent() {
    const searchParams = useSearchParams();
    const targetUrl = searchParams.get('url');
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!targetUrl) {
            setStatus('error');
            return;
        }

        // Simulate precise handshake
        setTimeout(() => {
            setStatus('success');
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 1000);
        }, 2000);

    }, [targetUrl]);

    const copyToClipboard = () => {
        if (!targetUrl) return;
        navigator.clipboard.writeText(targetUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (status === 'error') {
        return (
            <div className="min-h-screen bg-black text-white font-sans flex items-center justify-center p-6">
                <div className="text-center space-y-6 max-w-md border border-white/10 p-8 rounded-2xl bg-neutral-900/50">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
                        <AlertCircle className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-xl font-bold uppercase tracking-widest">Link Inválido</h1>
                    <p className="text-neutral-500 font-mono text-sm">
                        ERROR_CODE: INVALID_TARGET_URL
                    </p>
                    <a href="/" className="inline-block text-white hover:text-neutral-300 font-bold underline underline-offset-4">
                        Retornar
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Cinematic Background */}
            <div className="fixed inset-0 opacity-[0.05] pointer-events-none z-0"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 blur-[150px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="relative z-10 text-center space-y-12 max-w-md w-full"
            >
                <div className="flex justify-center">
                    <Logo className="w-16 h-16" />
                </div>

                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">
                        {status === 'loading' ? 'Autenticando...' : 'Conexão Estabelecida'}
                    </h1>
                    <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
                        {status === 'loading' ? 'SECURE_HANDSHAKE_INIT' : 'REDIRECT_SEQUENCE_START'}
                    </p>
                </div>

                {/* Radar Animation */}
                <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                    <div className="absolute inset-0 border border-white/10 rounded-full" />
                    <div className="absolute inset-4 border border-white/5 rounded-full" />

                    {status === 'loading' && (
                        <>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                            />
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        </>
                    )}

                    {status === 'success' && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)]"
                        >
                            <Check className="w-8 h-8 text-black" />
                        </motion.div>
                    )}
                </div>

                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <a
                            href={targetUrl!}
                            className="group block w-full py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-all hover:scale-[1.02]"
                        >
                            Abrir Aplicativo
                            <ArrowRight className="inline-block w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </a>

                        <button
                            onClick={copyToClipboard}
                            className="text-xs font-mono text-neutral-500 hover:text-white transition-colors flex items-center justify-center gap-2 w-full"
                        >
                            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            {copied ? 'COPIADO' : 'COPIAR LINK MANUALMENTE'}
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}

export default function RedirectPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full animate-ping" />
            </div>
        }>
            <RedirectContent />
        </Suspense>
    );
}
