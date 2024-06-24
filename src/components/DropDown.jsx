import React, { useState } from 'react';

export default function DropDown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('Filter');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    setIsOpen(false); // Close the dropdown menu
  };

  return (
    <div className="relative inline-block text-left p-2 rounded-xl ">
      <div >
        <button 
          type="button"
          className="inline-flex w-40 justify-center gap-x-1.5 rounded-md bg-blue-500 px-3 py-2 text-xl font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-500 hover:shadow-lg"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {selectedItem}
          <svg
            className="ml-2 h-6 w-6  mt-1 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className='pt-2' role="none">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
              onClick={() => handleSelect('All section')}
            >
              All section
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-1"
              onClick={() => handleSelect("Men's")}
            >
              Men's
            </a>
          </div>
          <div className="" role="none">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-2"
              onClick={() => handleSelect("Women's")}
            >
              Women's
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-3"
              onClick={() => handleSelect('Jwellery')}
            >
              Jwellery
            </a>
          </div>
          <div  role="none">
           
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-5"
              onClick={() => handleSelect('Electronics')}
            >
              Electronics
            </a>
          </div>
          
        </div>
      )}
    </div>
  );
}
