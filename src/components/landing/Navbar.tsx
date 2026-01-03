import { Send } from "lucide-react";
import Link from "next/link";
import { Github } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 py-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/" className="relative flex items-center justify-center group">
                        <Github className="h-9 w-9 text-white relative z-10 transition-transform group-hover:scale-110" />
                        <Send className="h-4 w-4 text-blue-400 absolute -bottom-1 -right-1 z-20 bg-black rounded-full p-[2px]" />
                    </Link>
                </div>
            </div>
        </nav>
    );
}
