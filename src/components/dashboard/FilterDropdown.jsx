import { Menu } from "@headlessui/react";
import { ChevronDown } from "lucide-react"; // atau dari heroicons jika prefer

const FilterDropdown = ({ selectedFilter, setSelectedFilter }) => {
  return (
    <Menu as="div" className="relative inline-block text-left mb-6">
      <Menu.Button className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black">
        {
          FILTER_OPTIONS.find((option) => option.key === selectedFilter)
            ?.label ?? "Select"
        }
        <ChevronDown className="ml-2 h-4 w-4" />
      </Menu.Button>

      <Menu.Items className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {FILTER_OPTIONS.map((option) => (
            <Menu.Item key={option.key}>
              {({ active }) => (
                <button
                  onClick={() => setSelectedFilter(option.key)}
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } w-full text-left px-4 py-2 text-sm`}
                >
                  {option.label}
                </button>
              )}
            </Menu.Item>
          ))}
        </div>
      </Menu.Items>
    </Menu>
  );
};
