"use client";
import React from "react";
import { ExpandableFeatures } from "../ui/expandable-card";

export default function Features() {
    return (
        <section id="features" className="relative z-30 -mt-32 sm:-mt-64 pb-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl mt-24">
                    <ExpandableFeatures />
                </div>
            </div>
        </section>
    );
}
