import { AccordionItem } from './AccordionItem';

export function NestedAccordion({ items }) {
    return (
        <div id="accordion-nested-collapse bg-black/70">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    label={item.label}
                    isExpanded={item.isExpanded}
                    toggleExpand={item.toggleExpand}
                >
                    {item.content}
                </AccordionItem>
            ))}
        </div>
    );
}
