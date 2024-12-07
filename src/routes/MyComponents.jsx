import React, { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import TrashButton from "../components/TrashButton";
import handleNewComponent from "../helper_function/handleNewComponent";

export function MyComponents() {
    const [originalComponents, setOriginalComponents] = useState([]);
    const [displayedComponents, setDisplayedComponents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    // fetches all components on load
    useEffect(() => {
        // set page title
        document.title = "My Components";
 
        fetch(`${process.env.REACT_APP_BACKEND_URL}/components`)
        .then((res) => res.json())
        .then((json) => {
            const mycomponents = json.filter((c) => Number(c.user_id) === Number(sessionStorage.getItem('currentUser')));
            setDisplayedComponents(mycomponents);
            setOriginalComponents(mycomponents);
        })
        .catch((err) => console.error(err));
    }, []);

    // removes deleted result from display
    function onDelete(id) {
        toast.success("successfully deleted component");
        const mycomponents = displayedComponents.filter((c) => c.id !== id);
        setDisplayedComponents(mycomponents);
        setOriginalComponents(mycomponents);
    }

    // displays dynamic results based on search (debouncing)
    function handleChange(newVal) {
        let timer;
        setSearchTerm(newVal);

        clearTimeout(timer); 

        timer = setTimeout(() => {
            if (newVal.length > 0) {
                const mycomponents = displayedComponents.filter((c) => c.name.toLowerCase().includes(newVal.toLowerCase()));
                setDisplayedComponents(mycomponents);
            }
            else {
                setDisplayedComponents(originalComponents);
            }
        }, 300);
    }


    return(
        <div className="card flex flex-col gap-12">
            <h1 className="font-bold text-4xl">My Components</h1>
            <div className="flex justify-between w-full">
                <Searchbar value={searchTerm} onChange={handleChange}/>
                <button 
                    className="px-4 py-2 bg-blue-500 text-white font-regular rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={() => {
                        handleNewComponent()
                        .then((json) => {
                            navigate('/createcomponent');
                        })
                        .catch((err) => console.error(err))
                    }}
                >+ New Component</button>
            </div>
            {displayedComponents.length > 0 ? 
            <div className="overflow-hidden"> 
                <table className="table-auto w-full border-collapse">
                    <thead>
                    <tr className="border-b border-gray-300">
                        <th className="text-left px-4 py-4">Name</th>
                        <th className="text-left px-4 py-4">Type</th>
                        <th className="text-left px-4 py-4">Created At</th>
                        <th className="text-left px-4 py-4">Actions</th>
                    </tr>
                    </thead>
                </table>

                <div className="overflow-y-auto max-h-[340px]">
                    <table className="table-auto w-full border-collapse">
                    <tbody>
                        {displayedComponents.map((c,i) => (
                        <tr key={i} className="border-b border-gray-300">
                            <td className="px-4 py-4">{c.name}</td>
                            <td className="px-4 py-4">{c.type}</td>
                            <td className="px-4 py-4">{c.created_at}</td>
                            <td className="px-4 text-right">
                            <div className="inline-flex gap-2 items-center justify-end">
                                <EditButton componentId={c.id}/>
                                <TrashButton componentId={c.id} onDelete={onDelete}/>
                            </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div> : <p>No components to show</p>}

        </div>
    );
}

export function EditButton({ componentId }) {
    const navigate = useNavigate();

    return (
        <button 
            className="px-4 py-2 bg-blue-500 text-white font-regular rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => {
                sessionStorage.setItem('currentComponent', componentId);
                navigate("/createcomponent");
            }}
        >Edit</button>
    );
}
