import fs from "fs";
import path from "path";

export interface Project {
    slug: string;
    title: string;
    description: string;
    technologies: string[];
    category: string;
    language: string;
    githubUrl?: string;
}

// Map of primary languages detected from technologies
const languageMapping: Record<string, string> = {
    // C#/.NET
    "c#": "C#",
    ".net": "C#",
    "asp.net": "C#",
    "entity framework": "C#",
    "wpf": "C#",
    "windows forms": "C#",
    "unity": "C#",

    // Python
    "python": "Python",
    "tensorflow": "Python",
    "keras": "Python",
    "pytorch": "Python",
    "pygame": "Python",
    "flask": "Python",
    "django": "Python",
    "jupyter": "Python",

    // Java
    "java": "Java",
    "spring": "Java",
    "android": "Java",

    // JavaScript/TypeScript
    "javascript": "JavaScript",
    "typescript": "TypeScript",
    "react": "JavaScript",
    "next.js": "JavaScript",
    "node.js": "JavaScript",
    "vue": "JavaScript",

    // C++
    "c++": "C++",
    "cpp": "C++",

    // Other
    "go": "Go",
    "rust": "Rust",
    "php": "PHP",
};

// Featured projects - one per language/technology category
const featuredProjects: Record<string, string> = {
    "C#": "MiyosisAPI", // .NET API project
    "Python": "car-body-type-classification", // ML project
    "Java": "adb-based-mobile-automation", // Automation
    "Unity": "tetris", // Game development
    "Voice Control": "voice-controlled-snake-game", // Unique project
};

function detectLanguage(technologies: string[]): string {
    const techLower = technologies.map((t) => t.toLowerCase());

    for (const tech of techLower) {
        for (const [key, lang] of Object.entries(languageMapping)) {
            if (tech.includes(key)) {
                return lang;
            }
        }
    }

    return "Other";
}

function extractTitle(content: string): string {
    // Extract first # heading
    const titleMatch = content.match(/^#\s+(.+)$/m);
    return titleMatch ? titleMatch[1].trim() : "Untitled Project";
}

function extractDescription(content: string): string {
    // Get content after the first heading, skip table of contents
    const lines = content.split("\n");
    let foundHeading = false;
    let description = "";

    for (const line of lines) {
        if (line.startsWith("# ")) {
            foundHeading = true;
            continue;
        }

        if (foundHeading && line.trim() && !line.startsWith("#") && !line.startsWith("-") && !line.startsWith("|") && !line.startsWith("```")) {
            description = line.trim();
            break;
        }
    }

    // Limit description length
    if (description.length > 200) {
        description = description.substring(0, 197) + "...";
    }

    return description || "A software project.";
}

function extractTechnologies(content: string): string[] {
    const technologies: Set<string> = new Set();

    // Look for technology sections
    const techPatterns = [
        /##\s*(?:🛠️\s*)?(?:Technologies?|Tech(?:nology)?\s*Stack|Tools)/i,
        /\*\*(?:Framework|Platform|Language)\*\*:\s*(.+)/gi,
    ];

    // Extract from markdown lists under technology headers
    const techSectionMatch = content.match(
        /##\s*(?:🛠️\s*)?(?:Technologies?|Tech(?:nology)?\s*Stack|Tools)[^\n]*\n([\s\S]*?)(?=##|$)/i
    );

    if (techSectionMatch) {
        const techSection = techSectionMatch[1];

        // Extract bold items
        const boldMatches = techSection.matchAll(/\*\*([^*]+)\*\*/g);
        for (const match of boldMatches) {
            const tech = match[1].trim();
            if (tech.length < 30 && !tech.includes(":")) {
                technologies.add(tech);
            }
        }

        // Extract list items
        const listMatches = techSection.matchAll(/-\s+\*\*([^*]+)\*\*|`([^`]+)`/g);
        for (const match of listMatches) {
            const tech = (match[1] || match[2])?.trim();
            if (tech && tech.length < 30) {
                technologies.add(tech);
            }
        }
    }

    // Also check for inline tech mentions
    const inlineTechs = [
        ".NET", "C#", "Python", "Java", "JavaScript", "TypeScript",
        "React", "Next.js", "Node.js", "TensorFlow", "Keras", "PyTorch",
        "Unity", "Pygame", "SQL Server", "Entity Framework", "AutoMapper",
        "WPF", "Windows Forms", "ASP.NET Core", "JWT", "Redis",
    ];

    for (const tech of inlineTechs) {
        if (content.toLowerCase().includes(tech.toLowerCase())) {
            technologies.add(tech);
        }
    }

    return Array.from(technologies).slice(0, 6);
}

function detectCategory(title: string, description: string, technologies: string[]): string {
    const combined = `${title} ${description} ${technologies.join(" ")}`.toLowerCase();

    if (combined.includes("api") || combined.includes("backend") || combined.includes("service")) {
        return "Backend";
    }
    if (combined.includes("machine learning") || combined.includes("deep learning") || combined.includes("classification") || combined.includes("tensorflow") || combined.includes("keras")) {
        return "Machine Learning";
    }
    if (combined.includes("game") || combined.includes("unity") || combined.includes("pygame")) {
        return "Game Development";
    }
    if (combined.includes("automation") || combined.includes("bot") || combined.includes("script")) {
        return "Automation";
    }
    if (combined.includes("desktop") || combined.includes("wpf") || combined.includes("windows forms")) {
        return "Desktop App";
    }
    if (combined.includes("web") || combined.includes("react") || combined.includes("next") || combined.includes("frontend")) {
        return "Web";
    }

    return "Software";
}

export function getFeaturedProjects(): Project[] {
    const projectsDir = path.join(process.cwd(), "projects");
    const projects: Project[] = [];

    try {
        const folders = fs.readdirSync(projectsDir, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith("."));

        // Get featured projects
        const featuredSlugs = Object.values(featuredProjects);

        for (const folder of folders) {
            if (!featuredSlugs.includes(folder.name)) continue;

            const readmePath = path.join(projectsDir, folder.name, "README.md");

            if (!fs.existsSync(readmePath)) continue;

            try {
                const content = fs.readFileSync(readmePath, "utf-8");
                const title = extractTitle(content);
                const description = extractDescription(content);
                const technologies = extractTechnologies(content);
                const language = detectLanguage(technologies);
                const category = detectCategory(title, description, technologies);

                projects.push({
                    slug: folder.name,
                    title,
                    description,
                    technologies,
                    category,
                    language,
                    githubUrl: `https://github.com/Emre-Kahveci/${folder.name}`,
                });
            } catch {
                // Skip projects with unreadable READMEs
            }
        }
    } catch {
        // Return empty array if projects folder doesn't exist
    }

    return projects;
}

