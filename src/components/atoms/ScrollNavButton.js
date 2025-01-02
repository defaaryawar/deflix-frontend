import React from 'react';

const ScrollNavButton = ({ direction, onClick, showButton }) => {
    return (
        <div className={`absolute top-1/2 transform -translate-y-1/2 z-10 ${direction === 'left' ? 'left-0' : 'right-0'}`}>
            {/* Latar belakang blur */}
            <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-lg rounded-full"></div>
            
            <button
                onClick={onClick}
                className={`relative px-1 py-10 text-2xl bg-gray-300/20 text-white rounded-full bg-opacity-30 shadow-lg hover:bg-gray-200/30 outline-none transition-all ${showButton ? 'block' : 'hidden'}`}
            >
                {direction === 'left' ? '<' : '>'}
            </button>
        </div>
    );
};

export default ScrollNavButton;
