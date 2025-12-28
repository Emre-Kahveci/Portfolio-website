"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

// Featured projects data with translations
const featuredProjectsData = [
    {
        slug: "MiyosisAPI",
        titleEn: "Miyosis API",
        titleTr: "Miyosis API",
        descriptionEn: "A powerful ASP.NET Core 8.0 based API service designed to automate and integrate various business processes. Includes user management, inventory, barcode operations, and more.",
        descriptionTr: "Çeşitli iş süreçlerini otomatikleştirmek ve entegre etmek için tasarlanmış güçlü bir ASP.NET Core 8.0 tabanlı API hizmetidir. Kullanıcı yönetimi, envanter, barkod işlemleri ve daha fazlasını içerir.",
        technologies: [".NET 8", "C#", "SQL Server", "Entity Framework", "JWT", "Redis"],
        category: "Backend",
        language: "C#",
        githubUrl: "https://github.com/Emre-Kahveci/MiyosisAPI",
    },
    {
        slug: "car-body-type-classification",
        titleEn: "Car Body Type Classification",
        titleTr: "Araç Gövde Tipi Sınıflandırma",
        descriptionEn: "A deep learning project that classifies car images into 5 body types (Coupe, Pickup, Sedan, SUV, Van) using Convolutional Neural Networks built with TensorFlow/Keras.",
        descriptionTr: "TensorFlow/Keras ile oluşturulan Evrişimli Sinir Ağları kullanarak araba görsellerini 5 gövde tipine (Coupe, Pickup, Sedan, SUV, Van) sınıflandıran derin öğrenme projesi.",
        technologies: ["Python", "TensorFlow", "Keras", "NumPy"],
        category: "Machine Learning",
        language: "Python",
        githubUrl: "https://github.com/Emre-Kahveci/car-body-type-classification",
    },
    {
        slug: "adb-based-mobile-automation",
        titleEn: "ADB-Based Mobile Automation",
        titleTr: "ADB Tabanlı Mobil Otomasyon",
        descriptionEn: "Android Debug Bridge (ADB) based mobile automation tool built with Java. Enables programmatic control of Android devices for automated testing and tasks.",
        descriptionTr: "Java ile oluşturulmuş Android Debug Bridge (ADB) tabanlı mobil otomasyon aracı. Otomatik test ve görevler için Android cihazların programatik kontrolünü sağlar.",
        technologies: ["Java", "ADB", "Android"],
        category: "Automation",
        language: "Java",
        githubUrl: "https://github.com/Emre-Kahveci/adb-based-mobile-automation",
    },
    {
        slug: "tetris",
        titleEn: "Tetris",
        titleTr: "Tetris",
        descriptionEn: "A classic Tetris game built with Unity game engine. Features smooth gameplay, score tracking, and classic Tetris mechanics.",
        descriptionTr: "Unity oyun motoru ile oluşturulmuş klasik Tetris oyunu. Akıcı oynanış, skor takibi ve klasik Tetris mekanikleri içerir.",
        technologies: ["Unity", "C#"],
        category: "Game Development",
        language: "C#",
        githubUrl: "https://github.com/Emre-Kahveci/tetris",
    },
    {
        slug: "voice-controlled-snake-game",
        titleEn: "Voice-Controlled Snake Game",
        titleTr: "Sesle Kontrol Edilen Yılan Oyunu",
        descriptionEn: "A classic snake game with a modern twist - control the snake using your voice! Built with Python, Pygame, and Google Speech Recognition.",
        descriptionTr: "Modern bir dokunuşla klasik yılan oyunu - yılanı sesinizle kontrol edin! Python, Pygame ve Google Konuşma Tanıma ile oluşturuldu.",
        technologies: ["Python", "Pygame", "SpeechRecognition"],
        category: "Game Development",
        language: "Python",
        githubUrl: "https://github.com/Emre-Kahveci/voice-controlled-snake-game",
    },
];

// Inline style for text selection (to override any parent styles)
const selectableStyle: React.CSSProperties = {
    userSelect: "text",
    WebkitUserSelect: "text",
    cursor: "text",
};

export function Projects() {
    const { t, i18n } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const isEnglish = i18n.language === "en";

    // Category icons
    const categoryIcons: Record<string, string> = {
        "Backend": "🔧",
        "Machine Learning": "🤖",
        "Game Development": "🎮",
        "Automation": "⚡",
        "Desktop App": "💻",
        "Web": "🌐",
        "Software": "📦",
    };

    return (
        <section id="projects" className="section">
            <div className="max-w-7xl mx-auto" ref={ref}>
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title text-gradient">{t("projects.title")}</h2>
                    <p className="section-subtitle">{t("projects.subtitle")}</p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredProjectsData.map((project, index) => (
                        <motion.article
                            key={project.slug}
                            className="group gradient-border bg-white dark:bg-slate-900 rounded-2xl overflow-hidden hover-lift"
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                        >
                            {/* Card Header with Category */}
                            <div className="relative h-40 bg-gradient-to-br from-primary-500/10 via-accent-500/10 to-orange-500/10 flex items-center justify-center">
                                <div className="text-6xl opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                                    {categoryIcons[project.category] || "📦"}
                                </div>
                                <div className="absolute top-4 right-4">
                                    <span className="tech-badge" style={selectableStyle}>{project.language}</span>
                                </div>
                                <div className="absolute top-4 left-4">
                                    <span
                                        className="text-xs font-medium text-slate-600 dark:text-slate-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700"
                                        style={selectableStyle}
                                    >
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6" style={selectableStyle}>
                                <h3
                                    className="text-xl font-display font-bold mb-2 group-hover:text-gradient transition-all"
                                    style={selectableStyle}
                                >
                                    {isEnglish ? project.titleEn : project.titleTr}
                                </h3>
                                <p
                                    className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-3"
                                    style={selectableStyle}
                                >
                                    {isEnglish ? project.descriptionEn : project.descriptionTr}
                                </p>

                                {/* Technologies - with bordered badges */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-xs px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                                            style={selectableStyle}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Actions - using regular <a> tag for proper link behavior */}
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors hover:translate-x-1 transform duration-200"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
                                        }}
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                        </svg>
                                        {t("projects.viewCode")}
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
