// adds new component to database and redirects to edit component page
export default async function handleNewComponent() {
    // check if current editting component has been saved, if not just edit that one
    const currComponent = sessionStorage.getItem('currentComponent');
    let needNew = false;
    if (currComponent) {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/component_info/${currComponent}`);
            const data = await res.json();
            if (Object.keys(data.attributes).length !== 0) needNew = true;
        }
        catch (err) {
            console.error(err);
        }
        // fetch(`${process.env.REACT_APP_BACKEND_URL}/component_info/${currComponent}`)
        // .then((res) => res.json())
        // .then((data) => {
        //     if (Object.keys(data.attributes).length !== 0) needNew = true;
        // })
        // .catch((err) => console.error(err));
    }
    if (!currComponent || needNew) {
        // POST /components
        return fetch(`${process.env.REACT_APP_BACKEND_URL}/components`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "user_id": sessionStorage.getItem('currentUser'),
                "name": "temp",
                "type": "button",
                "created_at": getCurrentTimestamp(),
            })
        })
        .then((res) => res.json())
        .then((json) => {
            sessionStorage.setItem('currentComponent', JSON.stringify(json.id));
            // POST /component_info
            return fetch(`${process.env.REACT_APP_BACKEND_URL}/component_info`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "component_id": sessionStorage.getItem('currentComponent'),
                    "attributes": {},
                })
            });
        })
        .then(() => {
            // POST /component_code
            return fetch(`${process.env.REACT_APP_BACKEND_URL}/component_code`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "component_id": sessionStorage.getItem('currentComponent'),
                    "code": "",
                })
            });
        })
        .catch((err) => console.error(err));
    }
    else return Promise.resolve();
    
}


// helper to make the current date timestamp
function getCurrentTimestamp() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};