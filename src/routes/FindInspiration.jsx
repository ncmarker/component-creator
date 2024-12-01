import React, { useEffect, useState } from "react";
import Searchbar from "../components/Searchbar";


export function FindInspiration() {
    const [searchTerm, setSearchTerm] = useState("App Screens");
    const [inspo, setInspo] = useState([]);

    // dynamically updates inspiration results based on search term
    useEffect(() => {
        let timer;
        timer = setTimeout(() => {
            if (searchTerm) {
                fetch(`https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`)
                .then((res) => res.json())
                .then((json) => {
                    setInspo(json.results);
                    console.log(json.results);
                })
                .catch((err) => console.error(err));
            }
            else setInspo([]);
        }, 300);
        
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // adds image to saved inspo 
    function handleAddInspo(url) {
        fetch(`${process.env.REACT_APP_BACKEND_URL}/saved_inspiration`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "user_id": Number(sessionStorage.getItem('currentUser')),
                "image_url": url
            }),
        })
        .catch((err) => console.error(err));
    }


    return(
        <div className="card flex flex-col gap-12 h-full">
            <h1 className="font-bold text-4xl">Find Inspiration</h1>
            <Searchbar value={searchTerm} onChange={setSearchTerm} />
            {inspo.length > 0 ? 
            <div className="overflow-y-auto max-h-[475px] flex flex-wrap gap-4"> 
                {inspo.map((inspo, i) => {
                    return <div key={i} className="relative w-48 h-48">
                        <img
                            src={inspo.urls.small}
                            alt="inspiration"
                            className="w-full h-full object-cover rounded-lg"
                        />
                        <button 
                            className="absolute bottom-2 left-2 w-7 h-7 bg-blue-500 text-white font-regular rounded-md flex items-center justify-center hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onClick={(e) => {
                                handleAddInspo(inspo.urls.small);
                                e.target.innerHTML = "✓";
                                e.target.style.backgroundColor = "grey";
                            }}
                        >
                            +
                        </button>
                    </div>
                })}
            </div> : <p>No items matching search term</p>}
        </div>
    );
}


