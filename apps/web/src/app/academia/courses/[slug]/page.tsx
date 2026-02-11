import { notFound } from "next/navigation";
import Link from "next/link";
import { COURSES } from "../../data/courses";
import LessonRenderer from "@/components/academia/LessonRenderer";
import QuizRenderer from "@/components/academia/QuizRenderer";

interface PageProps {
    params: { slug: string };
}

export async function generateStaticParams() {
    return COURSES.filter(c => c.slug !== "bicameralidad").map((course) => ({
        slug: course.slug,
    }));
}

export default function CoursePage({ params }: PageProps) {
    const course = COURSES.find((c) => c.slug === params.slug);

    if (!course) {
        notFound();
    }

    // If it's bicameralidad, we might redirect or handle specially, but here we assume generic renderer
    // Note: bicameralidad has special URL /academia/bicameralidad handled by its own page.tsx
    // This dynamic route handles /academia/courses/[slug]

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
            {/* Hero Header */}
            <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/academia"
                        className="inline-flex items-center gap-2 text-sm text-blue-200 hover:text-white mb-6 transition-colors"
                    >
                        ← Volver a Academia
                    </Link>

                    <div className="flex items-start justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 text-xs font-semibold mb-4">
                                <span className={`w-2 h-2 rounded-full ${course.difficulty === 'Básico' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                                {course.difficulty} • {course.time}
                            </div>

                            <h1 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight">
                                {course.title}
                            </h1>
                            {course.subtitle && (
                                <p className="text-xl text-blue-100 mb-6 max-w-2xl font-light">
                                    {course.subtitle}
                                </p>
                            )}
                        </div>
                        {/* Optional: Course Progress or Icon */}
                        <div className="hidden md:block opacity-20 transform scale-150">
                            {/* Could render course icon here if needed */}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Layout */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid lg:grid-cols-12 gap-8">

                    {/* Sidebar (Desktop) / Toc */}
                    <div className="lg:col-span-3">
                        <div className="sticky top-24 space-y-4">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                                    Contenido
                                </h3>
                                <nav className="space-y-1">
                                    {course.lessons.map((lesson, idx) => (
                                        <a
                                            key={lesson.id}
                                            href={`#lesson-${lesson.id}`}
                                            className="block px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors group flex items-center gap-2"
                                        >
                                            <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs group-hover:bg-primary group-hover:text-white transition-colors">
                                                {idx + 1}
                                            </span>
                                            {lesson.title}
                                        </a>
                                    ))}
                                    <a
                                        href="#quiz"
                                        className="block px-3 py-2 text-sm font-bold text-gray-800 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <span className="w-6 h-6 rounded-full bg-gold text-white flex items-center justify-center text-xs">
                                            ?
                                        </span>
                                        Evaluación
                                    </a>
                                </nav>
                            </div>

                            {/* Stats Card */}
                            <div className="bg-gradient-to-br from-primary-50 to-white rounded-xl p-4 border border-primary-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl">🏆</span>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Recompensa</p>
                                        <p className="font-bold text-primary">{course.xp} XP</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lesson Content */}
                    <div className="lg:col-span-9 space-y-12">
                        {course.lessons.map((lesson, idx) => (
                            <article
                                key={lesson.id}
                                id={`lesson-${lesson.id}`}
                                className="scroll-mt-24 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                            >
                                <div className="border-b border-gray-100 bg-gray-50/50 px-6 py-4 flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shadow-sm">
                                            {idx + 1}
                                        </span>
                                        {lesson.title}
                                    </h2>
                                </div>
                                <div className="p-6 md:p-8">
                                    <LessonRenderer content={lesson.content} />
                                </div>
                            </article>
                        ))}

                        {/* Quiz Section */}
                        <div id="quiz" className="scroll-mt-24 pt-8 border-t border-gray-200">
                            <div className="bg-white rounded-2xl shadow-card border border-gray-200 p-6 md:p-8">
                                <div className="text-center mb-8">
                                    <span className="inline-block p-3 rounded-full bg-gold-50 text-gold-600 mb-4">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </span>
                                    <h2 className="text-2xl font-bold text-gray-900">Evaluación de Conocimientos</h2>
                                    <p className="text-gray-500">Completa este quiz para ganar tus {course.xp} XP</p>
                                </div>

                                <QuizRenderer quiz={course.quiz} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
