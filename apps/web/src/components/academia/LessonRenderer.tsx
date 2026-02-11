import React from "react";

interface LessonRendererProps {
    content: string;
}

export default function LessonRenderer({ content }: LessonRendererProps) {
    // Simple markdown-ish parser for optimized rendering without heavy libraries
    const renderContent = (text: string) => {
        // Split by paragraphs
        const paragraphs = text.split(/\n\s*\n/).filter(Boolean);

        return paragraphs.map((block, index) => {
            // Check for bullet lists
            if (block.trim().startsWith("- ")) {
                const items = block
                    .split("\n")
                    .filter((line) => line.trim().startsWith("- "))
                    .map((line) => line.trim().substring(2));

                return (
                    <ul key={index} className="list-disc pl-6 space-y-2 mb-4 text-gray-700">
                        {items.map((item, i) => (
                            <li key={i} dangerouslySetInnerHTML={{ __html: parseInline(item) }} />
                        ))}
                    </ul>
                );
            }

            // Check for headings (### = h3)
            if (block.trim().startsWith("### ")) {
                return (
                    <h3
                        key={index}
                        className="text-xl font-bold text-gray-800 mt-6 mb-3"
                        dangerouslySetInnerHTML={{
                            __html: parseInline(block.trim().substring(4)),
                        }}
                    />
                );
            }

            // Check for headings (**TEXT**) as standalone line = subheading
            if (block.trim().startsWith("**") && block.trim().endsWith("**") && block.length < 100) {
                return (
                    <h4
                        key={index}
                        className="text-lg font-bold text-gray-800 mt-4 mb-2"
                        dangerouslySetInnerHTML={{
                            __html: parseInline(block.trim().slice(2, -2)),
                        }}
                    />
                );
            }

            // Regular paragraph
            return (
                <p
                    key={index}
                    className="text-gray-700 leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: parseInline(block) }}
                />
            );
        });
    };

    // Helper for inline styles
    const parseInline = (text: string) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
            .replace(/`(.*?)`/g, "<code class='bg-gray-100 px-1 rounded text-sm font-mono text-primary'>$1</code>") // Code
            .replace(/\n/g, "<br/>"); // Line breaks inside paragraphs
    };

    return <div className="prose max-w-none">{renderContent(content)}</div>;
}
