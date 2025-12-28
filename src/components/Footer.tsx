"use client";

import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export function Footer() {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 px-4 border-t border-glass">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Logo & Copyright */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-2"
                    >
                        <span className="text-2xl font-display font-bold text-gradient">EK</span>
                        <span className="text-sm text-muted">
                            © {currentYear} Emre Kahveci. {t("footer.copyright")}
                        </span>
                    </motion.div>

                    {/* Made with love */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center gap-2 text-sm text-muted"
                    >
                        <span>{t("footer.madeWith")}</span>
                        <motion.span
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="text-red-500"
                        >
                            ❤️
                        </motion.span>
                        <span>& Next.js</span>
                    </motion.div>

                    {/* Back to top */}
                    <motion.a
                        href="#home"
                        className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
                        whileHover={{ y: -2 }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <span>Back to top</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                    </motion.a>
                </div>
            </div>
        </footer>
    );
}
