import { notFound } from "next/navigation";
import Link from "next/link";
import { COURSES } from "../../data/courses";
import { PlayCircle, CheckCircle, ChevronRight, BookOpen, Clock, Award } from "lucide-react";

interface PageProps {
    params: { slug: string };
}

export async function generateStaticParams() {
    return COURSES.filter(c => c.slug !== "bicameralidad").map((course) => ({
        slug: course.slug,
    }));
}

export default async function CoursePage({ params }: PageProps) {
    const { slug } = await params;
    const course = COURSES.find((c) => c.slug === slug);

    if (!course) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Header */}
            <section className="bg-white border-b border-gray-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <Link
                        href="/academia"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary mb-8 transition-colors"
                    >
                        ← Volver a Academia
                    </Link>

                    <div className="grid md:grid-cols-3 gap-8 items-start">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${course.difficultyColor}`}>
                                    {course.difficulty}
                                </span>
                                <span className="flex items-center gap-1 text-xs font-medium text-gray-500">
                                    <Clock className="w-3 h-3" /> {course.time}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                                {course.title}
                            </h1>

                            <p className="text-xl text-gray-600 mb-8 font-light leading-relaxed">
                                {course.description}
                                {course.subtitle && <span className="block mt-2 text-gray-500 text-lg">{course.subtitle}</span>}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href={`/academia/courses/${course.slug}/lesson/${course.lessons[0]?.id}`}
                                    className="bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-2"
                                >
                                    <PlayCircle className="w-6 h-6" /> Comenzar Curso
                                </Link>
                            </div>
                        </div>

                        {/* Sidebar Stats */}
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hidden md:block">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                                Detalles del Curso
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600 flex items-center gap-2">
                                        <BookOpen className="w-4 h-4" /> Lecciones
                                    </span>
                                    <span className="font-bold text-gray-900">{course.lessons.length}</span>
                                </li>
                                <li className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600 flex items-center gap-2">
                                        <Award className="w-4 h-4" /> XP Total
                                    </span>
                                    <span className="font-bold text-primary">{course.xp} XP</span>
                                </li>
                            </ul>

                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Temas</h4>
                                <div className="flex flex-wrap gap-2">
                                    {course.tags.map(tag => (
                                        <span key={tag} className="text-xs bg-white border border-gray-200 px-2 py-1 rounded-md text-gray-600">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Syllabus */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b pb-4">Contenido del Curso</h2>

                <div className="space-y-4">
                    {course.lessons.map((lesson, idx) => (
                        <Link
                            key={lesson.id}
                            href={`/academia/courses/${course.slug}/lesson/${lesson.id}`}
                            className="group block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-100 text-gray-500 font-bold flex items-center justify-center text-lg group-hover:bg-primary group-hover:text-white transition-colors">
                                    {idx + 1}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors mb-1">
                                        {lesson.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 line-clamp-1">
                                        {/* Preview of content could go here, stripping MD */}
                                        Clase {idx + 1} - {course.time} aprox.
                                    </p>
                                </div>
                                <div className="text-gray-300 group-hover:text-primary transition-colors">
                                    <ChevronRight className="w-6 h-6" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {course.quiz && course.quiz.questions.length > 0 && (
                    <div className="mt-8 border-t border-gray-200 pt-8">
                        <Link
                            href={`/academia/courses/${course.slug}/exam`}
                            className="bg-white rounded-xl border border-yellow-200 p-6 flex items-center justify-between hover:shadow-lg hover:border-yellow-400 transition-all cursor-pointer group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center font-bold text-xl">
                                    ?
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-700 transition-colors">
                                        Evaluación Final
                                    </h3>
                                    <p className="text-gray-500 text-sm">
                                        Pon a prueba tus conocimientos y obtén tu XP.
                                    </p>
                                </div>
                            </div>
                            <div className="text-yellow-500 group-hover:text-yellow-700 transition-colors">
                                <ChevronRight className="w-6 h-6" />
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
