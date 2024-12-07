import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiTrash } from "react-icons/fi";


export function MyInspiration() {
    const [savedInspo, setSavedInspo] = useState([]);

    // fetches all components on load
    useEffect(() => {
        // set page title
        document.title = "My Inspiration";

        fetch(`${process.env.REACT_APP_BACKEND_URL}/saved_inspiration`)
        .then((res) => res.json())
        .then((json) => {
            const myInspo = json.filter((i) => i.user_id === Number(sessionStorage.getItem('currentUser')));
            setSavedInspo(myInspo);
        })
        .catch((err) => console.error(err));
    }, []);

    // handles removing a saved inspo from display and database
    async function handleDelete(id) {
        // DELETE /saved_inspiration/id 
        fetch(`${process.env.REACT_APP_BACKEND_URL}/saved_inspiration/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((res) => {
            const myInspo = savedInspo.filter((i) => i.id !== id);
            toast.success("successfully deleted saved inspiration photo");
            setSavedInspo(myInspo);
        })
        .catch((err) => console.error(err))
    };


    return(
        <div className="card flex flex-col gap-12">
            <h1 className="font-bold text-4xl">My Inspiration</h1>
            {savedInspo.length > 0 ? 
            <div className="overflow-y-auto max-h-[525px] flex flex-wrap gap-4"> 
                {savedInspo.map((inspo, i) => {
                    return <div key={i} className="relative w-48 h-48">
                        <img
                            src={inspo.image_url}
                            alt="inspiration"
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <button 
                            className="absolute bottom-2 left-2 px-4 py-2 h-10 bg-red-500 font-regular rounded-md flex items-center justify-center hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
                            onClick={() => handleDelete(inspo.id)}
                        >
                            <FiTrash className="text-white" />
                        </button>
                    </div>
                })}
            </div> : <p>No saved inspiration</p>}

        </div>
    );
}


