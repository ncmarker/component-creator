import { FiSearch } from "react-icons/fi";

export default function Searchbar({ value, onChange }) {
    return(
        <div className="flex items-center w-full max-w-sm h-[42px]">
            <div className="h-full w-12 bg-blue-500 flex justify-center items-center rounded-l-md">
                <FiSearch className="text-white" />
            </div>
            <input
                type="text"
                className="flex-grow p-2 text-gray-700 border border-gray-300 outline-none border-l-0 rounded-r-md"
                placeholder="Search..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

