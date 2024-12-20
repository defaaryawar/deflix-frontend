const Deflix = ({ text = "Deflix.", className = "" }) => {
    return (
        <p
            className={`text-deflixRed font-sans font-extrabold text-4xl px-2 cursor-default ${className}`}
            aria-label="Deflix Logo"
        >
            {text}
        </p>
    );
}

export default Deflix;
