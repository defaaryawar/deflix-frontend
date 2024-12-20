import { useState } from 'react';
import useFetchTMBD from '../../utils/hooks/useFetchTMBD';
import { FaSpinner } from 'react-icons/fa';

const Card = ({ head, category, item = 'day', onCardClick }) => {
  const { items, loading, error } = useFetchTMBD(head, category, item);

  return (
    <div>
      {/* Menampilkan loading atau error */}
      {loading ? (
        <div className="flex justify-center items-center text-white">
          <FaSpinner className="animate-spin text-4xl" />
          <span className="ml-2">Loading...</span>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="overflow-x-auto pb-4 scroll-container p-2">
          <div className="flex flex-row space-x-4 gap-4">
            {items.length > 0 ? (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex-none w-48 h-80 rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105"
                  onClick={(event) => onCardClick(item, event)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : 'https://via.placeholder.com/500x750?text=No+Image'}
                    alt={item.title || item.name}
                  />
                </div>
              ))
            ) : (
              <p className="text-white">No {head} items available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
