"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

// Skill data organized by category
const skillsData = {
    languages: [
        { name: "C#", icon: "🔷", level: 95 },
        { name: "Python", icon: "🐍", level: 90 },
        { name: "Java", icon: "☕", level: 80 },
        { name: "JavaScript", icon: "💛", level: 85 },
        { name: "TypeScript", icon: "💙", level: 80 },
        { name: "C++", icon: "⚙️", level: 70 },
    ],
    frameworks: [
        { name: "ASP.NET Core", icon: "🌐", level: 95 },
        { name: "Entity Framework", icon: "📊", level: 90 },
        { name: "React", icon: "⚛️", level: 85 },
        { name: "Next.js", icon: "▲", level: 80 },
        { name: "TensorFlow", icon: "🧠", level: 75 },
        { name: "Keras", icon: "🔬", level: 75 },
        { name: "Unity", icon: "🎮", level: 80 },
        { name: "Pygame", icon: "🎲", level: 85 },
    ],
    tools: [
        { name: "Git", icon: "📚", level: 90 },
        { name: "Docker", icon: "🐳", level: 75 },
        { name: "Visual Studio", icon: "💻", level: 95 },
        { name: "VS Code", icon: "📝", level: 90 },
        { name: "Postman", icon: "📬", level: 85 },
        { name: "Swagger", icon: "📄", level: 90 },
    ],
    databases: [
        { name: "SQL Server", icon: "🗄️", level: 90 },
        { name: "PostgreSQL", icon: "🐘", level: 80 },
        { name: "Redis", icon: "🔴", level: 75 },
        { name: "MongoDB", icon: "🍃", level: 70 },
    ],
};

type SkillCategory = keyof typeof skillsData;

export function Skills() {
    const { t } = useTranslation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [activeCategory, setActiveCategory] = useState<SkillCategory>("languages");

    const categories: SkillCategory[] = ["languages", "frameworks", "tools", "databases"];

    return (
        <section id="skills" className="section bg-slate-50/50 dark:bg-slate-900/50">
            <div className="max-w-7xl mx-auto" ref={ref}>
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title text-gradient">{t("skills.title")}</h2>
                    <p className="section-subtitle">{t("skills.subtitle")}</p>
                </motion.div>

                {/* Category Tabs */}
                <motion.div
                    className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 md:px-6 md:py-3 rounded-xl text-sm md:text-base font-medium transition-all ${activeCategory === category
                                    ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg"
                                    : "bg-glass border-glass hover:bg-white/80 dark:hover:bg-slate-800/80"
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {t(`skills.categories.${category}`)}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Skills Grid */}
                <motion.div
                    key={activeCategory}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {skillsData[activeCategory].map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            className="card group"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.4, delay: 0.05 * index }}
                        >
                            <div className="text-center">
                                <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">
                                    {skill.icon}
                                </div>
                                <h4 className="font-semibold mb-2">{skill.name}</h4>

                                {/* Skill Level Bar */}
                                <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                                        initial={{ width: 0 }}
                                        animate={isInView ? { width: `${skill.level}%` } : {}}
                                        transition={{ duration: 1, delay: 0.5 + 0.05 * index }}
                                    />
                                </div>
                                <span className="text-xs text-muted mt-1 block">{skill.level}%</span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
