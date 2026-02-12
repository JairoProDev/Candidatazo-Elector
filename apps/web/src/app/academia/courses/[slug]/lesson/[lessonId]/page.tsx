import { notFound } from "next/navigation";
import Link from "next/link";
import { COURSES } from "../../../../data/courses";
import LessonRenderer from "@/components/academia/LessonRenderer";
import LessonQuizWrapper from "@/components/academia/LessonQuizWrapper";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

interface LessonPageProps {
    params: Promise<{
        slug: string;
        lessonId: string;
    }>;
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

export default async function LessonPage({ params }: LessonPageProps) {
    const { slug, lessonId } = await params;
    const course = COURSES.find((c) => c.slug === slug);
    if (!course) notFound();

    const lessonIndex = course.lessons.findIndex((l) => l.id === lessonId);
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

                {/* Lesson Quiz - Using Wrapper to avoid passing function props from Server to Client */}
                {hasQuiz && (
                    <LessonQuizWrapper
                        questions={lesson.quiz!.questions}
                        lessonTitle={lesson.title}
                    />
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
                            Finalizar Curso <CheckCircle className="w-5 h-5" />
                        </Link>
                    )}
                </div>
            </main>
        </div>
    );
}
