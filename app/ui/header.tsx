'use client';

import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Header() {
    const links = [
        {
            name: "Home",
            href: "/",
        },
        {
            name: "Dashboard",
            href: "/dashboard"
        },
        {
            name: "Profile",
            href: "/profile"
        }
    ]

    const pathname = usePathname();
    return (
        <header className="flex flex-row justify-between border-b p-4 items-center border-gray-200">
            <h1 className="text-lg font-semibold">Cognitive editorial</h1>
            <nav className="hidden sm:flex sm:flex-row sm:gap-3">
                {links.map(link => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-12 grow items-center justify-center gap-2 rounded-md p-3 text-md font-medium hover:text-indigo-700 md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'text-indigo-700 underline': pathname === link.href,
                            },
                        )}
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>
            <button type="button" className="bg-indigo-700 text-white p-2 rounded-md cursor-pointer hover:scale-105 transition-all transform">Create exam</button>
        </header>
    );
}