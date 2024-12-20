// AccordionButton.js
export function AccordionButton({ isExpanded, toggleExpand, label }) {
    return (
        <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-300 border-b border-gray-800 rounded-t-xl hover:bg-black/70 dark:hover:bg-gray-950 gap-3 transition-all duration-300"
            onClick={toggleExpand}
            aria-expanded={isExpanded}
            aria-controls="accordion-collapse-body"
        >
            <span>{label}</span>
            <svg
                className={`w-3 h-3 ${isExpanded ? "rotate-180" : ""} shrink-0 transition-transform duration-300`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                />
            </svg>
        </button>
    );
}
