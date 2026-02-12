import { notFound } from "next/navigation";
import Link from "next/link";
import { COURSES } from "../../../../data/courses";
import LessonQuizRenderer from "@/components/academia/LessonQuizRenderer";
import { ChevronLeft } from "lucide-react";

interface ExamPageProps {
    params: { slug: string };
}

export async function generateStaticParams() {
    return COURSES.filter(c => c.slug !== "bicameralidad").map((course) => ({
        slug: course.slug,
    }));
}

export default function ExamPage({ params }: ExamPageProps) {
    const course = COURSES.find((c) => c.slug === params.slug);

    if (!course || !course.quiz) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b sticky top-0 z-10 px-4 py-3 shadow-sm">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link
                        href={`/academia/courses/${course.slug}`}
                        className="text-gray-500 hover:text-primary flex items-center gap-2 text-sm font-medium"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        Volver al Curso
                    </Link>
                    <div className="font-bold text-gray-800">
                        Examen Final: {course.title}
                    </div>
                </div>
            </div>

            <main className="max-w-2xl mx-auto px-4 py-12">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Evaluación Final</h1>
                    <p className="text-gray-600">
                        Demuestra lo que has aprendido para ganar tus {course.xp} XP.
                    </p>
                </div>

                <LessonQuizRenderer
                    questions={course.quiz.questions}
                    onComplete={(score) => {
                        console.log("Final Exam Completed", score);
                        // TODO: Save progress, unlock certificate, etc.
                    }}
                />
            </main>
        </div>
    );
}
