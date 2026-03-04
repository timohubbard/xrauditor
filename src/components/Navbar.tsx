"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="bg-brand-navy text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center mr-8">
                            <span className="font-bold text-xl tracking-tight">Open Science VR/XR</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                href="/"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname === "/"
                                        ? "border-brand-teal text-white"
                                        : "border-transparent text-gray-300 hover:border-gray-300 hover:text-white"
                                    }`}
                            >
                                Plan Project
                            </Link>
                            <Link
                                href="/audit"
                                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${pathname === "/audit"
                                        ? "border-brand-teal text-white"
                                        : "border-transparent text-gray-300 hover:border-gray-300 hover:text-white"
                                    }`}
                            >
                                Audit Project
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
