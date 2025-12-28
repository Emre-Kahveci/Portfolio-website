"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Pre-generated particle positions to avoid hydration mismatch
const particlePositions = [
    { left: 15, top: 20, duration: 4.2, delay: 0.5 },
    { left: 85, top: 35, duration: 3.8, delay: 1.2 },
    { left: 42, top: 75, duration: 4.5, delay: 0.3 },
    { left: 68, top: 15, duration: 3.5, delay: 1.8 },
    { left: 25, top: 55, duration: 4.0, delay: 0.8 },
    { left: 92, top: 65, duration: 3.7, delay: 1.5 },
    { left: 8, top: 80, duration: 4.3, delay: 0.2 },
    { left: 55, top: 45, duration: 3.9, delay: 1.0 },
    { left: 78, top: 90, duration: 4.1, delay: 0.7 },
    { left: 35, top: 10, duration: 3.6, delay: 1.4 },
    { left: 62, top: 60, duration: 4.4, delay: 0.4 },
    { left: 18, top: 40, duration: 3.4, delay: 1.6 },
    { left: 88, top: 25, duration: 4.6, delay: 0.6 },
    { left: 48, top: 85, duration: 3.3, delay: 1.9 },
    { left: 72, top: 50, duration: 4.7, delay: 0.1 },
];

export function Hero() {
    const { t } = useTranslation();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Animated Background */}
            <div className="hero-bg" />

            {/* Floating particles - only render on client to avoid hydration issues */}
            {mounted && (
                <div className="particles">
                    {particlePositions.map((particle, i) => (
                        <motion.div
                            key={i}
                            className="particle"
                            style={{
                                left: `${particle.left}%`,
                                top: `${particle.top}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.3, 0.8, 0.3],
                            }}
                            transition={{
                                duration: particle.duration,
                                repeat: Infinity,
                                delay: particle.delay,
                            }}
                        />
                    ))}
                </div>
            )}

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Greeting */}
                    <motion.p
                        className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {t("hero.greeting")}
                    </motion.p>

                    {/* Name */}
                    <motion.h1
                        className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <span className="text-gradient">{t("hero.name")}</span>
                    </motion.h1>

                    {/* Title */}
                    <motion.h2
                        className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-slate-500 dark:text-slate-400 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {t("hero.title")}
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                        className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        {t("hero.subtitle")}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                    >
                        <motion.a
                            href="#projects"
                            className="btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            {t("hero.cta.projects")}
                        </motion.a>

                        <motion.a
                            href="#contact"
                            className="btn-secondary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {t("hero.cta.contact")}
                        </motion.a>
                    </motion.div>

                    {/* Scroll Indicator - now in normal flow below buttons */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400"
                        >
                            <span className="text-sm">{t("hero.scroll")}</span>
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