export function getAllTechnologies(): { name: string; count: number; category: string }[] {
    const projectsDir = path.join(process.cwd(), "projects");
    const techCounts: Map<string, { count: number; category: string }> = new Map();

    // Technology categorization
    const techCategories: Record<string, string> = {
        // Languages
        "C#": "Languages",
        ".NET": "Frameworks",
        "Python": "Languages",
        "Java": "Languages",
        "JavaScript": "Languages",
        "TypeScript": "Languages",
        "C++": "Languages",

        // Frameworks
        "ASP.NET Core": "Frameworks",
        "Entity Framework": "Frameworks",
        "React": "Frameworks",
        "Next.js": "Frameworks",
        "Node.js": "Frameworks",
        "TensorFlow": "Frameworks",
        "Keras": "Frameworks",
        "PyTorch": "Frameworks",
        "Unity": "Frameworks",
        "Pygame": "Frameworks",
        "WPF": "Frameworks",
        "Windows Forms": "Frameworks",

        // Tools
        "SQL Server": "Databases",
        "Redis": "Databases",
        "Git": "Tools",
        "Docker": "Tools",
        "JWT": "Tools",
        "AutoMapper": "Tools",
    };

    try {
        const folders = fs.readdirSync(projectsDir, { withFileTypes: true })
            .filter((dirent) => dirent.isDirectory() && !dirent.name.startsWith("."));

        for (const folder of folders) {
            const readmePath = path.join(projectsDir, folder.name, "README.md");

            if (!fs.existsSync(readmePath)) continue;

            try {
                const content = fs.readFileSync(readmePath, "utf-8");
                const technologies = extractTechnologies(content);

                for (const tech of technologies) {
                    const existing = techCounts.get(tech) || { count: 0, category: techCategories[tech] || "Tools" };
                    techCounts.set(tech, { count: existing.count + 1, category: existing.category });
                }
            } catch {
                // Skip unreadable files
            }
        }
    } catch {
        // Return empty array if projects folder doesn't exist
    }

    return Array.from(techCounts.entries())
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.count - a.count);
}
