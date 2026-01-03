"use client";
import React, { useEffect, useState } from "react";

export default function CircuitBackground() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#030014]">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
            >
                <source src="/bg-slow.mp4" type="video/mp4" />
            </video>

            {/* Mouse Follow Spotlight */}
            <div
                className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`,
                }}
            />

            {/* Ambient Glows/Overlays for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#030014]/80 via-transparent to-[#030014]/90 z-0" />
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full z-0" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full z-0" />
        </div>
    );
}
