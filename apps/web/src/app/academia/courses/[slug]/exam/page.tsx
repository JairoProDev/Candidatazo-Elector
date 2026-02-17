import { notFound } from "next/navigation";
import Link from "next/link";
import { COURSES } from "../../../data/courses";
import ExamQuizWrapper from "@/components/academia/ExamQuizWrapper";
import { ChevronLeft } from "lucide-react";

interface ExamPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return COURSES.filter(c => c.slug !== "bicameralidad").map((course) => ({
        slug: course.slug,
    }));
}

export default async function ExamPage({ params }: ExamPageProps) {
    const { slug } = await params;
    const course = COURSES.find((c) => c.slug === slug);

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

            <ExamQuizWrapper
                questions={course.quiz.questions}
                courseTitle={course.title}
                xp={course.xp}
            />
        </div>
    );
}
