"use client";

import { useEffect } from "react";
import { Send } from "lucide-react";

export default function AuthSuccess() {
    useEffect(() => {
        // Attempt to open Telegram app automatically
        const botUsername = "Gitwtch_bot";
        const tgUrl = `tg://resolve?domain=${botUsername}&start=connected`;
        const webUrl = `https://t.me/${botUsername}?start=connected`;

        // Try deep link first
        window.location.href = tgUrl;

        // Fallback to web after a short delay if app doesn't open
        const timer = setTimeout(() => {
            window.location.href = webUrl;
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="text-center max-w-md w-full bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                <div className="mb-6 flex justify-center">
                    <div className="h-16 w-16 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <Send className="h-8 w-8 text-blue-400" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-white mb-4">You're Connected!</h1>

                <p className="text-gray-400 mb-8 leading-relaxed">
                    Your GitHub account has been successfully linked to GitWatch. You're ready to receive notifications.
                </p>

                <div className="space-y-4">
                    <a
                        href="https://t.me/Gitwtch_bot?start=connected"
                        className="block w-full px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-500 font-semibold transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                    >
                        Return to Telegram
                    </a>

                    <p className="text-xs text-gray-500 animate-pulse">
                        Redirecting you back to the bot...
                    </p>
                </div>
            </div>
        </div>
    );
}
