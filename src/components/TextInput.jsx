export function TextInput({ label, value, onChange, placeholder, name }) {
    return (
        <div className="flex flex-col gap-1 w-full max-w-sm">
            <label className="text-gray-700 font-medium">{label}</label>
            <input
                type="text"
                name={name}
                className="p-2 text-gray-700 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e)}
            />
        </div>
    );
}
