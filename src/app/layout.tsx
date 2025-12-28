import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Emre Kahveci | Full Stack Developer",
    description:
        "Full Stack Developer specializing in .NET, Python, Machine Learning, and Game Development. View my portfolio of projects and get in touch.",
    keywords: [
        "Emre Kahveci",
        "Full Stack Developer",
        "Software Engineer",
        ".NET Developer",
        "Python Developer",
        "Machine Learning",
        "Portfolio",
    ],
    authors: [{ name: "Emre Kahveci" }],
    openGraph: {
        title: "Emre Kahveci | Full Stack Developer",
        description:
            "Full Stack Developer specializing in .NET, Python, Machine Learning, and Game Development.",
        type: "website",
        locale: "en_US",
        alternateLocale: "tr_TR",
    },
    twitter: {
        card: "summary_large_image",
        title: "Emre Kahveci | Full Stack Developer",
        description:
            "Full Stack Developer specializing in .NET, Python, Machine Learning, and Game Development.",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${outfit.variable} font-sans antialiased`}
                suppressHydrationWarning
            >
                <Providers>
                    <div className="relative min-h-screen flex flex-col">
                        <Navbar />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
