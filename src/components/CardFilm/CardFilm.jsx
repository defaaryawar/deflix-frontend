"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import MenuCard from '../atoms/menu';
import Card from "../atoms/card";
import useMenuSelection from '../../utils/hooks/useMenuSelection';
import useScrollNavigation from '../../utils/hooks/useScrollNavigation';
import ScrollNavButton from '../atoms/ScrollNavButton';
import ModalFetchCard from '../template/ModalFetchCard';
import { calculateModalPosition } from '../../utils/hooks/modalPositionUtil';

const CardFilm = ({ head, title, item, category }) => {
  const { bahasa, text } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const {
    selectedMenu2,
    menu2Items,
    handleMenu2Select,
  } = useMenuSelection();

  const {
    showLeftButton,
    showRightButton,
    scrollLeft,
    scrollRight,
    handleScroll,
    scrollContainerRef,
    itemsRef,
  } = useScrollNavigation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const resolvedCategory = selectedMenu2 === text[bahasa].MenuItems21 ? "movie" : "tv";

  const handleCardClick = (itemData) => {
    console.log(`Card clicked in ${title}, Item Data:`, itemData);
    setSelectedItem(itemData);

    const modalPosition = calculateModalPosition(scrollContainerRef, item);
    setModalPosition(modalPosition);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="md:pb-10 md:px-28 sm:pb-15 sm:px-15 lg:pb-25 md:px-25 px-10 pb-5">
      <div className="flex justify-between">
        <p className="text-white text-3xl font-bold">{title}</p>
        <div className="relative flex gap-4 items-center px-10">
          <MenuCard
            title={selectedMenu2}
            items={menu2Items}
            onItemSelect={handleMenu2Select}
          />
        </div>
      </div>
      <div className="mt-2 relative">
        <div className="absolute top-0 bottom-0 -left-10">
          <ScrollNavButton
            direction="left"
            onClick={scrollLeft}
            showButton={showLeftButton}
          />
        </div>

        <div
          ref={scrollContainerRef}
          className="scroll-container flex overflow-x-auto space-x-4 pb-4 scroll-smooth"
          onScroll={handleScroll}
        >
          <div ref={itemsRef}>
            <Card
              head={head}
              category={category || resolvedCategory}
              item={item}
              onCardClick={handleCardClick}
            />
          </div>
        </div>
        <div className="absolute top-0 bottom-0 -right-10">
          <ScrollNavButton
            direction="right"
            onClick={scrollRight}
            showButton={showRightButton}
          />
        </div>
      </div>

      {selectedItem && (
        <ModalFetchCard
          movie={selectedItem}
          onClose={closeModal}
          position={modalPosition}
        />
      )}
    </div>
  );
};

export default CardFilm;
