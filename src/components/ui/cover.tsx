"use client";
import React, { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Actually Aceternity Cover usually comes with SparklesCore separately or inline.
// I will inline the sparkles logic nicely here to match the specific "Cover" visual.

export const Cover = ({
    children,
    className,
}: {
    children?: React.ReactNode;
    className?: string;
}) => {
    const [hovered, setHovered] = useState(false);

    const ref = React.useRef<HTMLDivElement>(null);

    const [containerWidth, setContainerWidth] = useState(0);
    const [beamPositions, setBeamPositions] = useState<number[]>([]);

    useEffect(() => {
        if (ref.current) {
            setContainerWidth(ref.current.clientWidth ?? 0);

            const height = ref.current.clientHeight ?? 0;
            const numberOfBeams = Math.floor(height / 10); // Adjust density
            const positions = Array.from(
                { length: numberOfBeams },
                (_, i) => (i + 1) * (height / (numberOfBeams + 1))
            );
            setBeamPositions(positions);
        }
    }, [ref.current]);

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            ref={ref}
            className={cn(
                "relative hover:bg-neutral-900 group/cover inline-block dark:bg-neutral-900 bg-neutral-100 transition-all duration-200 rounded-sm px-2 py-2",
                className
            )}
        >
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            opacity: {
                                duration: 0.2,
                            },
                        }}
                        className="h-full w-full overflow-hidden absolute inset-0 group-hover/cover:opacity-100 z-10"
                    >
                        <motion.div
                            animate={{
                                translateX: ["-50%", "0%"],
                            }}
                            transition={{
                                translateX: {
                                    duration: 10,
                                    ease: "linear",
                                    repeat: Infinity,
                                },
                            }}
                            className="w-[200%] h-full flex"
                        >
                            <Sparkles />
                            <Sparkles />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="relative z-20 transition-colors group-hover/cover:text-white text-neutral-900 dark:text-white">
                {children}
            </div>
        </div>
    );
};

export const Sparkles = () => {
    const randomMove = () => Math.random() * 2 - 1;
    const randomOpacity = () => Math.random();
    const random = () => Math.random();
    return (
        <div className="absolute inset-0 h-full w-full">
            {[...Array(20)].map((_, i) => (
                <motion.span
                    key={`star-${i}`}
                    animate={{
                        top: `calc(${random() * 100}%)`,
                        left: `calc(${random() * 100}%)`,
                        opacity: randomOpacity(),
                        scale: [1, 1.2, 0],
                    }}
                    transition={{
                        duration: random() * 2 + 3,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        position: "absolute",
                        top: `${random() * 100}%`,
                        left: `${random() * 100}%`,
                        width: `2px`,
                        height: `2px`,
                        borderRadius: "50%",
                        zIndex: 1,
                    }}
                    className="inline-block bg-white"
                ></motion.span>
            ))}
        </div>
    );
};

export const Beam = ({ className }: { className?: string }) => {
    return (
        <svg
            width="156"
            height="3"
            viewBox="0 0 156 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("absolute", className)}
        >
            <path
                d="M1 1.49963L155 1.49963"
                stroke="url(#paint0_linear_1409_478)"
                strokeOpacity="0.5"
                strokeLinecap="round"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_1409_478"
                    x1="110.958"
                    y1="1.49963"
                    x2="-38.2917"
                    y2="1.49963"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#9E7AFF" stopOpacity="0" />
                    <stop offset="0.510417" stopColor="#9E7AFF" />
                    <stop offset="1" stopColor="#9E7AFF" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
    );
};
