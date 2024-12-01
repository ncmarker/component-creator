export function DropdownInput({ label, options, value, onChange, name }) {
    return (
        <div className="flex flex-col gap-1 w-full max-w-sm">
            <label className="text-gray-700 font-medium">{label}</label>
            <select
                className="p-4 text-gray-700 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                value={value}
                name={name}
                onChange={(e) => onChange(e)}
            >
                <option value="">--select--</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}
