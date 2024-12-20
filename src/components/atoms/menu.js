import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const MenuCard = ({ title, items, onItemSelect }) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-full bg-gray-950 bg-opacity-50 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white">
                    {title}
                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                </MenuButton>
            </div>

            <MenuItems
                as="div"
                className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-gray-950 bg-opacity-50 shadow-lg ring-1 ring-black/5 focus:outline-none"
            >
                {items.length > 0 ? (
                    <div className="py-1">
                        {items.map((item, index) => (
                            <MenuItem key={index} as="div">
                                <a
                                    href={item.href || '#'}
                                    className="block px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                                    onClick={(e) => {
                                        e.preventDefault(); // Mencegah navigasi default
                                        onItemSelect(item.text); // Memanggil fungsi onItemSelect ketika item dipilih
                                    }}
                                >
                                    {item.text}
                                </a>
                            </MenuItem>
                        ))}
                    </div>
                ) : (
                    <p className="text-white px-4 py-2 text-sm">No items available</p> // Menangani kondisi ketika tidak ada item
                )}
            </MenuItems>
        </Menu>
    );
};

export default MenuCard;
