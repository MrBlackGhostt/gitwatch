"use client";

/**
 * Phone Frame Component - DEEP PURPLE
 * 
 * iPhone 14 Pro Deep Purple style mockup
 * Adapted to be standalone (no ThemeProvider dependency)
 */

import { ReactNode } from "react";

interface PhoneFrameProps {
    children: ReactNode;
}

export function PhoneFrame({ children }: PhoneFrameProps) {
    // Hardcoded to dark mode for the landing page
    const isDark = true;

    return (
        <div className="relative">
            {/* Phone Device - DEEP PURPLE */}
            <div className="relative">
                {/* Outer Frame - Deep Purple Titanium */}
                <div
                    className="relative p-[8px] rounded-[56px] transition-all duration-300"
                    style={{
                        background: 'linear-gradient(145deg, #4A3F5C 0%, #36304A 30%, #2D2640 70%, #1E1A2E 100%)',
                        boxShadow: isDark
                            ? '0 40px 80px -20px rgba(0,0,0,0.6), 0 0 40px rgba(139, 92, 246, 0.15), inset 0 2px 0 rgba(255,255,255,0.2)'
                            : '0 40px 80px -20px rgba(0,0,0,0.3), 0 0 40px rgba(139, 92, 246, 0.1), inset 0 2px 0 rgba(255,255,255,0.3)'
                    }}
                >
                    {/* Inner bezel */}
                    <div className="rounded-[48px] p-[3px]" style={{ background: '#0a0a0c' }}>
                        {/* Screen - 375x812 */}
                        <div
                            className="relative w-[300px] sm:w-[350px] lg:w-[375px] h-[650px] sm:h-[750px] lg:h-[812px] rounded-[45px] overflow-hidden transition-all duration-300"
                            style={{ background: isDark ? "#0c0c0e" : "#ffffff" }}
                        >

                            {/* Dynamic Island */}
                            <div className="absolute top-[12px] left-1/2 -translate-x-1/2 z-50">
                                <div
                                    className="w-[90px] h-[28px] bg-black rounded-[14px] flex items-center justify-center gap-[6px]"
                                    style={{ boxShadow: 'inset 0 0 2px rgba(255,255,255,0.1)' }}
                                >
                                    <div className="w-[8px] h-[8px] rounded-full bg-[#0d0d1a] border border-[#252535]" />
                                    <div className="w-[5px] h-[5px] rounded-full bg-[#111]" />
                                </div>
                            </div>

                            {/* Status Bar */}
                            <div className="absolute top-[12px] left-0 right-0 h-[40px] flex items-center justify-between px-7 z-40">
                                <span
                                    className="text-[13px] font-semibold transition-colors"
                                    style={{ color: isDark ? '#fff' : '#000' }}
                                >
                                    9:41
                                </span>
                                <div className="flex items-center gap-[4px]">
                                    <CellularIcon dark={isDark} />
                                    <WifiIcon dark={isDark} />
                                    <BatteryIcon dark={isDark} />
                                </div>
                            </div>

                            {/* Screen Content */}
                            <div className="absolute inset-0 pt-[52px] pb-[28px] overflow-hidden">
                                <div className="h-full overflow-y-auto bg-[#0c0c0e] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                    {children}
                                </div>
                            </div>

                            {/* Home Indicator */}
                            <div
                                className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[120px] h-[5px] rounded-full transition-colors"
                                style={{ background: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.2)' }}
                            />
                        </div>
                    </div>
                </div>

                {/* Side Buttons - Deep Purple */}
                <div className="absolute left-[-7px] top-[110px] w-[6px] h-[26px] rounded-l-[4px]" style={{ background: 'linear-gradient(to right, #4A3F5C, #36304A)' }} />
                <div className="absolute left-[-7px] top-[155px] w-[6px] h-[52px] rounded-l-[4px]" style={{ background: 'linear-gradient(to right, #4A3F5C, #36304A)' }} />
                <div className="absolute left-[-7px] top-[220px] w-[6px] h-[52px] rounded-l-[4px]" style={{ background: 'linear-gradient(to right, #4A3F5C, #36304A)' }} />
                <div className="absolute right-[-7px] top-[180px] w-[6px] h-[80px] rounded-r-[4px]" style={{ background: 'linear-gradient(to left, #4A3F5C, #36304A)' }} />
            </div>
        </div>
    );
}

function CellularIcon({ dark }: { dark: boolean }) {
    const color = dark ? 'white' : 'black';
    return (
        <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
            <rect x="0" y="6" width="3" height="4" rx="0.5" fill={color} fillOpacity="0.3" />
            <rect x="4" y="4" width="3" height="6" rx="0.5" fill={color} fillOpacity="0.5" />
            <rect x="8" y="2" width="3" height="8" rx="0.5" fill={color} />
            <rect x="12" y="0" width="3" height="10" rx="0.5" fill={color} />
        </svg>
    );
}

function WifiIcon({ dark }: { dark: boolean }) {
    return (
        <svg width="14" height="10" viewBox="0 0 14 10" fill={dark ? 'white' : 'black'}>
            <path d="M7 2C9 2 10.8 2.8 12 4.1L13 3.1C11.5 1.6 9.4 0.7 7 0.7C4.6 0.7 2.5 1.6 1 3.1L2 4.1C3.2 2.8 5 2 7 2ZM7 4.5C8.3 4.5 9.5 5 10.4 5.9L11.4 4.9C10.2 3.7 8.7 3.1 7 3.1C5.3 3.1 3.8 3.7 2.6 4.9L3.6 5.9C4.5 5 5.7 4.5 7 4.5ZM7 7C7.6 7 8.1 7.2 8.5 7.6L9.5 6.6C8.8 5.9 7.9 5.6 7 5.6C6.1 5.6 5.2 5.9 4.5 6.6L5.5 7.6C5.9 7.2 6.4 7 7 7ZM7 9.3C7.4 9.3 7.8 8.9 7.8 8.5C7.8 8.1 7.4 7.7 7 7.7C6.6 7.7 6.2 8.1 6.2 8.5C6.2 8.9 6.6 9.3 7 9.3Z" />
        </svg>
    );
}

function BatteryIcon({ dark }: { dark: boolean }) {
    const color = dark ? 'white' : 'black';
    return (
        <svg width="24" height="11" viewBox="0 0 24 11" fill="none">
            <rect x="0.5" y="0.5" width="19" height="10" rx="2.5" stroke={color} strokeOpacity="0.35" strokeWidth="1" />
            <rect x="2" y="2" width="16" height="7" rx="1.5" fill={color} />
            <path d="M21 3.5V7.5C22 7.5 22.8 6.7 22.8 5.5C22.8 4.3 22 3.5 21 3.5Z" fill={color} fillOpacity="0.4" />
        </svg>
    );
}
