import { FiTrash } from "react-icons/fi";

export default function TrashButton({ componentId, onDelete }) {

    async function handleDelete(id) {
        // DELETE /components/id 
        fetch(`${process.env.REACT_APP_BACKEND_URL}/components/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => onDelete(id))
        .catch((err) => console.error(err))

        // DELETE /component_info/id 
        fetch(`${process.env.REACT_APP_BACKEND_URL}/component_info/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {})
        .catch((err) => console.error(err))

        // DELETE /component_code/id 
        fetch(`${process.env.REACT_APP_BACKEND_URL}/component_code/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {})
        .catch((err) => console.error(err))

        // if this was the current component being editted, remove it
        if (Number(sessionStorage.getItem('currentComponent')) === Number(id)) {
            sessionStorage.removeItem('currentComponent');
        }
    };

    return (
        <button 
            aria-label="delete"
            className="px-4 py-2 h-10 bg-red-500 font-regular rounded-md flex items-center justify-center hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={() => handleDelete(componentId)}
        >
            <FiTrash className="text-white" />
        </button>
    );
}