// AccordionItem.js
import { AccordionButton } from './AccordionButton';
import { AccordionContent } from './AccordionContent';

export function AccordionItem({ label, isExpanded, toggleExpand, children }) {
    return (
        <div classname="bg-black opacity-70">
            <AccordionButton isExpanded={isExpanded} toggleExpand={toggleExpand} label={label} />
            <AccordionContent isExpanded={isExpanded}>{children}</AccordionContent>
        </div>
    );
}
