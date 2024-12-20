// AccordionContent.js
export function AccordionContent({ isExpanded, children }) {
    return (
        <div
            className={`overflow-hidden transition-opacity duration-300 ease-in-out ${isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}
            aria-hidden={!isExpanded}
        >
            <div className="p-5 border border-b-0 border-gray-800 dark:border-gray-700 dark:bg-gray-900">
                {children}
            </div>
        </div>
    );
}
