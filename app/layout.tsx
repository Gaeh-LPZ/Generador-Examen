import type { Metadata } from "next";
import "./globals.css";
import Header from "./ui/header";

export const metadata: Metadata = {
    title: "Exam Generator",
    description: "Try your best in this exam generator, get points asserting the questions, create your free account right now",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className="min-h-full flex flex-col">
                <Header/>
                {children}
            </body>
        </html>
    );
}
