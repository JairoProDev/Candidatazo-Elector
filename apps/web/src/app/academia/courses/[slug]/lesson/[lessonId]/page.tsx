import { notFound } from "next/navigation";
import Link from "next/link";
import { COURSES } from "../../../../data/courses";
import LessonRenderer from "@/components/academia/LessonRenderer";
import LessonQuizRenderer from "@/components/academia/LessonQuizRenderer";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";

interface LessonPageProps {
    params: {
        slug: string;
        lessonId: string;
    };
}

export async function generateStaticParams() {
    const params = [];
    for (const course of COURSES) {
        if (!course.lessons) continue;
        for (const lesson of course.lessons) {
            params.push({
                slug: course.slug,
                lessonId: lesson.id,
            });
        }
    }
    return params;
}

export default function LessonPage({ params }: LessonPageProps) {
    const course = COURSES.find((c) => c.slug === params.slug);
    if (!course) notFound();

    const lessonIndex = course.lessons.findIndex((l) => l.id === params.lessonId);
    if (lessonIndex === -1) notFound();

    const lesson = course.lessons[lessonIndex];
    const nextLesson = course.lessons[lessonIndex + 1];
    const prevLesson = course.lessons[lessonIndex - 1];

    const hasQuiz = lesson.quiz && lesson.quiz.questions.length > 0;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Top Navigation Bar */}
            <div className="bg-white border-b sticky top-0 z-10 px-4 py-3 shadow-sm">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link
                        href={`/academia/courses/${course.slug}`}
                        className="text-gray-500 hover:text-primary flex items-center gap-2 text-sm font-medium"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Volver al Curso
                    </Link>
                    <div className="hidden md:block text-sm font-semibold text-gray-700">
                        {course.title}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                        Lesson {lessonIndex + 1} / {course.lessons.length}
                    </div>
                </div>
            </div>

            <main className="max-w-3xl mx-auto px-4 py-8">
                {/* Lesson Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
                    <div className="h-1 w-20 bg-primary rounded-full" />
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 mb-12">
                    <LessonRenderer content={lesson.content} />
                </div>

                {/* Lesson Quiz */}
                {hasQuiz && (
                    <div className="mb-12">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-yellow-100 text-yellow-700 p-2 rounded-lg">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </span>
                            <h2 className="text-xl font-bold text-gray-800">Ponte a prueba</h2>
                        </div>
                        <LessonQuizRenderer
                            questions={lesson.quiz!.questions}
                            onComplete={(score) => {
                                // In a real app, save progress here
                                console.log("Quiz completed with score:", score);
                            }}
                        />
                    </div>
                )}

                {/* Bottom Navigation */}
                <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-200">
                    {prevLesson ? (
                        <Link
                            href={`/academia/courses/${course.slug}/lesson/${prevLesson.id}`}
                            className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors group"
                        >
                            <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                                <ChevronLeft className="w-5 h-5" />
                            </div>
                            <div className="text-left hidden sm:block">
                                <p className="text-xs text-gray-400 uppercase font-bold">Anterior</p>
                                <p className="text-sm font-medium">{prevLesson.title}</p>
                            </div>
                        </Link>
                    ) : (
                        <div /> // Spacer
                    )}

                    {nextLesson ? (
                        <Link
                            href={`/academia/courses/${course.slug}/lesson/${nextLesson.id}`}
                            className="flex items-center gap-3 text-gray-600 hover:text-primary transition-colors group text-right"
                        >
                            <div className="text-right hidden sm:block">
                                <p className="text-xs text-gray-400 uppercase font-bold">Siguiente</p>
                                <p className="text-sm font-medium">{nextLesson.title}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                                <ChevronRight className="w-5 h-5" />
                            </div>
                        </Link>
                    ) : (
                        <Link
                            href={`/academia/courses/${course.slug}`}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                        >
                            Finalizar Curso <CheckCircleIcon className="w-5 h-5" /> {/* Use icon defined below */}
                        </Link>
                    )}
                </div>
            </main>
        </div>
    );
}

function CheckCircleIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    )
}
