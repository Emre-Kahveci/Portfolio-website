import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { NextRequest, NextResponse } from "next/server";

// Initialize Redis client
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Create rate limiter: 3 requests per hour per IP
const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, "1 h"),
    analytics: true,
    prefix: "@upstash/ratelimit/contact",
});

// Formspree endpoint
const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/YOUR_FORM_ID";

export async function POST(request: NextRequest) {
    try {
        // Get IP address for rate limiting
        const ip = request.headers.get("x-forwarded-for") ||
            request.headers.get("x-real-ip") ||
            "anonymous";

        // Check rate limit
        const { success, limit, reset, remaining } = await ratelimit.limit(ip);

        // If rate limited, return 429
        if (!success) {
            const resetDate = new Date(reset);
            return NextResponse.json(
                {
                    error: "Too many requests. Please try again later.",
                    errorTr: "Çok fazla istek. Lütfen daha sonra tekrar deneyin.",
                    resetAt: resetDate.toISOString(),
                },
                {
                    status: 429,
                    headers: {
                        "X-RateLimit-Limit": limit.toString(),
                        "X-RateLimit-Remaining": remaining.toString(),
                        "X-RateLimit-Reset": reset.toString(),
                    }
                }
            );
        }

        // Parse request body
        const body = await request.json();
        const { name, email, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields", errorTr: "Gerekli alanlar eksik" },
                { status: 400 }
            );
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Invalid email address", errorTr: "Geçersiz e-posta adresi" },
                { status: 400 }
            );
        }

        // Simple honeypot check (if _gotcha field is filled, it's a bot)
        if (body._gotcha) {
            // Silently accept but don't forward to Formspree
            return NextResponse.json({ success: true });
        }

        // Forward to Formspree
        const formspreeResponse = await fetch(FORMSPREE_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ name, email, message }),
        });

        if (!formspreeResponse.ok) {
            const errorData = await formspreeResponse.json().catch(() => ({}));
            console.error("Formspree error:", errorData);
            return NextResponse.json(
                { error: "Failed to send message", errorTr: "Mesaj gönderilemedi" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                remaining,
                message: "Message sent successfully",
                messageTr: "Mesaj başarıyla gönderildi",
            },
            {
                headers: {
                    "X-RateLimit-Limit": limit.toString(),
                    "X-RateLimit-Remaining": remaining.toString(),
                    "X-RateLimit-Reset": reset.toString(),
                }
            }
        );
    } catch (error) {
        console.error("Contact API error:", error);
        return NextResponse.json(
            { error: "Internal server error", errorTr: "Sunucu hatası" },
            { status: 500 }
        );
    }
}
