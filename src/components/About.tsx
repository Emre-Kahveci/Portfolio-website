"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
    { key: "experience", value: "3+", icon: "📅" },
    { key: "projects", value: "26+", icon: "💻" },
    { key: "technologies", value: "15+", icon: "🛠️" },
];

export function About() {
    const { t } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="about" className="section bg-slate-50/50 dark:bg-slate-900/50">
            <div className="max-w-7xl mx-auto" ref={ref}>
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title text-gradient">{t("about.title")}</h2>
                    <p className="section-subtitle">{t("about.subtitle")}</p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative w-full aspect-square max-w-md mx-auto">
                            {/* Decorative gradient background */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500/20 via-accent-500/20 to-orange-500/20 blur-3xl" />

                            {/* Profile placeholder with gradient border */}
                            <div className="relative gradient-border rounded-3xl overflow-hidden bg-glass h-full flex items-center justify-center">
                                <div className="text-center p-8">
                                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                        <span className="text-5xl font-display font-bold text-white">EK</span>
                                    </div>
                                    <h3 className="text-2xl font-display font-bold mb-2">Emre Kahveci</h3>
                                    <p className="text-muted">Full Stack Developer</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <p className="text-lg text-muted leading-relaxed mb-8">
                            {t("about.description")}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.key}
                                    className="card text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                                >
                                    <div className="text-3xl mb-2">{stat.icon}</div>
                                    <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-1">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-muted">
                                        {t(`about.highlights.${stat.key}`)}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
