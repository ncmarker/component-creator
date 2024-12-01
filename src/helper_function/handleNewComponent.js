// adds new component to database and redirects to edit component page
export default function handleNewComponent() {
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