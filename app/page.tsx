import Image from "next/image";

export default function Page() {
    return (
        <main className="pt-16">
            <section className="relative overflow-hidden bg-surface py-24 lg:py-32">
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    <div className="z-10">
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide uppercase bg-primary-fixed text-on-primary-fixed rounded-full">
                            Powered by Google Gemini
                        </span>
                        <h1 className="font-headline text-5xl lg:text-7xl font-extrabold text-on-surface tracking-tight leading-[1.1] mb-8">
                            Level Up Your Knowledge with AI-Generated Exams
                        </h1>
                        <p className="text-lg lg:text-xl text-on-surface-variant mb-10 max-w-xl leading-relaxed">
                            Harness the sophisticated intelligence of Google Gemini to create bespoke assessments. Transform any topic into a curated learning journey with instant editorial-grade exams.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-indigo-700 p-3 text-white font-bold rounded-xl text-lg cursor-pointer hover:scale-105 transition-all transform">
                                Get Started
                            </button>
                            <button className="bg-surface-container-high text-on-surface px-8 py-4 rounded-xl text-lg font-bold transition-transform active:scale-95">
                                View Demo
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute -top-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
                        <div className="relative bg-surface-container-lowest p-8 rounded-xl shadow-2xl shadow-on-surface/5 border border-outline-variant/15">
                            <Image alt="Abstract AI neural network visualization" className="rounded-lg w-full h-100 object-cover" src="/IA.png" width={512} height={512} />
                            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl flex items-center gap-4 border border-outline-variant/10">
                                <Image src="/sparkles.svg" alt="sparkle icon referred to IA" width={24} height={24}/>
                                <div>
                                    <p className="text-sm font-bold">AI Accuracy</p>
                                    <p className="text-xs text-on-surface-variant">99.4% Precision Rate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}